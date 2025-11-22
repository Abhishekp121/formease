import React, { useState } from "react";
import { Plus, Pencil, Trash2, Filter, Search, FileText } from "lucide-react";

export default function FormMaster() {
  const [forms, setForms] = useState([
    { id: 1, name: "Aadhar Form", category: "Government", price: "50", status: "Active" },
    { id: 2, name: "PAN Card Update", category: "Finance", price: "100", status: "Inactive" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    status: "Active",
  });

  const handleSubmit = () => {
    if (editing) {
      setForms(forms.map(f => (f.id === editing ? { ...f, ...formData } : f)));
    } else {
      setForms([...forms, { id: Date.now(), ...formData }]);
    }
    setShowForm(false);
    setEditing(null);
    setFormData({ name: "", category: "", price: "", status: "Active" });
  };

  const handleEdit = (form) => {
    setEditing(form.id);
    setFormData(form);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setForms(forms.filter(f => f.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Form Master</h1>

        <div className="flex gap-3">
          {/* Search */}
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search forms..."
              className="outline-none ml-2"
            />
          </div>

          {/* Filter */}
          <button className="px-3 py-2 bg-gray-200 rounded-lg flex items-center gap-2">
            <Filter size={18} /> Filter
          </button>

          {/* Add Form */}
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Add Form
          </button>
        </div>
      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border">
          <h2 className="text-xl font-semibold mb-4">
            {editing ? "Edit Form" : "Add New Form"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Form Name"
              className="border p-3 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Category"
              className="border p-3 rounded-lg"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              className="border p-3 rounded-lg"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <select
              className="border p-3 rounded-lg"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              {editing ? "Update" : "Submit"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FORM TABLE */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Form</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-b">
                <td className="p-3">{form.name}</td>
                <td className="p-3">{form.category}</td>
                <td className="p-3">₹{form.price}</td>
                <td className="p-3">{form.status}</td>

                <td className="p-3 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(form)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(form.id)}
                    className="text-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>

                  <button className="text-green-600 flex items-center gap-1">
                    <FileText size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
