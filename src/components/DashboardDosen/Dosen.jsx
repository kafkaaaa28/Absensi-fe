import react, { useState, useEffect } from 'react';
import NavDosen from './NavDosen';
import { Routes, Route } from 'react-router-dom';
import DataboardDosen from './DataboardDosen';
import JadwalDosen from './Jadwal/JadwalDosen';
import MatkulDosen from './Jadwal/MatkulDosen';
import ProfileDosen from './Profile/ProfileDosen';

const Admin = ({ setIsAuthenticated, setUser }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <NavDosen setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataboardDosen />} />
            <Route path="/jadwalSaya" element={<JadwalDosen />} />
            <Route path="/MatkulSaya" element={<MatkulDosen />} />
            <Route path="/ProfileSaya" element={<ProfileDosen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Admin;
