const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// 1. Image Analysis
export async function analyzeImage(imageUrl: string) {
  const res = await fetch(`${API_BASE}/analyze/imagery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: imageUrl }),
  });
  return res.json();
}

// 2. Social Reports
export async function getSocialReports(lat: number, lng: number, radius: number) {
  const res = await fetch(`${API_BASE}/reports/social?lat=${lat}&lng=${lng}&radius_km=${radius}`);
  return res.json();
}

// 3. Priority Zones
export async function getPriorities() {
  const res = await fetch(`${API_BASE}/priorities`);
  return res.json();
}

// 4. Logistics
export async function getLogistics() {
  const res = await fetch(`${API_BASE}/logistics`);
  return res.json();
}
