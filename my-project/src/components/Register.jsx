import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful!');
        window.location.reload();
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      alert('Something went wrong. See console for details.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
        className="border px-3 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-black py-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
