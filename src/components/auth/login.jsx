import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import appease from '../img/univ.png';
import bgappease from '../img/unnamed.png';
const Login = ({ setIsAuthenticated, setUser }) => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fromData, setFromdata] = useState({
    email: '',
    password: '',
  });
  const [lihatPassword, setLihatpassword] = useState(false);
  const handleLihatPassword = () => {
    setLihatpassword(!lihatPassword);
  };

  const { email, password } = fromData;
  const handelchange = (e) => {
    setFromdata({ ...fromData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', fromData);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      setLoading(false);
      const userRole = response.data.user.role;
      setError('');
      setMessage(response.data.message || 'Login berhasil');
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/dashboardAdmin');
        } else if (userRole === 'siswa' || userRole === 'admin') {
          navigate('/dashboard');
        } else if (userRole === 'dosen' || userRole === 'admin') {
          navigate('/dashboardDosen');
        } else {
          navigate('/');
        }
      }, 100);
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err.response?.data || err.message);
      setMessage('');
      setError(`email atau Password Salah`);
    }
  };

  return (
    <div className=" bg-cover bg-center  bg-fixed min-h-screen flex items-center justify-center " style={{ backgroundImage: `url(${bgappease})` }}>
      <div className="bg-white/10 backdrop-blur-sm  rounded-2xl shadow-2xl p-6 w-[80%] max-w-md max-h-[90vh] overflow-y-auto">
        <img src={appease} alt="Logo Piksi" className="w-20 mb-2 mx-auto" />
        <h1 className="text-xl text-center font-semibold mb-5 text-black">E - LEARNING </h1>
        <div className=" mb-4">
          <h2 className="text-lg text-center font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} id="formLogin" className="space-y-3">
            <input type="email" name="email" value={email} onChange={handelchange} id="loginEmail" placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-xl" />
            <div>
              <div className="flex items-center gap-2">
                <input type={lihatPassword ? 'text' : 'password'} name="password" value={password} onChange={handelchange} id="password" placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-xl pr-10" />
                <button type="button" onClick={handleLihatPassword} className="text-gray-600 hover:text-gray-800">
                  {lihatPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#13314E] hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition duration-300">
              {loading ? 'Loading...' : 'Login'}
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
