import { useState, useEffect } from "react";

const SearchSkincare = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skincareData, setSkincareData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // Untuk memilih tipe produk

  useEffect(() => {
    // Mengambil data skincare dari file JSON
    fetch("/skincare.json")
      .then((response) => response.json())
      .then((data) => {
        setSkincareData(data);
        setFilteredData(data); // Set data awal untuk tampilan default
      })
      .catch((error) => console.error("Error fetching skincare data:", error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Menyaring data berdasarkan pencarian
    let results = skincareData.filter((item) =>
      item.concern.toLowerCase().includes(value) ||
      item.recommendations.some((recommendation) =>
        recommendation.name.toLowerCase().includes(value) ||
        recommendation.type.toLowerCase().includes(value)
      )
    );

    // Filter tambahan berdasarkan tipe produk
    if (selectedType) {
      results = results
        .map((item) => ({
          ...item,
          recommendations: item.recommendations.filter(
            (recommendation) =>
              recommendation.type.toLowerCase() === selectedType.toLowerCase()
          ),
        }))
        .filter((item) => item.recommendations.length > 0); // Hapus item tanpa rekomendasi
    }

    setFilteredData(results);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type); // Memperbarui tipe yang dipilih

    // Menyaring data berdasarkan tipe produk
    let results = skincareData;

    if (type) {
      results = skincareData
        .map((item) => ({
          ...item,
          recommendations: item.recommendations.filter(
            (recommendation) =>
              recommendation.type.toLowerCase() === type.toLowerCase()
          ),
        }))
        .filter((item) => item.recommendations.length > 0); // Hapus item tanpa rekomendasi
    }

    // Jika ada pencarian, terapkan juga filter pencarian
    if (searchTerm) {
      results = results.filter((item) =>
        item.concern.toLowerCase().includes(searchTerm) ||
        item.recommendations.some((recommendation) =>
          recommendation.name.toLowerCase().includes(searchTerm)
        )
      );
    }

    setFilteredData(results);
  };

  return (
    <div>
      <h1>Search Skincare</h1>

      {/* Input Pencarian */}
      <input
        type="text"
        placeholder="Search skincare by concern or product name..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Dropdown untuk memilih Tipe */}
      <select onChange={handleTypeChange} value={selectedType}>
        <option value="">Select a type</option>
        <option value="Cleanser">Cleanser</option>
        <option value="Moisturizer">Moisturizer</option>
        <option value="Serum">Serum</option>
        <option value="Sunscreen">Sunscreen</option>
      </select>

      {/* Hasil Pencarian */}
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              {item.recommendations.length > 0 ? (
                item.recommendations.map((recommendation, idx) => (
                  <div key={idx} style={{ marginBottom: "10px" }}>
                    <h4>{recommendation.name}</h4>
                    <img
                      src={`/${recommendation.image}`}
                      alt={recommendation.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                ))
              ) : (
                <p>No products of selected type found in this concern.</p>
              )}
            </div>
          ))
        ) : (
          <p>No skincare products match your search or selected type.</p>
        )}
      </div>
    </div>
  );
};

export default SearchSkincare;
