import React, { useState, useEffect } from "react";

export default function CreateTeam({ employees = [], onCreate, initialTeams = [] }) {
  const demoEmployees = employees.length
    ? employees
    : [
        { id: "e1", name: "Rohit Verma", role: "Employee" },
        { id: "e2", name: "Sneha Rao", role: "Employee" },
        { id: "e3", name: "Amit Patel", role: "Senior" },
        { id: "e4", name: "Priya Singh", role: "Employee" },
        { id: "e5", name: "Karan Joshi", role: "Employee" },
        { id: "e6", name: "Anjali Mehta", role: "Lead" },
      ];

  const sampleTeams = initialTeams.length
    ? initialTeams
    : [
        {
          id: "team-1",
          name: "Team Alpha",
          color: "indigo",
          members: [demoEmployees[0], demoEmployees[2], demoEmployees[5]],
          createdAt: new Date().toISOString(),
        },
        {
          id: "team-2",
          name: "Team Beta",
          color: "emerald",
          members: [demoEmployees[1], demoEmployees[3]],
          createdAt: new Date().toISOString(),
        },
      ];

  const [teams, setTeams] = useState(sampleTeams);
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setTeamName("");
      setSelected([]);
      setSearch("");
      setError("");
    }
  }, [open]);

  const sourceEmployees = employees.length ? employees : demoEmployees;
  const filtered = sourceEmployees.filter((e) => (String(e?.name || "")).toLowerCase().includes(search.toLowerCase()));

  function toggleSelect(emp) {
    setSelected((prev) => {
      if (prev.some((p) => p?.id === emp?.id)) return prev.filter((p) => p?.id !== emp?.id);
      return [...prev, emp];
    });
  }

  function avatarInitials(name) {
    const parts = (String(name || "").trim()).split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const colorMap = {
    indigo: { text: "text-indigo-700", bg: "bg-indigo-50" },
    emerald: { text: "text-emerald-700", bg: "bg-emerald-50" },
    rose: { text: "text-rose-700", bg: "bg-rose-50" },
    amber: { text: "text-amber-700", bg: "bg-amber-50" },
    gray: { text: "text-gray-700", bg: "bg-gray-50" },
  };

  async function handleCreate() {
    setError("");
    setSuccessMsg("");
    const name = String(teamName || "").trim();
    if (!name) {
      setError("Please enter a team name.");
      return;
    }
    if (selected.length === 0) {
      setError("Add at least one employee to the team.");
      return;
    }

    const payload = { name, members: selected.map((s) => s.id || s) };

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 600));

      if (onCreate) {
        try {
          await onCreate(payload);
        } catch (err) {
          console.error("onCreate error:", err);
          setError("Saved locally but failed to persist remotely.");
        }
      }

      const newTeam = {
        id: `team-${Date.now()}`,
        name,
        color: ["indigo", "rose", "emerald", "amber"][Math.floor(Math.random() * 4)],
        members: selected,
        createdAt: new Date().toISOString(),
      };

      setTeams((t) => [newTeam, ...t]);
      setOpen(false);
      setSuccessMsg(`Team '${name}' created.`);
      setTimeout(() => setSuccessMsg(""), 3500);
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteTeam(teamId) {
    try {
      if (typeof window !== "undefined") {
        if (!window.confirm("Delete this team?")) return;
      }
    } catch (e) {}
    setTeams((t) => t.filter((x) => x.id !== teamId));
  }

  async function copyToClipboard(text) {
    if (!text) return;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(String(text));
        if (typeof window !== "undefined" && window.alert) window.alert("Team ID copied to clipboard");
        return;
      }

      if (typeof document !== "undefined") {
        const ta = document.createElement("textarea");
        ta.value = String(text);
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          if (typeof window !== "undefined" && window.alert) window.alert("Team ID copied to clipboard");
        } catch (err) {
          try {
            window.prompt("Copy the team id:", String(text));
          } catch (e) {}
        }
        document.body.removeChild(ta);
        return;
      }

      if (typeof window !== "undefined") window.prompt("Copy the team id:", String(text));
    } catch (err) {
      console.error("copyToClipboard error:", err);
      if (typeof window !== "undefined") window.prompt("Copy the team id:", String(text));
    }
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open && typeof window !== "undefined") window.addEventListener("keydown", onKey);
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Teams</h2>
          <p className="text-sm text-gray-500">Create and manage teams. Add employees and monitor members.</p>
        </div>

        <div className="flex items-center gap-3">
          {successMsg && <div className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm">{successMsg}</div>}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
            type="button"
          >
            + Create Team
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teams.map((t) => {
          const color = colorMap[t.color] || colorMap.gray;
          return (
            <div key={t.id} className="p-4 rounded-xl bg-white shadow-sm border hover:shadow-md transition">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold text-lg">{t.name}</h3>
                  <div className="text-xs text-gray-500 mt-1">{(t.members || []).length} members</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`${color.text} ${color.bg} px-2 py-1 rounded text-xs font-medium`}>{t.color}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(t.id)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                      title="Copy team id"
                      type="button"
                    >
                      Copy ID
                    </button>
                    <button onClick={() => handleDeleteTeam(t.id)} className="text-xs text-red-500 hover:text-red-700" type="button">Delete</button>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(t.members || []).slice(0, 6).map((m) => (
                  <div key={m?.id || m} className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full text-xs">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">{avatarInitials(m?.name || m)}</div>
                    <div>{m?.name || String(m)}</div>
                  </div>
                ))}
                {(t.members || []).length > 6 && <div className="text-xs text-gray-500">+{(t.members || []).length - 6}</div>}
              </div>

              <div className="text-xs text-gray-400 mt-3">Created: {new Date(t.createdAt).toLocaleString()}</div>
            </div>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Create Team</h4>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700" type="button">Close</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Team Name</label>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Team Alpha"
                  className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  autoFocus
                  type="text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Search Employees</label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name"
                  className="w-full mt-2 p-3 border rounded-md"
                  type="search"
                />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Available Employees</div>
                <div className="max-h-40 overflow-y-auto border rounded-md p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filtered.length === 0 && <div className="text-gray-500 p-2">No employees found</div>}
                  {filtered.map((emp) => {
                    const isSel = selected.some((s) => s?.id === emp?.id);
                    return (
                      <button
                        key={emp?.id || emp}
                        onClick={() => toggleSelect(emp)}
                        className={`w-full text-left p-2 rounded-md flex items-center justify-between border ${isSel ? "bg-indigo-50 border-indigo-300" : "hover:bg-gray-50"}`}
                        type="button"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">{avatarInitials(emp?.name || emp)}</div>
                          <div>
                            <div className="font-medium">{emp?.name || String(emp)}</div>
                            <div className="text-xs text-gray-500">{emp?.role || "Employee"}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">{isSel ? "Added" : "Add"}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Selected Members</div>
                <div className="flex flex-wrap gap-2">
                  {selected.length === 0 && <div className="text-gray-500">No members selected</div>}
                  {selected.map((s) => (
                    <div key={s?.id || s} className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">{avatarInitials(s?.name || s)}</div>
                      <span className="text-sm">{s?.name || String(s)}</span>
                      <button onClick={() => toggleSelect(s)} className="text-xs text-red-500" type="button">×</button>
                    </div>
                  ))}
                </div>
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md border" type="button">Cancel</button>
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
                  type="button"
                >
                  {loading ? "Creating..." : "Create Team"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
