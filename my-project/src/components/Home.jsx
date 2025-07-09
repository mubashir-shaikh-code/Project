import React, { useEffect, useState } from 'react';
import bgImage from '../assets/bg.jpg';
import AuthModal from './AuthModel';
import Products from './Products';
import PostProduct from './PostProduct';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [user, setUser] = useState(null);
  const [approvedProducts, setApprovedProducts] = useState([]);

  useEffect(() => {
const stored = localStorage.getItem('user');
if (stored && stored !== "undefined") {
  setUser(JSON.parse(stored));
}
    fetch('http://localhost:5000/approved-products')
      .then((res) => res.json())
      .then(setApprovedProducts);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <div
      className=" h-screen w-full bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <header className="pb-27 px-8 py-4 flex justify-between items-center bg-opacity-70">
        <div className="text-xl font-bold">ECOM</div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-bold font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-black hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="text-black hover:text-blue-300"
              onClick={() => setShowModal(true)}
            >
              Login/Register
            </button>
          )}

          {user && (
            <button
              onClick={() => setShowPostModal(true)}
              className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition"
            >
              Post a Product
            </button>
          )}
        </div>
      </header>

      <section className="w-full px-8 md:px-24 py-20">
        <h2 className="text-xl md:text-2xl font-light text-gray-200">
          Hello this is my Website
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3">
          Post and Get Product Approved <br /> Be Happy. Be Productive.
        </h1>
        <p className="mt-20 text-lg font-bold text-white">
            Bringing quality products to your doorstep with ease. Discover great deals and shop from trusted sellers worldwide
        </p>
      </section>

      <section className=" bg-gradient-to-r from-gray-500 to-black-600 py-20 px-6 md:px-20">
        <h2 className="text-2xl font-bold mb-4 text-black">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {approvedProducts.map((p) => (
            <div key={p._id} className="border p-4 rounded shadow bg-gray-100">
              <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded text-black" />
              <h3 className="text-xl font-semibold mt-2 text-black">{p.name}</h3>
              <p className="text-gray-600">${p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {user && <Products user={user} />}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      {showPostModal && <PostProduct onClose={() => setShowPostModal(false)} user={user} />}
    </div>
  );
};

export default Home;
