"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiResponse {
  status: string;
  result: {
    imagery: {
      classification: string;
    };
    social: {
      reports: {
        id: string;
        latlng: [number, number];
        urgency_score: number;
        text: string;
      }[];
    };
    priorities: {
      zone_id: string;
      latlng: [number, number];
      severity: number;
      source: string;
    }[];
    logistics: {
      assignments: {
        resource_type: string;
        id: string;
        route: [number, number][];
        eta_minutes: number;
      }[];
    };
  };
}

export default function DisasterDashboard() {
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSimulate = async () => {
    if (!imageUrl.trim()) {
      setError("Please enter an image URL.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        "https://disasterbackend-production-6475.up.railway.app/api/simulate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: imageUrl }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const json: ApiResponse = await response.json();
      setData(json);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🌍 Disaster Dashboard</h1>

      {/* Input field for image URL */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Enter image URL here"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button onClick={handleSimulate} disabled={loading}>
          {loading ? "Analyzing..." : "Simulate"}
        </Button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* Imagery Classification */}
      {data?.result?.imagery && (
        <Card className="bg-white shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">🖼 Imagery Classification</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {data.result.imagery.classification}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Social Reports */}
      {data?.result?.social?.reports?.length > 0 && (
        <Card className="bg-white shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">📢 Social Reports</h2>
            <ul className="space-y-2">
              {data.result.social.reports.map((report) => (
                <li
                  key={report.id}
                  className="border p-2 rounded-lg bg-gray-50"
                >
                  <p className="font-medium">{report.text}</p>
                  <p className="text-sm text-gray-600">
                    Lat/Lng: {report.latlng.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Urgency Score: {report.urgency_score.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Priorities */}
      {data?.result?.priorities?.length > 0 && (
        <Card className="bg-white shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">⚠️ Priority Zones</h2>
            <ul className="space-y-2">
              {data.result.priorities.map((priority) => (
                <li
                  key={priority.zone_id}
                  className="border p-2 rounded-lg bg-gray-50"
                >
                  <p className="font-medium">Zone: {priority.zone_id}</p>
                  <p className="text-sm text-gray-600">
                    Lat/Lng: {priority.latlng.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Severity: {priority.severity.toFixed(2)} | Source:{" "}
                    {priority.source}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Logistics */}
      {data?.result?.logistics?.assignments?.length > 0 && (
        <Card className="bg-white shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">🚛 Logistics</h2>
            <ul className="space-y-2">
              {data.result.logistics.assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  className="border p-2 rounded-lg bg-gray-50"
                >
                  <p className="font-medium">
                    {assignment.resource_type.toUpperCase()} - {assignment.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    Route: {assignment.route.map((r) => r.join(", ")).join(" → ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    ETA: {assignment.eta_minutes} minutes
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
