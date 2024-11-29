import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from skincare.json
  useEffect(() => {
    fetch("/skincare.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  return (
    <div className="home-container">
      {/* Video Background */}
      <video className="video-player" autoPlay loop muted playsInline>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Welcome Message */}
      <div className="welcome-message">
        <h1>Welcome to Zamora Beauty Guide</h1>
        <p>
          Discover the perfect way to care for your skin. Zamora Beauty Guide
          helps you consult and understand your skin's unique needs, providing
          expert recommendations to achieve your best glow.
        </p>
      </div>

      {/* Product Categories */}
      <div className="content">
        <h2>Our Favorite Products by Skin Type</h2>

        {/* Kulit Berjerawat */}
        {products[0]?.recommendations ? (
          <div className="category">
            <h3>Kulit Berjerawat</h3>
            <p>
              Kulit memiliki jerawat aktif atau bekas jerawat yang membutuhkan
              perawatan khusus untuk mengontrol minyak dan melawan bakteri.
            </p>
            <div className="products-container-two">
              {products[0].recommendations.map((product) => (
                <div className="product-item-two" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No products available for "Kulit Berjerawat".</p>
        )}

        {/* Kulit Belang */}
        {products[1]?.recommendations ? (
          <div className="category">
            <h3>Kulit Belang</h3>
            <p>
              Kulit memiliki warna yang tidak merata, biasanya disebabkan oleh
              paparan sinar matahari atau hiperpigmentasi.
            </p>
            <div className="products-container-two">
              {products[1].recommendations.map((product) => (
                <div className="product-item-two" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No products available for "Kulit Belang".</p>
        )}
      </div>
    </div>
  );
};

export default Home;
