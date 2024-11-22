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
    const concernData = concerns.find(
      (concern) => concern.concern === selectedConcern
    );
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
    <div className="consultation-container">
      <h1 className="consultation-title">Consultation</h1>

      <form className="consultation-form" onSubmit={handleSubmit}>
        <label htmlFor="concern" className="consultation-label">
          Pilih Keluhan Kulit:
        </label>
        <select
          id="concern"
          className="consultation-select"
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
        <button type="submit" className="consultation-button">
          Cari Rekomendasi
        </button>
      </form>

      <div className="recommendations-container">
        {recommendations.length > 0 ? (
          recommendations.map((recommendation, index) => (
            <div key={index} className="recommendation-item">
              <h3 className="recommendation-name">{recommendation.name}</h3>
              <p className="recommendation-type">{recommendation.type}</p>
              <img
                className="recommendation-image"
                src={`/${recommendation.image}`}
                alt={recommendation.name}
              />
            </div>
          ))
        ) : (
          <p className="no-recommendations">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default Consultation;
