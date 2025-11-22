import React from "react";
import {
  User,
  FileText,
  Calendar,
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";

// -------------------------------------------------------
// SAMPLE ARRAY OF OBJECTS (BACKEND से भी आ सकता है)
// -------------------------------------------------------
const requestsData = [
  {
    id: 1,
    formType: "Passport Form",
    requestDate: "20 Nov 2025",
    time: "10:45 AM",
    note: "User requested urgent service.",
    user: {
      name: "Rohit Verma",
      email: "rohitv123@gmail.com",
      phone: "9876543210",
      address: "Sector 12, Noida",
      idProof: "Aadhar Card",
    },
  },
  {
    id: 2,
    formType: "Pan Card Update",
    requestDate: "21 Nov 2025",
    time: "01:30 PM",
    user: {
      name: "Sneha Gupta",
      email: "sneha@gmail.com",
      phone: "8877665544",
      address: "Rajendra Nagar, Delhi",
      idProof: "Voter ID",
    },
  },
];

// -------------------------------------------------------
// TOTAL REQUESTS CARD COMPONENT
// -------------------------------------------------------
function TotalRequestsCard({ requests }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Total Requests</h2>

      <div className="space-y-5">
        {requests.map((req) => (
          <div
            key={req.id}
            className="border rounded-xl p-5 hover:shadow-md transition"
          >
            {/* TOP USER SECTION */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <User size={26} />
                </div>

                <div>
                  <p className="text-lg font-semibold">{req.user.name}</p>
                  <p className="text-sm text-gray-500">{req.user.email}</p>
                </div>
              </div>

              {/* REQUEST DATE */}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span className="text-sm">{req.requestDate}</span>
              </div>
            </div>

            {/* DETAILS GRID SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              {/* FORM TYPE */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <FileText size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Form Type</p>
                  <p className="font-medium">{req.formType}</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Phone size={20} className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{req.user.phone}</p>
                </div>
              </div>

              {/* TIME */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Clock size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Requested Time</p>
                  <p className="font-medium">{req.time}</p>
                </div>
              </div>

              {/* ADDRESS */}
              {req.user.address && (
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg md:col-span-2">
                  <MapPin size={20} className="text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{req.user.address}</p>
                  </div>
                </div>
              )}

              {/* ID PROOF */}
              {req.user.idProof && (
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <FileText size={20} className="text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-500">ID Proof</p>
                    <p className="font-medium">{req.user.idProof}</p>
                  </div>
                </div>
              )}
            </div>

            {/* NOTE */}
            {req.note && (
              <p className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded text-sm">
                {req.note}
              </p>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 mt-5">
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm">
                View Full Details
              </button>

              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-sm">
                Assign to SubAdmin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// MAIN PAGE EXPORT
// -------------------------------------------------------
export default function DemoPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TotalRequestsCard requests={requestsData} />
    </div>
  );
}
