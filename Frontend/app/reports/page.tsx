"use client";
import { useEffect, useState } from "react";
import { getSocialReports } from "@/lib/api";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: Karachi location (lat,lng) with radius 5 km
    getSocialReports(24.86, 67.0, 5).then((data) => {
      if (data.status === "ok") setReports(data.result.reports);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Social Media Reports</h1>
      {reports.length === 0 ? (
        <p>No reports found</p>
      ) : (
        <ul>
          {reports.map((r) => (
            <li key={r.id} className="p-4 border rounded mb-2">
              <strong>Text:</strong> {r.text} <br />
              <strong>Urgency Score:</strong>{" "}
              <span className={r.urgency_score > 0.7 ? "text-red-600" : "text-yellow-600"}>
                {r.urgency_score}
              </span>
              <br />
              <strong>Location:</strong> {r.latlng.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
