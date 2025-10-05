// Dummy API request function to simulate form submission

export async function requestSubmitApplication(formData) {
  const resp = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ message: "Unknown" }));
    throw new Error(err.error || err.message || "Submission failed");
  }

  const data = await resp.json();
  return data;
}
