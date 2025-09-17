"use client";
import { useEffect, useState } from "react";
import { getLogistics } from "@/lib/api";

export default function LogisticsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLogistics().then((data) => {
      if (data.status === "ok") setAssignments(data.result.assignments);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rescue Logistics</h1>
      {assignments.length === 0 ? (
        <p>No assignments available</p>
      ) : (
        <ul>
          {assignments.map((a) => (
            <li key={a.id} className="p-4 border rounded mb-2">
              <strong>Resource:</strong> {a.resource_type} ({a.id}) <br />
              <strong>ETA:</strong> {a.eta_minutes} minutes <br />
              <strong>Route:</strong> {a.route.map((r: any) => r.join(", ")).join(" → ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
