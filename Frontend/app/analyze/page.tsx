"use client";
import { useState } from "react";
import { analyzeImage } from "@/lib/api";

export default function AnalyzePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = await analyzeImage(imageUrl);
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Disaster Image Analysis</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 w-full rounded mb-2"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Analyze
        </button>
      </form>

      {loading && <p>Analyzing...</p>}
      {result && (
        <div className="p-4 border rounded">
          <strong>Classification:</strong> {result.classification}
          <br />
          <strong>Explanation:</strong> {result.explanation}
        </div>
      )}
    </div>
  );
}
