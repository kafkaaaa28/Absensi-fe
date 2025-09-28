import react, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navdashboard from './NavMahasiswa';
import DataBoardSiswa from './DataBoardSiswa';
import ProfileSiswa from './Profile/ProfileSiswa';
import JadwalSiswa from './Jadwal/JadwalSiswa';
import MatkulSiswa from './matkul/MatkulSiswa';
const Admin = ({ setIsAuthenticated, setUser }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <Navdashboard setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataBoardSiswa />} />
            <Route path="/profilesaya" element={<ProfileSiswa />} />
            <Route path="/jadwalsaya" element={<JadwalSiswa />} />
            <Route path="/Matkulsaya" element={<MatkulSiswa />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Admin;
