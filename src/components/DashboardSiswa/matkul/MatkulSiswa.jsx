import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
const MatkulSiswa = () => {
  const [dataMatkul, setDataMatkul] = useState([]);
  const fetchMatkul = async () => {
    try {
      const resMatkul = await api.get('/siswa/matkulsiswa');
      setDataMatkul(resMatkul.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    fetchMatkul();
  }, []);
  return (
    <div className="relative overflow-x-auto p-4 rounded-lg shadow-lg">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Matkul
              </th>
              <th scope="col" className="px-6 py-3">
                semester
              </th>
              <th scope="col" className="px-6 py-3">
                sks
              </th>
              <th scope="col" className="px-6 py-3">
                Kode Matakuliah
              </th>
            </tr>
          </thead>
          <tbody>
            {dataMatkul.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                  Tidak ada Matkul
                </td>
              </tr>
            ) : (
              dataMatkul.map((item, index) => (
                <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                  <td className=" px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.nama_matkul}</td>
                  <td className="px-6 py-4">{item.semester}</td>
                  <td className="px-6 py-4">{item.sks}</td>
                  <td className="px-6 py-4">{item.kode_matkul}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatkulSiswa;
