import { useEffect, useState } from "react";
import { Heart, BadgeInfo, Search } from "lucide-react";
import { motion } from "framer-motion";

const Product = () => {
  const [favorites, setFavorites] = useState([]);
  const [skincareData, setSkincareData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // User login simulasi
  const currentUser = localStorage.getItem("currentUser") || "guest";

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("products")) || [];
    setSkincareData(storedData);
    setFilteredData(storedData);

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(storedFavorites[currentUser] || []);
  }, [currentUser]);

  const toggleFavorite = (product) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    const userFav = storedFavorites[currentUser] || [];

    const isFav = userFav.some((f) => f.name === product.name);
    const updatedFav = isFav
      ? userFav.filter((f) => f.name !== product.name)
      : [...userFav, { name: product.name, image: product.image }];

    storedFavorites[currentUser] = updatedFav;
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setFavorites(updatedFav);
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
    if (!type) setFilteredData(skincareData);
    else setFilteredData(skincareData.filter((p) => p.type.toLowerCase() === type));
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

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-[calc(80px+4rem)]">
      <h1 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-8 text-center">
        All Skincare Products
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by product or concern..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="w-full sm:w-1/4 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-300"
        >
          <option value="">All Types</option>
          <option value="cleanser">Cleanser</option>
          <option value="moisturizer">Moisturizer</option>
          <option value="serum">Serum</option>
          <option value="sunscreen">Sunscreen</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentData.length > 0 ? (
          currentData.map((product, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer group"
            >
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              {/* Overlay muncul saat hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-white text-sm">{product.type}</p>
                <button
                  onClick={() => handleShowPopup(product)}
                  className="mt-3 px-3 py-1 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition"
                >
                  Info
                </button>
              </div>

              {/* Heart tetap di pojok */}
              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-2 right-2 z-10"
              >
                <Heart
                  className={`w-6 h-6 transition-transform duration-200 ${
                    favorites.some((f) => f.name === product.name)
                      ? "text-red-500 scale-125"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No skincare products match your search or type.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg hover:bg-pink-100"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-lg hover:bg-pink-100 ${
                currentPage === i + 1 ? "bg-pink-400 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg hover:bg-pink-100"
          >
            &gt;
          </button>
        </div>
      )}

      {/* Popup */}
      {showPopup && popupData && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={handleClosePopup}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="font-bold text-xl text-gray-800 mb-3">{popupData.name}</h2>
            <img
              src={`/${popupData.image}`}
              alt={popupData.name}
              className="w-full h-64 object-cover rounded-lg mb-3"
            />
            <h3 className="text-pink-400 font-semibold mb-2">{popupData.type}</h3>
            <p className="text-gray-600 text-sm">{popupData.description}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Product;
