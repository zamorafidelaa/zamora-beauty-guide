import { useEffect, useState } from "react";
import { BadgeInfo } from "lucide-react";
import { Heart } from "lucide-react";
import { Search } from "lucide-react";

const Product = () => {
  const [favorites, setFavorites] = useState([]); // Favorit lokal (array of objects)
  const [skincareData, setSkincareData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Load skincare data from localStorage
    const storedData = localStorage.getItem("products");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setSkincareData(parsedData);
        setFilteredData(parsedData);
      } catch (error) {
        console.error("Error parsing products data from localStorage:", error);
      }
    }

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Error parsing favorites data from localStorage:", error);
      }
    }
  }, []);

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some((fav) => fav.name === product.name);

    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.name !== product.name) // Remove if already in favorites
      : [...favorites, { name: product.name, image: product.image }]; // Add if not in favorites

    setFavorites(updatedFavorites);

    // Save updated favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const results = skincareData.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.type.toLowerCase().includes(value)
    );
    setFilteredData(results);
    setCurrentPage(1);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value.toLowerCase();
    setSelectedType(type);

    if (type === "") {
      setFilteredData(skincareData);
    } else {
      const results = skincareData.filter(
        (product) => product.type.toLowerCase() === type
      );
      setFilteredData(results);
    }
    setCurrentPage(1);
  };

  const handleShowPopup = (product) => {
    setPopupData(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupData(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <option value="cleanser">Cleanser</option>
        <option value="moisturizer">Moisturizer</option>
        <option value="serum">Serum</option>
        <option value="sunscreen">Sunscreen</option>
      </select>

      <div className="product-list">
        {currentData.length > 0 ? (
          currentData.map((product, idx) => (
            <div key={idx} className="product-item">
              <h4>{product.name}</h4>
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="button-container">
                <button
                  onClick={() => toggleFavorite(product)}
                  className="like-button"
                >
                  <Heart
                    className={`heart-icon ${
                      favorites.some((fav) => fav.name === product.name)
                        ? "liked"
                        : "unliked"
                    }`}
                    fill={
                      favorites.some((fav) => fav.name === product.name)
                        ? "red"
                        : "none"
                    }
                    stroke={
                      favorites.some((fav) => fav.name === product.name)
                        ? "red"
                        : "currentColor"
                    }
                  />
                </button>

                <button
                  onClick={() => handleShowPopup(product)}
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-button prev-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              className={`page-button ${
                currentPage === idx + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="page-button next-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}

      {showPopup && popupData && (
        <div className="popup-overlay show" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{popupData.name}</h2>
            <img
              src={`/${popupData.image}`}
              alt={popupData.name}
              className="popup-image"
            />
            <h2>{popupData.type}</h2>
            <p>{popupData.description}</p>
            <button onClick={handleClosePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;