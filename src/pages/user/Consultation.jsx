import { useState, useEffect } from "react";

const Consultation = () => {
  const [concerns, setConcerns] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState("");

  useEffect(() => {
    // Fetch data concern kulit dari file JSON
    fetch("/skincare.json")
      .then((response) => response.json())
      .then((data) => setConcerns(data))
      .catch((error) => console.error("Error fetching concerns:", error));
  }, []);

  const handleSelectConcern = (selectedConcern) => {
    setSelectedConcern(selectedConcern);

    // Temukan concern yang dipilih untuk mendapatkan rekomendasi
    const concernData = concerns.find((concern) => concern.concern === selectedConcern);
    if (concernData) {
      setRecommendations(concernData.recommendations);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedConcern) {
      handleSelectConcern(selectedConcern);
    }
  };

  return (
    <div>
      <h1>Consultation</h1>

      {/* Skin Concern Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="concern">Pilih Keluhan Kulit:</label>
        <select
          id="concern"
          value={selectedConcern}
          onChange={(e) => setSelectedConcern(e.target.value)}
        >
          <option value="">-- Pilih --</option>
          {concerns.map((concern, index) => (
            <option key={index} value={concern.concern}>
              {concern.concern}
            </option>
          ))}
        </select>
        <button type="submit">Cari Rekomendasi</button>
      </form>

      {/* Recommendations */}
      <div>
        {recommendations.length > 0 ? (
          recommendations.map((recommendation, index) => (
            <div key={index}>
              <h3>{recommendation.name}</h3>
              <p>{recommendation.type}</p>
              <img src={recommendation.image} alt={recommendation.name} />
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default Consultation;
