import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
const JadwalSiswaHarini = () => {
  const [data, setData] = useState([]);
  const fetchJadwalHarini = async () => {
    try {
      const res = await api.get('/siswa/jadwalharini');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };
  useEffect(() => {
    fetchJadwalHarini();
  }, []);
  return (
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
              hari
            </th>
            <th scope="col" className="px-6 py-3">
              Jam Mulai
            </th>
            <th scope="col" className="px-6 py-3">
              Jam Selesai
            </th>
            <th scope="col" className="px-6 py-3">
              Ruang
            </th>
            <th scope="col" className="px-6 py-3">
              Kode Matakuliah
            </th>
            <th scope="col" className="px-6 py-3">
              Dosen
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                Tidak ada jadwal
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id_jadwal} className="bg-white border-b  border-gray-200 transition">
                <td className=" px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.nama_kelas}</td>
                <td className="px-6 py-4">{item.nama_matkul}</td>
                <td className="px-6 py-4">{item.hari}</td>
                <td className="px-6 py-4">{item.jam_mulai}</td>
                <td className="px-6 py-4">{item.jam_selesai}</td>
                <td className="px-6 py-4">{item.ruang}</td>
                <td className="px-6 py-4">{item.kode_matkul}</td>
                <td className="px-6 py-4">{item.nama}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JadwalSiswaHarini;
