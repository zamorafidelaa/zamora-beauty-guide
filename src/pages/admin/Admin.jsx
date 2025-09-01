import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, X } from "lucide-react";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [formState, setFormState] = useState({
    id: null,
    name: "",
    type: "",
    description: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Load products from localStorage or JSON
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error("Error parsing products:", error);
      }
    } else {
      fetch("/skincare.json")
        .then((res) => res.json())
        .then((data) => {
          const recommendations = data.flatMap((item) => item.recommendations || []);
          const productsWithId = recommendations.map((p) => ({
            id: p.id || Date.now() + Math.random(),
            ...p,
          }));
          setProducts(productsWithId);
          localStorage.setItem("products", JSON.stringify(productsWithId));
        })
        .catch((err) => console.error("Error fetching JSON:", err));
    }
  }, []);

  const saveToLocalStorage = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setFormState({ id: null, name: "", type: "", description: "", image: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleAdd = () => {
    const newProduct = { ...formState, id: Date.now() };
    saveToLocalStorage([...products, newProduct]);
    setShowModal(false);
  };

  const handleEditClick = (product) => {
    setFormState(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const saveEdit = () => {
    const updatedProducts = products.map((p) =>
      p.id === formState.id ? formState : p
    );
    saveToLocalStorage(updatedProducts);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      saveToLocalStorage(updatedProducts);
    }
  };

  // --- SEARCH & PAGINATION ---
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // --- Pagination helper: tampilkan max 5 halaman ---
  const getPageNumbers = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);

    if (end - start < 4) start = Math.max(end - 4, 1);

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const softPink = "#F9A8D4";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6" style={{ color: softPink }}>
        Zamora Beauty Guide - Admin Panel
      </h1>

      {/* Add + Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2">
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 border-2 rounded-lg px-4 py-2 font-semibold"
          style={{
            borderColor: softPink,
            backgroundColor: "white",
            color: softPink,
          }}
        >
          <Plus size={18} /> Add Product
        </button>
        <input
          type="text"
          placeholder="Search by name or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
          style={{ borderColor: softPink, focusBorderColor: softPink }}
        />
      </div>

      {/* Products Table */}
      {displayedProducts.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ backgroundColor: softPink, color: "white" }}>
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <img
                      src={`/${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.type}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modern Dynamic Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => changePage(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              &lt;
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition ${
                  currentPage === page
                    ? "bg-white border-2 border-[F9A8D4] text-[F9A8D4] shadow"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                style={{
                  borderColor: currentPage === page ? softPink : "",
                  color: currentPage === page ? softPink : "",
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => changePage(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              &gt;
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No products found.</p>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4" style={{ color: softPink }}>
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 transition"
              style={{ focusBorderColor: softPink }}
            />
            <input
              type="text"
              name="type"
              placeholder="Product Type"
              value={formState.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 transition"
              style={{ focusBorderColor: softPink }}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formState.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 transition"
              style={{ focusBorderColor: softPink }}
            />
            <input
              type="text"
              name="image"
              placeholder="Image filename (from public/)"
              value={formState.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 transition"
              style={{ focusBorderColor: softPink }}
            />
            <button
              onClick={isEditing ? saveEdit : handleAdd}
              className={`w-full py-2 rounded-lg transition ${
                isEditing
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : `bg-[${softPink}] text-white hover:opacity-90`
              }`}
            >
              {isEditing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
