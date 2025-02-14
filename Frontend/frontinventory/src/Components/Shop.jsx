import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCategory = location.state?.category || "All";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://botique-backend.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (category === "All") {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter((product) => product.category === category));
      }
      setLoading(false);
    }, 500);
  }, [category, products]);

  return (
    <div className="min-h-screen w-full text-gray-900 flex flex-col items-center pt-20 bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800">{category} Collection</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-12">
        {["All", "Bangle", "Blouse", "Earrings"].map((item) => (
          <button
            key={item}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
              category === item ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 w-full max-w-7xl">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden text-center p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate("/product-details", { state: { product } })}
              >
                <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md" />
                <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
                <p className="text-lg text-blue-600 font-bold">₹{product.price}</p>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p> {/* Added description */}
              </div>
            ))
          ) : (
            <p className="text-2xl text-gray-500">No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
