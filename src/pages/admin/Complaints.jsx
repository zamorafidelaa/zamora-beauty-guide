import { useState, useEffect } from "react";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-pink-400 mb-6">User Complaints</h2>
      {complaints.length === 0 ? (
        <p className="text-gray-500">Belum ada keluhan yang diterima.</p>
      ) : (
        <ul className="space-y-4">
          {complaints.map((complaint, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-pink-200"
            >
              <p><strong>User:</strong> {complaint.username}</p>
              <p><strong>Complaints:</strong> {complaint.message}</p>
              <p><strong>Date:</strong> {complaint.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Complaints;
