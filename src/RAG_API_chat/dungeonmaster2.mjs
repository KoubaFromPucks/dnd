import Groq from "groq-sdk";
import fs from "fs";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import readline from "readline";

// !!! INSERT YOUR API KEY HERE !!!
const groq = new Groq({ apiKey: "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" });
const PDF_NAME = "pravidla.pdf"; 

// --- STATE MANAGEMENT ---
let gameHistory = [
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
        - Ask for dice rolls when uncertainty exists.
        - Do not rely only on dice rolls to make decisions, it is not always fun for the player, try to provide the outcome of a battle/interaction also by analyzing what the user does.` 
    }
];

async function main() {
    console.log("🐲 Summoning the Dungeon Master (Reading Rules)...");
    
    // 1. Load the Rulebook (PDF)
    // (Wrapped in try/catch to handle missing files gracefully)
    let ruleChunks = [];
    try {
        const data = new Uint8Array(fs.readFileSync(PDF_NAME));
        const pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            fullText += content.items.map(item => item.str).join(" ") + " \n ";
        }

        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
        ruleChunks = await splitter.splitText(fullText);
        console.log(`✅ Rules Loaded (${ruleChunks.length} chunks).`);
    } catch (error) {
        console.error("⚠️ Warning: Could not load PDF. Running in 'Imagination Only' mode.");
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    // --- HELPER: GENERATE DM RESPONSE ---
    const getDMResponse = async (userInput = null) => {
        // If there is user input, analyze it for rules (Skip this for the very first greeting)
        let relevantRules = "";
        
        if (userInput && ruleChunks.length > 0) {
            console.log("...Checking the rulebook...");
            try {
                // Step 1: Brain (Keywords)
                const thoughtProcess = await groq.chat.completions.create({
                    model: "openai/gpt-oss-120b", // Or use llama-3.3-70b-versatile
                    messages: [
                        { role: "system", content: "Extract 3 key D&D rule terms from this action. Output ONLY keywords." },
                        { role: "user", content: userInput }
                    ]
                });
                const searchTerms = thoughtProcess.choices[0].message.content.split(",");
                
                // Step 2: Retrieval
                relevantRules = ruleChunks
                    .filter(chunk => searchTerms.some(term => chunk.toLowerCase().includes(term.trim().toLowerCase())))
                    .slice(0, 3)
                    .join("\n\n");
            } catch (e) {
                // Ignore search errors if API fails or PDF is empty
            }
        }

        // Construct Prompt
        let messages = [...gameHistory];
        
        // Inject rules only for this turn (Invisible to history)
        if (relevantRules) {
            messages.push({ 
                role: "system", 
                content: `[RULES LOOKUP] Relevant info: ${relevantRules}` 
            });
        }

        // Add user input if it exists
        if (userInput) {
            messages.push({ role: "user", content: userInput });
            gameHistory.push({ role: "user", content: userInput });
        }

        // Generate Response
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: messages,
        });

        const text = response.choices[0].message.content;
        
        // Save AI response to history
        gameHistory.push({ role: "assistant", content: text });
        
        // Memory cleanup (Keep context window small)
        if (gameHistory.length > 20) gameHistory = [gameHistory[0], ...gameHistory.slice(-19)];

        return text;
    };

    // --- START THE GAME ---
    // Trigger the DM to speak first without user input
    console.log("...Initializing Campaign...");
    
    // We call this with NO input, so the AI sees only the System Prompt and acts on "FIRST goal"
    const intro = await getDMResponse(); 
    console.log(`\n🎲 DM: ${intro}`);

    const gameLoop = () => {
        rl.question("\n🛡️ You: ", async (playerAction) => {
            if (playerAction.toLowerCase() === "exit") return rl.close();

            const narration = await getDMResponse(playerAction);
            console.log(`\n🎲 DM: ${narration}`);
            
            gameLoop();
        });
    };

    gameLoop();
}

main();