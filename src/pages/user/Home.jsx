import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/skincare.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-pink-500">
        Loading products...
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full pt-20">
      {/* Video Background */}
      <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Overlay + Welcome Text */}
        <div className="absolute inset-0 bg-pink-200/50 flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-pink-500 mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Zamora Beauty Guide
          </motion.h1>
          <motion.p
            className="max-w-2xl text-gray-700 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover the perfect way to care for your skin. Zamora Beauty Guide
            helps you consult and understand your skin's unique needs, providing
            expert recommendations to achieve your best glow.
          </motion.p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-12">
          Our Favorite Products by Skin Type
        </h2>

        {products.map((category, idx) => (
          <motion.div
            key={idx}
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {category.name}
            </h3>
            <p className="text-gray-600 mb-6">{category.description}</p>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.recommendations.map((product) => (
                <motion.div
                  key={product.id}
                  className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 md:h-64 lg:h-72 object-cover"
                  />
                  {/* Overlay hanya muncul saat hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-1">
                      {category.name}
                    </span>
                    <h4 className="text-white text-lg font-semibold">
                      {product.name}
                    </h4>
                    <p className="text-sm text-white mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
