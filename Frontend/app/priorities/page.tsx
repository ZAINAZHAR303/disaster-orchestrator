"use client";
import { useEffect, useState } from "react";
import { getPriorities } from "@/lib/api";

export default function PrioritiesPage() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPriorities().then((data) => {
      if (data.status === "ok") {
        setZones(data.result);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Priority Zones</h1>
      {zones.length === 0 ? (
        <p>No priority zones available</p>
      ) : (
        <ul>
          {zones.map((z, idx) => (
            <li key={idx} className="p-4 border rounded mb-2">
              <strong>Zone ID:</strong> {z.zone_id} <br />
              <strong>Severity:</strong>{" "}
              <span className={z.severity > 0.7 ? "text-red-600" : "text-yellow-600"}>
                {z.severity}
              </span>
              <br />
              <strong>Source:</strong> {z.source}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
