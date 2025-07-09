import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || token === "undefined") return;

    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded); 
    const userId = decoded.id;


    fetch(`http://localhost:5000/my-products/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
         console.log("Fetched user products:", data);
            if (Array.isArray(data)) {
            setProducts(data);
            } else {
                console.error('Unexpected response:', data);
                setProducts([]); // Fallback to empty array to avoid map error
  }
})
        .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]); // Fallback to avoid crash
});

  }, []);

  return (
    <section className="bg-white py-12 px-6 md:px-20">
      <h2 className="text-2xl font-bold mb-4 text-black">Your Products</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow bg-gray-100">
            <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2 text-black">{p.name}</h3>
            <p className="text-gray-600">${p.price}</p>
            <p className={`mt-2 font-medium ${p.status === 'approved' ? 'text-green-600' : 'text-yellow-500'}`}>
              {p.status === 'approved' ? 'Approved' : 'Pending'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
