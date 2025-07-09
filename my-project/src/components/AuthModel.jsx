import React, { useState } from 'react';
import Login from './login';
import Register from './Register'; 

const AuthModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black w-96 p-6 rounded-lg shadow-lg">
        {/* Tab buttons */}
        <div className="flex justify-between mb-4">
          <button
            className={`px-3 py-2 text-sm ${
              activeTab === 'login' ? 'bg-blue-500 text-black' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`px-3 py-2 text-sm ${
              activeTab === 'register' ? 'bg-blue-500 text-black' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {/* Form display */}
        {activeTab === 'login' && <Login />}
        {activeTab === 'register' && <Register />}

        {/* Close */}
        <button
          className="mt-4 text-sm text-black hover:underline  mx-auto"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;

