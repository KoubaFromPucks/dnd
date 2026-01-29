import Groq from "groq-sdk";
import fs from "fs";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import readline from "readline";

const groq = new Groq({ apiKey: "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" });
const PDF_NAME = "pravidla.pdf"; 

// --- STATE MANAGEMENT ---
// The AI needs to remember the story so far
let gameHistory = [
    { role: "system", content: "You are a Dungeon Master. You narrate the adventure. The user is the Player. Keep responses exciting but SHORT. Ask for dice rolls when needed. At the start of the campaign, welcome the player to the campaign, help the player set up their character, do not use only dice rolls to decide the outcome of battles/situations, but also consider the players answer" }
];

async function main() {
    console.log("🐲 Summoning the Dungeon Master (Reading Rules)...");
    
    // 1. Load the Rulebook (PDF)
    const data = new Uint8Array(fs.readFileSync(PDF_NAME));
    const pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(" ") + " \n ";
    }

    // 2. Chunk it (Knowledge Base)
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const ruleChunks = await splitter.splitText(fullText);
    console.log(`✅ Rules Loaded. I am ready to run your campaign.`);

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const gameLoop = () => {
        rl.question("\n🛡️ You: ", async (playerAction) => {
            if (playerAction.toLowerCase() === "exit") return rl.close();

            // --- STEP 1: THE "BRAIN" (What rules apply here?) ---
            // Instead of searching for the user's words, we ask the AI what rules it needs.
            console.log("...Checking the rulebook...");
            
            const thoughtProcess = await groq.chat.completions.create({
                model: "openai/gpt-oss-120b",
                messages: [
                    { role: "system", content: "You are a helper. The player performed an action. Identify 3-5 KEYWORDS from the D&D rules that apply to this action. Output ONLY the keywords." },
                    { role: "user", content: `Player Action: "${playerAction}".\n\nKeywords:` }
                ]
            });

            const searchTerms = thoughtProcess.choices[0].message.content;
            console.log(`(DEBUG: Looking up rules for: ${searchTerms})`);  // Uncomment to see what it's thinking

            // --- STEP 2: RETRIEVAL (Search the PDF for those Rules) ---
            const terms = searchTerms.split(",").map(s => s.trim());
            
            const relevantRules = ruleChunks
                .filter(chunk => terms.some(term => chunk.toLowerCase().includes(term.toLowerCase())))
                .slice(0, 4) // Get top 4 rule sections
                .join("\n\n---\n\n");

            // --- STEP 3: THE NARRATOR (Combine Story + Rules) ---
            // We add the rules temporarily to the prompt so the DM knows how to handle the action
            const currentTurnPrompt = [
                ...gameHistory, // Remember previous turns
                { 
                    role: "system", 
                    content: `[INTERNAL RULEBOOK LOOKUP]\nRelevant Rules for this turn:\n${relevantRules}\n\n(Use these rules to adjudicate the action, but do not read them out loud unless asked.)` 
                },
                { role: "user", content: playerAction }
            ];

            try {
                const dmResponse = await groq.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages: currentTurnPrompt,
                });

                const narration = dmResponse.choices[0].message.content;
                console.log(`\n🎲 DM: ${narration}`);

                // Update History (Keep it clean: User Action + DM Response)
                gameHistory.push({ role: "user", content: playerAction });
                gameHistory.push({ role: "assistant", content: narration });

                // Keep memory from getting too huge (Last 10 turns)
                if (gameHistory.length > 20) {
                    gameHistory = [gameHistory[0], ...gameHistory.slice(-19)];
                }

                gameLoop();
            } catch (err) {
                console.error("Error:", err.message);
            }
        });
    };

    gameLoop();
}

main();