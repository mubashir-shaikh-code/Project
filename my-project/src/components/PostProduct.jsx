import React, { useState } from 'react';

const PostProduct = ({ onClose, user }) => {
  const [formData, setFormData] = useState({ name: '', price: '', imageUrl: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');  // ✅ get token from storage
    const data = { ...formData, userId: user._id };

    try {
      const res = await fetch('https://ecom-backend-production-afea.up.railway.app/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // ✅ send token to backend
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert(result.message);
      onClose();
    } catch (err) {
      console.error('Error posting product:', err);
      alert('Failed to post product');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-black text-xl font-bold">&times;</button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">Post a Product</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="border px-3 py-2 rounded text-black" required />
          <input type="number" name="price" placeholder="Product Price $" onChange={handleChange} className="border px-3 py-2 rounded text-black" required />
          <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} className="border px-3 py-2 rounded text-black" required />
          <button type="submit" className="bg-blue-600 hover:bg-teal-700 text-black py-2 rounded">Post Product</button>
        </form>
      </div>
    </div>
  );
};

export default PostProduct;
