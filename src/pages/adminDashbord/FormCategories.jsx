import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, Folder, FileText } from "lucide-react";

export default function FormCategories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Identity Forms",
      description: "Aadhar, PAN, Passport related forms",
      totalForms: 12,
    },
    {
      id: 2,
      name: "Government Certificates",
      description: "Birth, Caste, Income certificates",
      totalForms: 8,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    if (editing) {
      setCategories(
        categories.map((c) =>
          c.id === editing ? { ...c, ...formData } : c
        )
      );
    } else {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          ...formData,
          totalForms: Math.floor(Math.random() * 20) + 1,
        },
      ]);
    }

    setShowForm(false);
    setEditing(null);
    setFormData({ name: "", description: "" });
  };

  const handleEdit = (cat) => {
    setEditing(cat.id);
    setFormData(cat);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Form Categories</h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-3 bg-white shadow p-3 rounded-xl">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search categories..."
          className="outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ADD/EDIT FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-xl space-y-4">
          <h2 className="text-xl font-semibold">
            {editing ? "Edit Category" : "Add New Category"}
          </h2>

          <input
            type="text"
            placeholder="Category Name"
            className="border p-3 rounded-xl w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-xl w-full"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-xl"
            >
              {editing ? "Update" : "Save"}
            </button>

            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition border"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <Folder size={32} className="text-purple-600" />
                <div>
                  <h2 className="text-lg font-bold">{cat.name}</h2>
                  <p className="text-gray-500 text-sm">{cat.description}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  <Edit size={18} />
                </button>

                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-gray-600">
              <FileText size={18} />
              <span className="text-sm">Total Forms: {cat.totalForms}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}