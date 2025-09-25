import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import TambahKelas from '../KelasSiswa/TambahKelasSiswa';
import ModalDetail from './ModalLihatKelas';
import Swal from 'sweetalert2';
const KelasSiswa = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [SelectedSiswa, setSelectedSiswa] = useState(null);
  const [showKelasModal, setShowKelasModal] = useState(false);
  const [dataKelas, setKelasData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const fetchMahasiswa = async (params) => {
    try {
      const res = await api.get('/users/siswa');
      setData(res.data);
    } catch (err) {
      console.log(err);
      setError('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };
  const fetchKelas = async () => {
    try {
      const response = await api.get(`/kelas/kelassiswa/${data.id_siswa}`);
      setKelasData(response.data);
    } catch (error) {
      console.error('Gagal mengambil data kelas:', error);
    }
  };
  useEffect(() => {
    fetchMahasiswa();
    fetchKelas();
  }, []);

  const handleKelas = (item) => {
    setSelectedSiswa(item);
    setShowKelasModal(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-3 justify-center items-center">
        <input type="text" placeholder="Cari Nim Mahasiswa" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
        <TambahKelas setIsOpen={setIsOpen} isOpen={isOpen} onSucces={fetchKelas} />
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
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Nim
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
                    Tidak ada Kelas
                  </td>
                </tr>
              ) : data.filter((item) => (item.nim || '').toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 bg-white text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                data
                  .filter((item) => (item.nim || '').toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, index) => (
                    <tr key={item.id_user} className="bg-white border-b  border-gray-200 transition">
                      <td className=" px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.nama}</td>
                      <td className="px-6 py-4">{item.nim}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500" onClick={() => handleKelas(item)}>
                            Lihat Kelas
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

      <ModalDetail modalLihat={showKelasModal} data={SelectedSiswa} setShowKelasModal={setShowKelasModal} loading={loading} />
    </>
  );
};

export default KelasSiswa;
