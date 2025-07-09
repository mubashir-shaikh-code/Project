import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://project-blcv.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.role === 'admin') {
          alert('Admin login successful!');
          window.location.href = '/admin';
        } else {
          localStorage.setItem('token', data.token); // Store JWT
          const decoded = jwtDecode(data.token);
          localStorage.setItem('user', JSON.stringify(decoded.user));
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.reload();
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto flex flex-col gap-4">
      <h2 className="font-bold text-2xl text-center">Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full bg-blue-500 text-black py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
