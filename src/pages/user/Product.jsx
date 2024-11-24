import { BadgeInfo } from "lucide-react";
import { Heart } from "lucide-react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skincareData, setSkincareData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const itemsPerPage = 10;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/skincare.json")
      .then((response) => response.json())
      .then((data) => {
        setSkincareData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching skincare data:", error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const results = skincareData
      .map((item) => ({
        ...item,
        recommendations: item.recommendations.filter(
          (recommendation) =>
            recommendation.name.toLowerCase().includes(value) ||
            recommendation.type.toLowerCase().includes(value)
        ),
      }))
      .filter((item) => item.recommendations.length > 0);

    if (selectedType) {
      const typeFilteredResults = results
        .map((item) => ({
          ...item,
          recommendations: item.recommendations.filter(
            (recommendation) =>
              recommendation.type.toLowerCase() === selectedType.toLowerCase()
          ),
        }))
        .filter((item) => item.recommendations.length > 0);

      setFilteredData(typeFilteredResults);
    } else {
      setFilteredData(results);
    }

    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value.toLowerCase();
    setSelectedType(type);
  
    if (type === "") {
      // Jika "Select a type" dipilih, tampilkan semua produk tanpa filter
      setFilteredData(skincareData);
    } else {
      // Filter berdasarkan tipe produk yang dipilih
      const results = skincareData
        .map((item) => ({
          ...item,
          recommendations: item.recommendations.filter(
            (recommendation) => recommendation.type.toLowerCase() === type
          ),
        }))
        .filter((item) => item.recommendations.length > 0);
  
      // Jika ada pencarian, filter berdasarkan nama atau tipe juga
      if (searchTerm) {
        const searchFilteredResults = results
          .map((item) => ({
            ...item,
            recommendations: item.recommendations.filter(
              (recommendation) =>
                recommendation.name.toLowerCase().includes(searchTerm) ||
                recommendation.type.toLowerCase().includes(searchTerm)
            ),
          }))
          .filter((item) => item.recommendations.length > 0);
  
        setFilteredData(searchFilteredResults);
      } else {
        setFilteredData(results);
      }
    }
  
    setCurrentPage(1); // Reset halaman ketika tipe diubah
  };
  
  const totalItems = filteredData.flatMap(
    (item) => item.recommendations
  ).length; // Total number of recommendations
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

  const currentData = filteredData
    .flatMap((item) => item.recommendations)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Only show items for the current page

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleLike = (recommendation) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(recommendation.name)) {
        return prevFavorites.filter((fav) => fav !== recommendation.name);
      }
      return [...prevFavorites, recommendation.name];
    });
  };

  const handleShowPopup = (recommendation) => {
    setPopupData(recommendation);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupData(null);
  };

  return (
    <div className="product-container">
      <h1>All Skincare Products</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search skincare by concern or product name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <Search className="search-icon" />
      </div>

      <select
        onChange={handleTypeChange}
        value={selectedType}
        className="type-select"
      >
        <option value="">Select a type</option>{" "}
        {/* Tampilkan "Select a type" sebagai opsi pertama */}
        <option value="cleanser">Cleanser</option>
        <option value="moisturizer">Moisturizer</option>
        <option value="serum">Serum</option>
        <option value="sunscreen">Sunscreen</option>
      </select>

      <div className="product-list">
        {currentData.length > 0 ? (
          currentData.map((recommendation, idx) => (
            <div key={idx} className="product-item">
              <h4>{recommendation.name}</h4>
              <img
                src={`/${recommendation.image}`}
                alt={recommendation.name}
                className="product-image"
              />
              <div className="button-container">
                <button
                  onClick={() => handleLike(recommendation)}
                  className={`like-button ${
                    favorites.includes(recommendation.name) ? "liked" : ""
                  }`}
                >
                  <Heart className="heart" />
                </button>

                <button
                  onClick={() => handleShowPopup(recommendation)}
                  className="info-button"
                >
                  <BadgeInfo />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">
            No skincare products match your search or selected type.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
  <div className="pagination">
    <button
      onClick={() => changePage(currentPage - 1)}
      className="page-button prev-button"
      disabled={currentPage === 1} // Disable jika di halaman pertama
    >
      &lt;
    </button>

    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => changePage(i + 1)}
        className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => changePage(currentPage + 1)}
      className="page-button next-button"
      disabled={currentPage === totalPages} // Disable jika di halaman terakhir
    >
      &gt;
    </button>
  </div>
)}

      {/* Popup Info */}
      {showPopup && popupData && (
        <div className="popup-overlay show" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{popupData.name}</h2>
            <img
              src={`/${popupData.image}`}
              alt={popupData.name}
              className="popup-image"
            />
            <h2>{popupData.type}</h2>
            <p>{popupData.description}</p>
            <button onClick={closePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
