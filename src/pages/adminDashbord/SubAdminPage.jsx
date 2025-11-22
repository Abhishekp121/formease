import React, { useState } from "react";

export default function SubAdminPage() {
  const [subAdmins, setSubAdmins] = useState([
    { id: 1, name: "Rohit Kumar", email: "rohit@example.com", role: "Course Manager", phone: "9876543210", status: "Active" },
    { id: 2, name: "Sneha Gupta", email: "sneha@example.com", role: "Attendance Manager", phone: "9123456780", status: "Inactive" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDetailsId, setShowDetailsId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    status: "Active",
  });

  const handleSubmit = () => {
    if (editing) {
      setSubAdmins(
        subAdmins.map((admin) =>
          admin.id === editing ? { ...admin, ...formData } : admin
        )
      );
    } else {
      setSubAdmins([
        ...subAdmins,
        { id: Date.now(), ...formData }
      ]);
    }
    setShowForm(false);
    setEditing(null);
    setFormData({ name: "", email: "", role: "", phone: "", status: "Active" });
  };

  const handleEdit = (admin) => {
    setEditing(admin.id);
    setFormData(admin);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setSubAdmins(subAdmins.filter((admin) => admin.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sub-Admins Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Sub-Admin
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">
            {editing ? "Edit Sub-Admin" : "Add New Sub-Admin"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border p-2 rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="Role (ex: Attendance Manager)"
              className="border p-2 rounded-lg"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border p-2 rounded-lg"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <select
              className="border p-2 rounded-lg"
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
              onClick={() => { setShowForm(false); setEditing(null); }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sub-Admins Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subAdmins.map((admin) => (
              <tr key={admin.id} className="border-b">
                <td className="p-3">{admin.name}</td>
                <td className="p-3">{admin.email}</td>
                <td className="p-3">{admin.role}</td>
                <td className="p-3">{admin.status}</td>

                <td className="p-3 flex gap-3">
                  <button
                    className="text-blue-600"
                    onClick={() =>
                      setShowDetailsId(showDetailsId === admin.id ? null : admin.id)
                    }
                  >
                    {showDetailsId === admin.id ? "Hide" : "View"}
                  </button>

                  <button
                    className="text-green-600"
                    onClick={() => handleEdit(admin)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(admin.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Full Details */}
      {showDetailsId && (
        <div className="mt-4 p-5 bg-gray-100 rounded-xl shadow-inner">
          {subAdmins
            .filter((a) => a.id === showDetailsId)
            .map((admin) => (
              <div key={admin.id}>
                <h3 className="text-xl font-semibold mb-2">Full Details</h3>
                <p><strong>Name:</strong> {admin.name}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Role:</strong> {admin.role}</p>
                <p><strong>Phone:</strong> {admin.phone}</p>
                <p><strong>Status:</strong> {admin.status}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
