import ollama from "ollama";

export const analyzeComplaint = async ({
  title,
  description,
  location,
}) => {
  const response = await ollama.chat({
    model: "qwen3:8b",

    messages: [
      {
        role: "system",
        content: `
You are an AI assistant for a college Complaint Management System.

Analyze a student complaint and classify it for the college administration.

Determine:

1. category
2. priority
3. department
4. concise summary

Allowed categories:
- Electrical
- Plumbing
- Cleanliness
- Infrastructure
- Internet
- Security
- Academic
- Hostel
- Transport
- Other

Allowed priorities:
- Low
- Medium
- High
- Critical

Allowed departments:
- Maintenance
- IT
- Security
- Administration
- Hostel
- Transport
- Academic
- Other

Priority guidelines:

Low:
Minor inconvenience with little immediate impact.

Medium:
Normal complaint that should be addressed but has no immediate serious risk.

High:
Significant disruption, repeated issue, or potential safety concern.

Critical:
Immediate safety risk, serious infrastructure failure,
or an issue requiring urgent intervention.

Return ONLY JSON in this exact structure:

{
  "category": "...",
  "priority": "...",
  "department": "...",
  "summary": "..."
}

Do not include markdown.
Do not include explanations outside the JSON.
        `,
      },

      {
        role: "user",
        content: `
Title: ${title}

Description: ${description}

Location: ${location}
        `,
      },
    ],

    format: {
      type: "object",
      properties: {
        category: {
          type: "string",
        },

        priority: {
          type: "string",
        },

        department: {
          type: "string",
        },

        summary: {
          type: "string",
        },
      },

      required: [
        "category",
        "priority",
        "department",
        "summary",
      ],
    },

    stream: false,
  });

  const result = JSON.parse(response.message.content);

  return result;
};