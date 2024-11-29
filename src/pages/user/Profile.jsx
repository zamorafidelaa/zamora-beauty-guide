import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Mengambil data pengguna yang login dari localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse data JSON
    }
  }, []);

  if (!user) {
    return <div>No user is logged in. Please log in.</div>;
  }

  const handleProductPage = () => {
    navigate("/product"); // Navigate to the product page
  };

  const handleConsultationPage = () => {
    navigate("/consultation"); // Navigate to the consultation page
  };

  return (
    <div className="profile-page">
      <div className="main-content">
        {/* Add logo here */}
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
      </div>
    </div>
  );
};

export default Profile;
