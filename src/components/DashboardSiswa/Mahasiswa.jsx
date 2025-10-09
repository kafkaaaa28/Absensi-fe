import react, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navdashboard from './NavMahasiswa';
import DataBoardSiswa from './DataBoardSiswa';
import ProfileSiswa from './Profile/ProfileSiswa';
import JadwalSiswa from './Jadwal/JadwalSiswa';
import MatkulSiswa from './matkul/MatkulSiswa';
import ModalFaceSiswa from './ModalFaceSiswa';
import api from '../../utils/api';
import AbsensiMahasiswa from './Absensi/AbsensiMahasiswa';
const Admin = ({ setIsAuthenticated, setUser }) => {
  const [ModalFace, setModalFace] = useState(false);

  const cekFaceData = async () => {
    try {
      const res = await api.get(`/siswa/cek-daftar`);

      if (res.data.hasFace) {
        setModalFace(false);
      } else {
        setModalFace(true);
      }
    } catch (error) {
      console.error('Error saat cek face:', error);
    }
  };
  useEffect(() => {
    cekFaceData();
  }, []);
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
            <Route path="/absensi" element={<AbsensiMahasiswa />} />
          </Routes>
          <ModalFaceSiswa ModalFace={ModalFace} setModalFace={setModalFace} />
        </div>
      </div>
    </div>
  );
};
export default Admin;
