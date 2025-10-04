export async function requestWriteSuggestion(prompt) {
  const resp = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, max_tokens: 200 }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ message: "Unknown" }));
    throw new Error(err.error || err.message || "Request failed");
  }

  const data = await resp.json();
  return data.text;
}