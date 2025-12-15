
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found");
        return;
    }
    console.log("Using API Key:", apiKey);

    // The SDK doesn't expose listModels directly easily on the instance?
    // Actually it does not. We have to use the REST API to list models if the SDK doesn't expose it.
    // But wait, the SDK should have a way.

    // It seems the current Node SDK doesn't export a ModelManager.
    // We can try to raw fetch.

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

listModels();
