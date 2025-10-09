import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import ModalAbsensiSiswa from './ModalAbsensiSiswa';
const AbsensiMahasiswa = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [ModalAbsensi, setModalAbsensi] = useState(false);
  const fetchKelas = async () => {
    try {
      const resKelas = await api.get('/siswa/kelasSiswa');
      setDataKelas(resKelas.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleAbsensi = (item) => {
    setSelectedKelas(item);
    setModalAbsensi(true);
  };
  useEffect(() => {
    fetchKelas();
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto p-4 rounded-lg shadow-lg">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Kelas
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Matkul
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode Matakuliah
                </th>{' '}
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataKelas.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                    Tidak ada Matkul
                  </td>
                </tr>
              ) : (
                dataKelas.map((item, index) => (
                  <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                    <td className=" px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.nama_kelas}</td>
                    <td className="px-6 py-4">{item.nama_matkul}</td>
                    <td className="px-6 py-4">{item.kode_matkul}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500" onClick={() => handleAbsensi(item)}>
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
      <ModalAbsensiSiswa modalLihat={ModalAbsensi} OnClose={setModalAbsensi} data={selectedKelas} />
    </>
  );
};

export default AbsensiMahasiswa;
