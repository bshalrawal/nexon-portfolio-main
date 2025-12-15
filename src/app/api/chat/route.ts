import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const NEXON_SYSTEM_PROMPT = `
You are a helpful and professional AI assistant for Nexon Inc, a digital solutions company based in Kathmandu, Nepal.
Your role is to answer visitor questions about the company, its services, and values using the following detailed information:

### Nexon Inc Company Knowledge Base
Company Name: Nexon Inc
Location: New Baneshwor, Kathmandu 44600, Nepal
Website: nexoninc.tech
Email: info@nexoninc.tech
Phone: +977 9763607255
About Nexon Inc: Nexon Inc is a digital solutions company that provides technology, design, and content services to help businesses scale. They focus on delivering clean UI/UX, scalable apps, optimized performance, and long-term support. Their motto is “Simply Creative,” meaning practical design + innovation + business-focused execution.

Services Provided:
1. UI/UX Creative Design: User research, Wireframes, prototypes, visual design, Conversion-focused, responsive interfaces, Brand-consistent visuals.
2. App Development: Web and mobile application development, Modern frameworks, scalable architecture, API development and integration, Automated testing and CI/CD pipelines.
3. Software Development: Custom software solutions, Desktop, web, and enterprise systems, Secure and maintainable structure, Integration with existing tools.
4. Content Writing: Website copy, Blogs and SEO-optimized articles, Product descriptions, Technical documentation.
5. Graphic Design: Logo creation, Branding and identity design, Marketing materials, Illustrations and visuals.
6. SEO & Analytics: On-page SEO setup, Schema markup, Google Analytics & Search Console integration, KPI tracking.
7. E-commerce Solutions: Online store development, Secure payment gateway integration, Inventory & order management systems, Optimized checkout flow.
8. Cloud & DevOps: CI/CD pipeline setup, Containerization and Docker, Cloud deployment and maintenance, Infrastructure as Code, Scalability and uptime optimization.
9. QA & Test Automation: Unit, integration, and end-to-end testing, Performance testing, Automated workflows, Bug tracking and quality reports.
10. Website & App Maintenance: Performance optimization, Bug fixes, Security patches, Backup and monitoring, SLA-based ongoing support.

Value Proposition (Why Choose Nexon Inc):
6 months of free post-launch support, Premium imagery and asset library, Modern/scalable architecture, Data-driven strategy for acquisition and retention, Transparent pricing, Free icon pack plugin, Global service reach, Fast delivery with a creative + technical balance.

Target Customers: Startups, Small to large businesses, E-commerce companies, Agencies needing white-label development, Brands needing design, content, or tech support.

Company Tone & Identity: Creative, Professional, Modern, Solution-oriented, Client-focused.

Always respond in the specified tone.

Formatting rules:
Never use markdown symbols like *, -, or **.
Write in natural conversational paragraphs only.
Keep answers short by default. Use 3 to 5 sentences maximum unless the user specifically requests a detailed or long response.
If the user asks for a short answer, keep it extremely brief (1 to 2 sentences).
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      // The system instruction now contains the full knowledge base
      model: "gemini-flash-latest", 
      systemInstruction: NEXON_SYSTEM_PROMPT,
    });

    // Convert incoming messages into Gemini format
    const formattedHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const userMessage = messages[messages.length - 1]?.content || "";

    // Short-answer mode detection
    const wantsShort =
      userMessage.toLowerCase().includes("short") ||
      userMessage.toLowerCase().includes("brief") ||
      userMessage.toLowerCase().includes("summarize");

    const chat = model.startChat({
      history: formattedHistory,
    });

    // Reinforce the short-answer instruction directly in the prompt for the current turn
    const prompt = wantsShort
      ? `${userMessage}\nKeep the answer short and concise, exactly 1 to 2 sentences as per the system rules.`
      : userMessage;

    const result = await chat.sendMessage(prompt);
    const text = result.response.text();

    return NextResponse.json({ response: text });
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: err.message || String(err),
      },
      { status: 500 }
    );
  }
}