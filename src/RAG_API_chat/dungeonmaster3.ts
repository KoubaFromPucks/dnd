import Groq from "groq-sdk";
import fs from "fs";
// @ts-ignore: pdfjs-dist types can be tricky, ignoring for simplicity
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import readline from "readline";

// !!! INSERT YOUR API KEY HERE !!!
const groq = new Groq({ apiKey: "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" });
const PDF_NAME = "pravidla.pdf"; 

// --- TYPES ---
// Define the shape of our chat messages
interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

// --- STATE MANAGEMENT ---
let gameHistory: ChatMessage[] = [
    { 
        role: "system", 
        content: `You are an expert Dungeon Master for Dungeons & Dragons. 
        
        PHASE 1: CAMPAIGN SETUP
        - Do NOT start the adventure yet.
        - Your FIRST goal is to introduce yourself and ask the user what kind of campaign setting they would like to play (e.g., High Fantasy, Horror, Sci-Fi, Mystery).
        - Once they answer, guide them through creating a character (Race, Class, Stats).

        PHASE 2: THE ADVENTURE
        - Only after the character is set up, begin the adventure with a vivid description.
        - Keep responses exciting but concise. 
        - Ask for dice rolls when uncertainty exists.` 
    }
];

async function main() {
    console.log("🐲 Summoning the Dungeon Master (Reading Rules)...");
    
    // 1. Load the Rulebook (PDF)
    let ruleChunks: string[] = [];
    
    try {
        const data = new Uint8Array(fs.readFileSync(PDF_NAME));
        const pdf = await pdfjs.getDocument({ data, disableWorker: true }as any).promise;
        let fullText = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            // content.items is explicitly typed as 'any' here due to library complexity
            fullText += content.items.map((item: any) => item.str).join(" ") + " \n ";
        }

        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
        ruleChunks = await splitter.splitText(fullText);
        console.log(`✅ Rules Loaded (${ruleChunks.length} chunks).`);
    } catch (error) {
        console.error("⚠️ Warning: Could not load PDF. Running in 'Imagination Only' mode.");
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    // --- HELPER: GENERATE DM RESPONSE ---
    const getDMResponse = async (userInput: string | null = null): Promise<string> => {
        let relevantRules = "";
        
        // Step 1: Brain (Keywords) & Retrieval
        // We only do this if there is actual user input to analyze
        if (userInput && ruleChunks.length > 0) {
            console.log("...Checking the rulebook...");
            try {
                const thoughtProcess = await groq.chat.completions.create({
                    model: "openai/gpt-oss-120b", // Lightweight model for keyword extraction
                    messages: [
                        { role: "system", content: "Extract 3 key D&D rule terms from this action. Output ONLY keywords." },
                        { role: "user", content: userInput }
                    ]
                });
                
                const content = thoughtProcess.choices[0]?.message?.content || "";
                const searchTerms = content.split(",");
                
                relevantRules = ruleChunks
                    .filter(chunk => searchTerms.some(term => chunk.toLowerCase().includes(term.trim().toLowerCase())))
                    .slice(0, 3)
                    .join("\n\n");
            } catch (e) {
                // Silently fail on search errors to keep game flow intact
            }
        }

        // Construct Prompt
        // We create a temporary array for the API call, so we don't pollute the long-term history with [RULES LOOKUP] tags
        let currentMessages: any[] = [...gameHistory];
        
        // Inject rules logic (Invisible to history)
        if (relevantRules) {
            currentMessages.push({ 
                role: "system", 
                content: `[RULES LOOKUP] Relevant info: ${relevantRules}` 
            });
        }

        // Add user input if it exists
        if (userInput) {
            const userMsg: ChatMessage = { role: "user", content: userInput };
            currentMessages.push(userMsg);
            gameHistory.push(userMsg);
        }

        // Generate Response
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: currentMessages,
        });

        const text = response.choices[0]?.message?.content || "The DM is silent...";
        
        // Save AI response to history
        gameHistory.push({ role: "assistant", content: text });
        
        // --- MEMORY OPTIMIZATION ("Pinning Strategy") ---
        // If history gets too long (over 30 turns), we prune the MIDDLE.
        // We keep:
        // 1. The System Prompt (Index 0) - Identity
        // 2. The Setup Phase (Indices 1-5) - Character/World Info
        // 3. The Recent Context (Last 20) - Immediate Story
        if (gameHistory.length > 30) {
            gameHistory = [
                gameHistory[0],              
                ...gameHistory.slice(1, 6),  
                ...gameHistory.slice(-20)    
            ];
        }

        return text;
    };

    // --- START THE GAME ---
    console.log("...Initializing Campaign...");
    
    // Call with null to trigger the Intro (Phase 1)
    const intro = await getDMResponse(null); 
    console.log(`\n🎲 DM: ${intro}`);

    const gameLoop = () => {
        rl.question("\n🛡️ You: ", async (playerAction) => {
            if (playerAction.toLowerCase() === "exit") {
                rl.close();
                return;
            }

            const narration = await getDMResponse(playerAction);
            console.log(`\n🎲 DM: ${narration}`);
            
            gameLoop();
        });
    };

    gameLoop();
}

main();