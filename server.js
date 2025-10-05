import express from "express";
import fetch from "node-fetch";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});
app.use(limiter);

const OPENAI_URL = process.env.OPENAI_URL || "https://api.openai.com/v1/chat/completions";
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
if (!OPENAI_KEY) {
  console.warn("WARNING: OPENAI_API_KEY not set in env");
}

// Endpoint to handle AI text generation requests using OpenAI API

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, max_tokens = 250, temperature = 0.7 } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const body = {
      model: MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens,
      temperature,
    };

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return res
        .status(response.status)
        .json({ error: "OpenAI error", details: text });
    }

    const data = await response.json();
    const assistantText =
      data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;

    return res.json({ ok: true, raw: data, text: assistantText });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error", message: err.message });
  }
});

// Endpoint to handle form submission - logs data and simulates success response

app.post("/api/submit", async (req, res) => {
  try {
    const formData = req.body;

    // Basic validation
    if (!formData || typeof formData !== "object") {
      return res.status(400).json({ ok: false, error: "Invalid form data" });
    }

    // Simulated delay
    await new Promise((r) => setTimeout(r, 1000));

    // Logging the data getting submitted
    console.log("📝 Received application data:");
    console.log(JSON.stringify(formData, null, 2));

    // Mock success response
    return res.json({
      ok: true,
      message: "Application submitted successfully",
      referenceId: `APP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Submit error:", err);
    return res.status(500).json({ ok: false, error: "Submission failed" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
