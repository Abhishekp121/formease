import React, { useState, useMemo } from "react";
import {
  FileText,
  Plus,
  Search,
  DollarSign,
  Download,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

// ---------------------- SAMPLE DATA ----------------------
const sampleInvoices = [
  {
    id: "INV-1001",
    client: "Rahul Sharma",
    email: "rahulsharma@gmail.com",
    amount: 2500,
    status: "Pending",
    createdAt: "2025-11-01",
    dueDate: "2025-11-10",
    items: [
      { desc: "Passport Form Filing", qty: 1, price: 1500 },
      { desc: "Express Service", qty: 1, price: 1000 },
    ],
  },
  {
    id: "INV-1002",
    client: "Priya Verma",
    email: "priya@gmail.com",
    amount: 1200,
    status: "Paid",
    createdAt: "2025-11-05",
    dueDate: "2025-11-12",
    items: [{ desc: "Pan Card Update", qty: 1, price: 1200 }],
  },
  {
    id: "INV-1003",
    client: "Amit Verma",
    email: "amit@example.com",
    amount: 1800,
    status: "Overdue",
    createdAt: "2025-10-20",
    dueDate: "2025-10-30",
    items: [{ desc: "Aadhar Update", qty: 1, price: 1800 }],
  },
];

// ---------------------- Helper: export CSV ----------------------
function exportToCSV(rows) {
  if (!rows || rows.length === 0) return;
  const headers = ["Invoice ID", "Client", "Email", "Amount", "Status", "Created At", "Due Date"];
  const csv = [headers.join(",")]
    .concat(
      rows.map((r) => [r.id, r.client, r.email, r.amount, r.status, r.createdAt, r.dueDate].join(","))
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoices_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------- BILLING COMPONENT ----------------------
export default function BillingPage() {
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(null);

  // form state
  const [form, setForm] = useState({ client: "", email: "", items: [{ desc: "", qty: 1, price: 0 }], dueDate: "" });

  const totals = useMemo(() => {
    const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
    const paid = invoices.filter((i) => i.status === "Paid").length;
    const pending = invoices.filter((i) => i.status === "Pending").length;
    return { totalRevenue, paid, pending };
  }, [invoices]);

  const filtered = invoices.filter((inv) => {
    const q = query.trim().toLowerCase();
    const byStatus = statusFilter === "All" || inv.status === statusFilter;
    const byQuery = !q || inv.client.toLowerCase().includes(q) || inv.id.toLowerCase().includes(q);
    return byStatus && byQuery;
  });

  function addItemRow() {
    setForm((f) => ({ ...f, items: [...f.items, { desc: "", qty: 1, price: 0 }] }));
  }

  function removeItemRow(index) {
    setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== index) }));
  }

  function updateItem(index, key, value) {
    setForm((f) => ({ ...f, items: f.items.map((it, i) => (i === index ? { ...it, [key]: value } : it)) }));
  }

  function createInvoice(e) {
    e.preventDefault();
    const amount = form.items.reduce((s, it) => s + Number(it.qty) * Number(it.price), 0);
    const newInv = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      client: form.client,
      email: form.email,
      amount,
      status: "Pending",
      createdAt: new Date().toISOString().slice(0, 10),
      dueDate: form.dueDate,
      items: form.items,
    };
    setInvoices((prev) => [newInv, ...prev]);
    setShowCreate(false);
    setForm({ client: "", email: "", items: [{ desc: "", qty: 1, price: 0 }], dueDate: "" });
  }

  function markPaid(id) {
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Paid" } : i)));
  }

  function deleteInvoice(id) {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    setInvoices((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* header + summary cards */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-sm text-gray-500">Invoices, payments and revenue overview</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white p-3 rounded-lg shadow">
            <DollarSign className="text-green-600" />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-white p-3 rounded-lg shadow text-sm text-gray-600">
              <div className="text-xs text-gray-400">Total Revenue</div>
              <div className="text-lg font-semibold">₹{totals.totalRevenue}</div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow text-sm text-gray-600">
              <div className="text-xs text-gray-400">Paid</div>
              <div className="text-lg font-semibold">{totals.paid}</div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow text-sm text-gray-600">
              <div className="text-xs text-gray-400">Pending</div>
              <div className="text-lg font-semibold">{totals.pending}</div>
            </div>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow"
          >
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      {/* search + filters + export */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
          <Search size={16} className="text-gray-400" />
          <input className="outline-none px-2" placeholder="Search by client or invoice id..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-lg shadow flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="outline-none bg-transparent">
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <button onClick={() => exportToCSV(filtered)} className="flex items-center gap-2 bg-white p-2 rounded-lg shadow">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* invoices table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3">Client</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Due</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">
                  <div className="font-medium">{inv.id}</div>
                  <div className="text-xs text-gray-500">{inv.createdAt}</div>
                </td>
                <td className="p-3">{inv.client} <div className="text-xs text-gray-500">{inv.email}</div></td>
                <td className="p-3">₹{inv.amount}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    inv.status === "Paid" ? "bg-green-100 text-green-700" : inv.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-3">{inv.dueDate}</td>
                <td className="p-3 text-right flex items-center justify-end gap-3">
                  <button onClick={() => setShowView(inv.id)} className="text-blue-600 flex items-center gap-2">
                    <Eye size={16} /> View
                  </button>

                  {inv.status !== "Paid" && (
                    <button onClick={() => markPaid(inv.id)} className="text-green-600"> <CheckCircle size={16} /> Mark Paid</button>
                  )}

                  <button onClick={() => deleteInvoice(inv.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">No invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* create invoice modal / drawer */}
      {showCreate && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl w-full md:w-3/4 lg:w-1/2 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Invoice</h3>
              <button onClick={() => setShowCreate(false)}><XCircle size={20} /></button>
            </div>
            <form onSubmit={createInvoice} className="space-y-4 max-h-[60vh] overflow-auto">
              <div className="grid md:grid-cols-2 gap-3">
                <input required placeholder="Client name" value={form.client} onChange={(e)=>setForm({...form, client: e.target.value})} className="border p-3 rounded-lg outline-none" />
                <input required placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="border p-3 rounded-lg outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Items</label>
                {form.items.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input required className="col-span-6 border p-2 rounded-lg" placeholder="Description" value={it.desc} onChange={(e)=>updateItem(idx, 'desc', e.target.value)} />
                    <input required type="number" className="col-span-2 border p-2 rounded-lg" placeholder="Qty" value={it.qty} onChange={(e)=>updateItem(idx, 'qty', e.target.value)} />
                    <input required type="number" className="col-span-3 border p-2 rounded-lg" placeholder="Price" value={it.price} onChange={(e)=>updateItem(idx, 'price', e.target.value)} />
                    <button type="button" onClick={()=>removeItemRow(idx)} className="col-span-1 text-red-600">Del</button>
                  </div>
                ))}

                <button type="button" onClick={addItemRow} className="text-sm text-blue-600">+ Add item</button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input type="date" required value={form.dueDate} onChange={(e)=>setForm({...form, dueDate: e.target.value})} className="border p-3 rounded-lg outline-none" />
                <div className="flex items-center justify-end gap-3">
                  <button type="button" onClick={()=>setShowCreate(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">Create Invoice</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* view invoice modal */}
      {showView && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl w-full md:w-2/3 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Invoice Details</h3>
              <button onClick={()=>setShowView(null)}><XCircle size={20} /></button>
            </div>

            {invoices.filter(i=>i.id===showView).map(inv=> (
              <div key={inv.id}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold">{inv.id}</h4>
                    <div className="text-sm text-gray-500">{inv.client} • {inv.email}</div>
                    <div className="mt-2 text-sm text-gray-600">Created: {inv.createdAt} | Due: {inv.dueDate}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400">Total</div>
                    <div className="text-2xl font-bold">₹{inv.amount}</div>
                    <div className={`mt-2 px-3 py-1 rounded-full text-xs ${inv.status==='Paid'? 'bg-green-100 text-green-700' : inv.status==='Pending'? 'bg-yellow-100 text-yellow-700':'bg-red-100 text-red-700'}`}>{inv.status}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h5 className="font-semibold mb-2">Items</h5>
                  <ul className="space-y-2">
                    {inv.items.map((it, idx)=> (
                      <li key={idx} className="flex justify-between text-sm">
                        <div>{it.desc} x{it.qty}</div>
                        <div>₹{it.price*it.qty}</div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}
