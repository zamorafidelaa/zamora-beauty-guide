import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [complaint, setComplaint] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        No user is logged in. Please log in.
      </div>
    );
  }

  const handleProductPage = () => navigate("/product");
  const handleConsultationPage = () => navigate("/consultation");

  const handleComplaintSubmit = () => {
    if (complaint.trim() === "") {
      alert("Keluhan tidak boleh kosong!");
      return;
    }

    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    const newComplaint = {
      username: user.username,
      message: complaint,
      date: new Date().toISOString().split("T")[0], 
    };
      
    complaints.push(newComplaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    setComplaint("");
    setSuccessMessage("Keluhan Anda berhasil dikirim!");
    setTimeout(() => setSuccessMessage(""), 3000); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 pt-28 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 sm:p-12"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img 
            src="image.png" 
            alt="Logo" 
            className="w-28 h-28 mb-4 rounded-full object-cover border-4 border-pink-200 shadow-lg" 
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-2">
            Welcome, {user.username}!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl">
            🌸 *"Kulit sehat adalah cerminan kebahagiaan hati!"* 🌸 Nikmati berbagai pengalaman dan solusi terbaik untuk kulit Anda.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleProductPage}
            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 shadow-lg transition text-sm sm:text-base"
          >
            Jelajahi Produk Kami 🛍️
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleConsultationPage}
            className="flex-1 px-6 py-3 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 shadow-lg transition text-sm sm:text-base"
          >
            Konsultasi Kebutuhan Kulit Anda 💬
          </motion.button>
        </div>

        {/* Complaint Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-pink-50 p-6 rounded-2xl shadow-inner"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            Kirimkan Keluhan Kulit Anda
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Kami siap mendengarkan keluhan kulit Anda dengan sepenuh hati. Setiap langkah kecil membawa kita lebih dekat ke solusi terbaik!
          </p>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Tuliskan keluhan Anda di sini..."
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4 resize-none text-sm sm:text-base"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleComplaintSubmit}
            className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 shadow transition text-sm sm:text-base"
          >
            Kirim
          </motion.button>
          {successMessage && (
            <p className="mt-3 text-green-500 font-medium">{successMessage}</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
