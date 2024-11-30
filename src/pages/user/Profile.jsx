import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

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
    return <div>No user is logged in. Please log in.</div>;
  }

  const handleProductPage = () => {
    navigate("/product"); 
  };

  const handleConsultationPage = () => {
    navigate("/consultation"); 
  };

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
    <div className="profile-page">
      <div className="main-content">
        <img src="image.png" alt="Logo" className="profile-logo" />
        <h2>Welcome to Your Profile! ✨</h2>
        <p>
          <strong className="welcome-text">
            Selamat datang, {user.username}!
          </strong>{" "}
          Kami sangat senang Anda ada di sini! 😊💖
        </p>
        <p>
          🌸 *"Kulit sehat adalah cerminan kebahagiaan hati!"* 🌸 Nikmati
          berbagai pengalaman yang dirancang khusus untuk Anda. Mari eksplorasi
          dunia perawatan kulit yang penuh inspirasi dan solusi terbaik untuk
          kebutuhan Anda! 🌿✨
        </p>
        <p>
          Terima kasih telah menjadi bagian dari komunitas kami! 🎉 Kami
          berkomitmen untuk mendukung perjalanan Anda menuju kulit yang lebih
          sehat, lebih segar, dan lebih bersinar setiap hari! 💆‍♀️🌟
        </p>
        <p>
          Dari produk pilihan terbaik hingga konsultasi personal, kami di sini
          untuk memberikan yang terbaik untuk Anda. 🌺 Yuk, mulai perjalanan
          Anda sekarang dan biarkan kami menemani Anda! 🛍️💬
        </p>
        <p>
          ✨ "Kulit cantik adalah investasi jangka panjang!" ✨ Jangan ragu
          untuk bertanya atau menjelajahi semua yang kami tawarkan! 💖🌷
        </p>{" "}
        <p>
          Nikmati pengalaman yang menyenangkan bersama kami, dan jangan lupa
          untuk selalu tersenyum! 😊🌟 Wajah yang bahagia adalah rahasia
          kecantikan sejati! 💕💅🏼
        </p>
        <div className="profile-actions">
          <button onClick={handleProductPage} className="profile-button">
            Jelajahi Produk Kami 🛍️
          </button>
          <button onClick={handleConsultationPage} className="profile-button">
            Konsultasikan Kebutuhan Kulit Anda 💬
          </button>
        </div>
        <div className="complaint-text">
          <p>
            Kami siap mendengarkan keluhan kulit Anda dengan sepenuh hati.
            Jangan ragu untuk berbagi, karena setiap langkah kecil membawa kita
            lebih dekat ke solusi terbaik untuk kulit sehat dan bercahaya!
          </p>
        </div>
        <div className="complaint-section">
          <h3>Kirimkan Keluhan Kulit Anda</h3>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Tuliskan keluhan Anda di sini..."
            rows="4"
            className="complaint-input"
          ></textarea>
          <button onClick={handleComplaintSubmit} className="complaint-button">
            Send
          </button>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
