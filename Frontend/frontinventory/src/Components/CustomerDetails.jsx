import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CustomerDetails = () => {
  const location = useLocation();
  const [cartDetails] = useState(location.state?.cart || []); // Get cart from state
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!customer.name) newErrors.name = "Name is required";
    if (!customer.email || !/^\S+@\S+\.\S+$/.test(customer.email)) newErrors.email = "Invalid email";
    if (!customer.phone || !/^\d{10}$/.test(customer.phone)) newErrors.phone = "Invalid phone number";
    if (!customer.address) newErrors.address = "Address is required";
    if (!customer.city) newErrors.city = "City is required";
    if (!customer.state) newErrors.state = "State is required";
    if (!customer.zip || !/^\d{6}$/.test(customer.zip)) newErrors.zip = "Invalid ZIP Code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cartDetails.length) {
      alert("Cart is empty! Please add items before proceeding.");
      return;
    }

    if (validate()) {
      localStorage.setItem("customerDetails", JSON.stringify(customer));
      localStorage.setItem("cartDetails", JSON.stringify(cartDetails)); // Store cart too
      navigate("/payment", { state: { customer: { name: "John", email: "john@example.com", phone: "1234567890" }, cartItems: [{ name: "Product A", quantity: 2 }] } });

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Customer Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Full Name</label>
            <input type="text" name="name" value={customer.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Email</label>
            <input type="email" name="email" value={customer.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Phone Number</label>
            <input type="text" name="phone" value={customer.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Address</label>
            <textarea name="address" value={customer.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg"></textarea>
            {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
          </div>

          <div className="mb-4 flex space-x-2">
            <div className="w-1/2">
              <label className="block font-semibold">City</label>
              <input type="text" name="city" value={customer.city} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
            </div>
            <div className="w-1/2">
              <label className="block font-semibold">State</label>
              <input type="text" name="state" value={customer.state} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold">ZIP Code</label>
            <input type="text" name="zip" value={customer.zip} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            {errors.zip && <p className="text-red-600 text-sm">{errors.zip}</p>}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetails;
