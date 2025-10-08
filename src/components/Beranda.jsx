import React from 'react';
import bgappease from './img/682940.jpg';
import Navbar from './Navbar';

const Beranda = ({ setIsAuthenticated, isAuthenticated, setUser }) => {
  const Logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <div className="relative bg-cover bg-center bg-fixed min-h-screen " style={{ backgroundImage: `url(${bgappease})` }}>
      <div className="relative z-20">
        <Navbar isAuthenticated={isAuthenticated} Logout={Logout} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700/50 to-green-400/50">
        <div className="w-full  h-screen flex flex-col justify-center items-center">
          <p className="text-white font-bold text-[30px] text-center md:text-[50px]">Smart Absensi Universitas Appease</p>
          <p className="text-white  text-lg text-center ">Absensi Berbasis Qr Code dan Face Embendding</p>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
