import { BadgeInfo } from "lucide-react";
import { Heart } from "lucide-react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Product = () => {
  const [skincareData, setSkincareData] = useState([]); // Data asli
  const [filteredData, setFilteredData] = useState([]); // Data untuk ditampilkan
  const [favorites, setFavorites] = useState([]); // Produk yang disukai
  const [popupData, setPopupData] = useState(null); // Data untuk popup
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState(""); // Filter tipe
  const [searchTerm, setSearchTerm] = useState(""); // Kata pencarian
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10; // Jumlah item per halaman

  // 1. Fetch data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setSkincareData(parsedData); // Set data asli
        setFilteredData(parsedData); // Set data untuk ditampilkan
      } catch (error) {
        console.error("Error parsing products data from localStorage:", error);
      }
    } else {
      console.warn("No products found in localStorage with key 'products'.");
    }
  }, []);

  // 2. Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const results = skincareData.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.type.toLowerCase().includes(value)
    );
    setFilteredData(results);
    setCurrentPage(1); // Reset pagination
  };

  // 3. Handle type filtering
  const handleTypeChange = (e) => {
    const type = e.target.value.toLowerCase();
    setSelectedType(type);

    if (type === "") {
      setFilteredData(skincareData); // Tampilkan semua jika tipe kosong
    } else {
      const results = skincareData.filter(
        (product) => product.type.toLowerCase() === type
      );
      setFilteredData(results);
    }
    setCurrentPage(1); // Reset pagination
  };

  // 4. Handle like button
  const handleLike = (product) => {
    const updatedFavorites = favorites.includes(product.name)
      ? favorites.filter((name) => name !== product.name)
      : [...favorites, product.name];
    setFavorites(updatedFavorites);
  };

  // 5. Handle popup
  const handleShowPopup = (product) => {
    if (product && product.name) {
      setPopupData(product);
      setShowPopup(true);
    } else {
      console.error("Invalid product data:", product);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupData(null);
  };

  // 6. Pagination logic
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
          {/* Tombol "<" untuk halaman sebelumnya */}
          <button
            className="page-button prev-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {/* Tombol untuk setiap halaman */}
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

          {/* Tombol ">" untuk halaman berikutnya */}
          <button
            className="page-button next-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}

      {/* Popup Info */}
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
