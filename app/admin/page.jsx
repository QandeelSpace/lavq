// app/admin/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import AdminTable from "@/components/AdminTable";

export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/registrations", {
        headers: { "x-admin-pass": pass }
      });
      if (res.status === 401) {
        setError("Unauthorized. Check admin password.");
        setData(null);
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Failed to fetch.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin — Registrations</h1>

        <div className="flex gap-3 mb-6">
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Admin password" className="p-2 rounded bg-slate-800"/>
          <button onClick={fetchData} className="bg-cyan-500 px-4 py-2 rounded">Load</button>
        </div>

        {error && <div className="text-red-400 mb-4">{error}</div>}

        {data ? <AdminTable rows={data} /> : <div className="text-gray-400">No data loaded</div>}
      </div>
    </div>
  );
}
