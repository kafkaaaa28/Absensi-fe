import react, { useState, useEffect } from 'react';
import NavAdmin from './NavAdmin';
import DataboardAdmin from './DataBoardAdmin';
import { Routes, Route } from 'react-router-dom';
import MahasiswaTable from './mahasiswa/Mahasiswa';
import Dosen from './Dosen/Dosen';
import Matkul from './Matkul/Matkul';
import DataJadwal from './jadwal/Jadwal';
import Kelas from './Kelas/Kelas';
import KelasSiswa from './KelasSiswa/KelasSiswa';
const Admin = ({ setIsAuthenticated, setUser }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <NavAdmin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataboardAdmin />} />
            <Route path="/mahasiswa" element={<MahasiswaTable />} />
            <Route path="/dosen" element={<Dosen />} />
            <Route path="/matkul" element={<Matkul />} />
            <Route path="/jadwal-matkul" element={<DataJadwal />} />
            <Route path="/kelas" element={<Kelas />} />
            <Route path="/kelas-siswa" element={<KelasSiswa />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Admin;
