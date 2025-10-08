import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import ModalLihatSiswaKelas from './ModalLihatSiswaKelas';
import LihatAbsensi from '../Abensi/LihatAbsensi';
const MatkulDosen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showModalKelas, setshowModalKelas] = useState(false);
  const [showModalAbsen, setshowModalAbsen] = useState(false);
  const fetchmatkul = async (params) => {
    try {
      const res = await api.get('/dosen/kelasdosen');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
      setError('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };
  const handleKelas = (item) => {
    setshowModalKelas(true);
    setSelectedKelas(item);
  };
  const handleAbsensi = (item) => {
    setSelectedKelas(item);
    setshowModalAbsen(true);
  };
  useEffect(() => {
    fetchmatkul();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-3 justify-center items-center">
        <input type="text" placeholder="Cari Nama Mata Kuliah" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
      </div>
      <div className="relative overflow-x-auto p-4 rounded-lg">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Kelas
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Matakuliah
                </th>

                <th scope="col" className="px-6 py-3">
                  Semester
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode Matakuliah
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                    Tidak ada Matakuliah
                  </td>
                </tr>
              ) : data.filter((item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 bg-white text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                data
                  .filter((item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, index) => (
                    <tr key={item.id_jadwal} className="bg-white border-b  border-gray-200 transition">
                      <td className=" px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.nama_kelas}</td>
                      <td className="px-6 py-4">{item.nama_matkul}</td>
                      <td className="px-6 py-4">{item.semester}</td>
                      <td className="px-6 py-4">{item.kode_matkul}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500" onClick={() => handleKelas(item)}>
                            Lihat Mahasiswa
                          </button>
                          <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={() => handleAbsensi(item)}>
                            Lihat Absensi
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalLihatSiswaKelas modalLihat={showModalKelas} data={selectedKelas} OnClose={() => setshowModalKelas(false)} />
      <LihatAbsensi modalLihat={showModalAbsen} data={selectedKelas} OnClose={() => setshowModalAbsen(false)} />
    </>
  );
};

export default MatkulDosen;
