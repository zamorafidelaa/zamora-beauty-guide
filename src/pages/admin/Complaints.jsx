import { useState, useEffect } from "react";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);

  return (
    <div className="admin-complaints">
      <h2>User Complaints</h2>
      {complaints.length === 0 ? (
        <p>Belum ada keluhan yang diterima.</p>
      ) : (
        <ul>
          {complaints.map((complaint, index) => (
            <li key={index} className="complaint-item">
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
