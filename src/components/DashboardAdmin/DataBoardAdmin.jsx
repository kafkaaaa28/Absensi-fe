import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import { Spinner } from 'flowbite-react';
import { MdMeetingRoom } from 'react-icons/md';
import bgadmin from '../img/bgadmin.png';

const DataBoardAdmin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDosen, setTotalDosen] = useState(0);
  const [totalMatkul, setTotalMatkul] = useState(0);
  const [totalKelas, setTotalKelas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState([]);

  const fetchCounts = async () => {
    try {
      setLoading(false);
      const resSiswa = await api.get('/users/siswa');
      setTotalUsers(resSiswa.data.length);
      const resDosen = await api.get('/users/dosen');
      setTotalDosen(resDosen.data.length);
      const resKelas = await api.get('/kelas');
      setTotalKelas(resKelas.data.length);
      const resMatkul = await api.get('/matkul');
      setTotalMatkul(resMatkul.data.length);
    } catch (err) {
      setLoading(false);
      setError('Gagal mengambil data: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };
  const getMe = async () => {
    try {
      const response = await api.get('/auth/me');
      setIsAdmin(response.data);
      setLoading(false);
    } catch (err) {
      console.log('gagal ambil data');
      setLoading(false);
    }
  };
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
        <img src={bgadmin} alt="dashboard background" className="absolute inset-0 w-full h-full object-cover object-[center_50%] z-0" />

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 h-full w-full p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Selamat Datang, <span className="text-blue-300"> Admin {loading ? <Spinner color="success" size="md" aria-label="Loading" /> : isAdmin?.nama}</span> 👋
            </h2>
            <p className="text-white/80 mt-1 text-sm">Dashboard terbaru Anda ada di sini</p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md">Admin Panel</span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserGraduate className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Mahasiswa</p>
              <p className="text-2xl font-semibold text-gray-700">{loading ? <Spinner color="info" aria-label="Info spinner example" /> : totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaChalkboardTeacher className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Dosen</p>
              <p className="text-2xl font-semibold text-gray-700">{loading ? <Spinner color="info" aria-label="Info spinner example" /> : totalDosen}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaBook className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Matkul</p>
              <p className="text-2xl font-semibold text-gray-700">{loading ? <Spinner color="info" aria-label="Info spinner example" /> : totalMatkul}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <MdMeetingRoom className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Kelas</p>
              <p className="text-2xl font-semibold text-gray-700">{loading ? <Spinner color="info" aria-label="Info spinner example" /> : totalKelas}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBoardAdmin;
