import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
const ModalLihatSiswa = ({ modallihatsiswa, kelas, setModalLihat }) => {
  const [selectedKelas, setselectedKelas] = useState({ ...kelas });
  const [dataSiswa, setDataSiswa] = useState([]);

  useEffect(() => {
    if (kelas) {
      setselectedKelas({ ...kelas });
      handleLihatSiswa();
    }
  }, [kelas]);
  const handleLihatSiswa = async () => {
    if (!kelas || !kelas.id_kelas) {
      return;
    }
    try {
      const res = await api.get(`/kelas/${kelas.id_kelas}`);
      setDataSiswa(res.data);
    } catch (err) {
      console.error(`gagal lihat kelas ${err.response?.kelas?.message}`);
    }
  };
  return (
    <Modal show={modallihatsiswa} onClose={() => setModalLihat(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Data Mahasiswa</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Nim
                </th>
                <th scope="col" className="px-6 py-3">
                  Fakultas
                </th>
                <th scope="col" className="px-6 py-3">
                  Prodi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSiswa.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                    Tidak ada Siswa
                  </td>
                </tr>
              ) : (
                dataSiswa.map((item) => (
                  <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                    <td className="px-6 py-4">{item.nama}</td>
                    <td className="px-6 py-4">{item.nim}</td>
                    <td className="px-6 py-4">{item.fakultas}</td>
                    <td className="px-6 py-4">{item.prodi}</td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalLihatSiswa;
