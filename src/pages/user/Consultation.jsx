import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Consultation = () => {
  const [concerns, setConcerns] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState("");
  const [concernDescription, setConcernDescription] = useState(""); 

  useEffect(() => {
    fetch("/skincare.json")
      .then((response) => response.json())
      .then((data) => setConcerns(data))
      .catch((error) => console.error("Error fetching concerns:", error));
  }, []);

  const handleSelectConcern = (selectedConcern) => {
    setSelectedConcern(selectedConcern);

    const concernData = concerns.find(
      (concern) => concern.concern === selectedConcern
    );
    if (concernData) {
      setRecommendations(concernData.recommendations);
      setConcernDescription(concernData.description); 
    } else {
      setRecommendations([]);
      setConcernDescription("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedConcern) {
      handleSelectConcern(selectedConcern);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-[calc(80px+4rem)]">
      <h1 className="text-3xl sm:text-4xl font-bold text-pink-500 text-center mb-10">
        Consultation
      </h1>

      {/* Form */}
      <form
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        onSubmit={handleSubmit}
      >
        <select
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm transition text-sm"
          value={selectedConcern}
          onChange={(e) => setSelectedConcern(e.target.value)}
        >
          <option value="">-- Pilih Keluhan Kulit --</option>
          {concerns.map((concern, index) => (
            <option key={index} value={concern.concern}>
              {concern.concern}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 shadow transition text-sm"
        >
          Cari Rekomendasi
        </button>
      </form>

      {/* Description */}
      {selectedConcern && concernDescription && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-pink-50 p-4 rounded-lg mb-8 text-center shadow-sm"
        >
          <p className="text-gray-700 text-sm sm:text-base">{concernDescription}</p>
        </motion.div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="relative group rounded-2xl overflow-hidden shadow-md cursor-pointer flex flex-col"
            >
              <img
                src={`/${rec.image}`}
                alt={rec.name}
                className="w-full h-56 sm:h-64 md:h-72 object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-md font-semibold">{rec.name}</h3>
                <p className="text-white text-xs sm:text-sm mt-1">{rec.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        selectedConcern && (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            No recommendations available.
          </p>
        )
      )}
    </div>
  );
};

export default Consultation;
