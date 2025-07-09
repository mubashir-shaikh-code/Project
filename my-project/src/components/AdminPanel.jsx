import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [pendingProducts, setPendingProducts] = useState([]);

  useEffect(() => {
    fetch('https://project-blcv.vercel.app/api/pending-products')
      .then(res => res.json())
      .then(setPendingProducts);
  }, []);

  const handleApprove = async (id) => {
    const res = await fetch(`https://project-blcv.vercel.app/api/approve-product/${id}`, {
      method: 'PUT'
    });
    const data = await res.json();
    alert(data.message);
    setPendingProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Pending Product Approvals</h2>

      {pendingProducts.length === 0 ? (
        <p className="text-gray-400">No products pending approval.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {pendingProducts.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col md:flex-row items-center gap-4"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-400">Price: ${product.price}</p>
                <button
                  className="mt-3 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => handleApprove(product._id)}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
