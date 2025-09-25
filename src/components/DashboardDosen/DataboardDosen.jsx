import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Spinner } from 'flowbite-react';
import { FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import bgdosen from '../img/bg-dosen.png';
import JadwalDosenharini from './JadwalDosenHarini';
import { MdMeetingRoom } from 'react-icons/md';
const DataboardDosen = () => {
  const [totalKelas, setTotalKelas] = useState(0);
  const [totalJadwal, setTotalJadwal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDosen, setIsDosen] = useState([]);
  const fetchCounts = async () => {
    try {
      setLoading(false);
      const resKelas = await api.get('/dosen/kelasdosen');
      setTotalKelas(resKelas.data.length);
      const resJadwal = await api.get('dosen/jadwaldosen');
      setTotalJadwal(resJadwal.data.length);
    } catch (err) {
      setLoading(false);
      setError('Gagal mengambil data: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  const getMe = async () => {
    try {
      const response = await api.get('/auth/me');
      setIsDosen(response.data);
      setLoading(false);
    } catch (err) {
      console.log('gagal ambil data');
      setLoading(false);
    }
  };
  const hariIni = new Date().toLocaleString('id-ID', { weekday: 'long' });

  useEffect(() => {
    fetchCounts();
    getMe();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="relative rounded-xl overflow-hidden h-52 md:h-64 shadow-lg mb-5">
        <img src={bgdosen} alt="dashboard background" className="absolute inset-0 w-full h-full object-cover object-[center_48%] z-0" />

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 h-full w-full p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Selamat Datang, <span className="text-blue-300"> {loading ? <Spinner color="success" size="md" aria-label="Loading" /> : isDosen?.nama}</span> 👋
            </h2>
            <p className="text-white/80 mt-1 text-sm">Dashboard terbaru Anda ada di sini</p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md">Dosen Panel</span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <MdMeetingRoom className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Kelas Saya</p>
              <p className="text-2xl font-semibold text-gray-700">{loading ? <Spinner color="info" aria-label="Info spinner example" /> : totalKelas}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaCalendarAlt className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Jadwal Saya</p>
              <p className="text-2xl font-semibold text-gray-700">{loading ? <Spinner color="info" aria-label="Info spinner example" /> : totalJadwal}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 mt-3 rounded-lg">
        <div className=" flex p-3">
          <p className="font-bold text-md">Jadwal Harini, {hariIni}</p>
        </div>
        <JadwalDosenharini />
      </div>
    </div>
  );
};

export default DataboardDosen;
