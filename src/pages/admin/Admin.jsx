import { useState, useEffect } from "react";

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

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        console.log("Produk yang diambil dari localStorage:", parsedProducts); 
        setProducts(parsedProducts);
      } catch (error) {
        console.error("Error parsing products from localStorage:", error);
      }
    } else {
      console.log(
        "Tidak ada produk di localStorage, mengambil data dari file JSON."
      );
      fetch("/skincare.json")
        .then((response) => response.json())
        .then((data) => {
          const recommendations = data.flatMap((item) => item.recommendations);
          setProducts(recommendations);
          localStorage.setItem("products", JSON.stringify(recommendations));
          console.log("Produk yang disimpan ke localStorage:", recommendations); 
        })
        .catch((error) =>
          console.error("Error fetching skincare data:", error)
        );
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      console.log("Menyimpan produk ke localStorage:", products); 
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    }
  };

  const handleAdd = () => {
    const newProduct = {
      ...formState,
      id: Date.now(),
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    resetForm();
  };

  const handleEdit = (product) => {
    setFormState(product);
    setIsEditing(true);
  };

  const saveEdit = () => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === formState.id ? formState : p))
    );
    resetForm();
    setIsEditing(false);
  };

  const resetForm = () => {
    setFormState({ id: null, name: "", type: "", description: "", image: "" });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Add Product - Zamora Beauty Guide</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? saveEdit() : handleAdd();
        }}
        className="admin-form"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formState.name}
          onChange={handleChange}
          required
          className="admin-form-input"
        />
        <input
          type="text"
          name="type"
          placeholder="Product Type"
          value={formState.type}
          onChange={handleChange}
          required
          className="admin-form-input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
          required
          className="admin-form-textarea"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formState.image}
          onChange={handleChange}
          required
          className="admin-form-input"
        />
        <div className="admin-submit-cancel-container">
          <button type="submit" className="admin-submit-button">
            {isEditing ? "Save Changes" : "Add Product"}
          </button>
          {isEditing && (
            <button onClick={resetForm} className="admin-cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="admin-product-item">
              <h4 className="admin-product-name">{product.name}</h4>
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="admin-product-image"
              />
              <p className="admin-product-type">{product.type}</p>
              <div className="admin-button-container">
                <button
                  onClick={() => handleEdit(product)}
                  className="admin-edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="admin-delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="admin-no-products-message">
            No products available. Add a new product to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default Admin;
