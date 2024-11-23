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
  const itemsPerPage = 10; // Show 10 products per page
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

    let results = skincareData.filter(
      (item) =>
        item.concern.toLowerCase().includes(value) ||
        item.recommendations.some(
          (recommendation) =>
            recommendation.name.toLowerCase().includes(value) ||
            recommendation.type.toLowerCase().includes(value)
        )
    );

    if (selectedType) {
      results = results
        .map((item) => ({
          ...item,
          recommendations: item.recommendations.filter(
            (recommendation) =>
              recommendation.type.toLowerCase() === selectedType.toLowerCase()
          ),
        }))
        .filter((item) => item.recommendations.length > 0);
    }

    setFilteredData(results);
    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);

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
        .filter((item) => item.recommendations.length > 0);
    }

    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.concern.toLowerCase().includes(searchTerm) ||
          item.recommendations.some((recommendation) =>
            recommendation.name.toLowerCase().includes(searchTerm)
          )
      );
    }

    setFilteredData(results);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalItems = filteredData.flatMap(item => item.recommendations).length; // Total number of recommendations
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

  const currentData = filteredData
    .flatMap(item => item.recommendations)
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
    setShowPopup(true); // Show popup with product info
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
        <option value="">Select a type</option>
        <option value="Cleanser">Cleanser</option>
        <option value="Moisturizer">Moisturizer</option>
        <option value="Serum">Serum</option>
        <option value="Sunscreen">Sunscreen</option>
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
                  className={`like-button ${favorites.includes(recommendation.name) ? "liked" : ""}`}
                >
                  <Heart className="heart"/>
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
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
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
            <button onClick={closePopup} className="close-popup-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
