import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface GeneratePostOptions {
  businessName: string;
  businessType: string;
  tone: string;
  prompt: string;
  platforms: string[];
  postType: "text" | "promotion" | "event" | "tips";
}

export async function generatePost(options: GeneratePostOptions): Promise<string> {
  const platformGuide = options.platforms
    .map((p) => {
      if (p === "instagram") return "Instagram (max 2200 chars, hashtag-friendly)";
      if (p === "facebook") return "Facebook (conversational, up to 500 chars)";
      if (p === "twitter") return "Twitter/X (max 280 chars)";
      return p;
    })
    .join(", ");

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a social media copywriter for local businesses. Create a ${options.postType} post for:

Business: ${options.businessName} (${options.businessType})
Tone: ${options.tone}
Platforms: ${platformGuide}
Request: ${options.prompt}

Write the post content only. No labels or extra explanation.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text;
}
