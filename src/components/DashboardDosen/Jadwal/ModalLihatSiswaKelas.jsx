import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';

const ModalDetail = ({ data, modalLihat, OnClose }) => {
  const [formData, setFromData] = useState({ ...data });
  const [dataSiswa, setSiswaData] = useState([]);

  useEffect(() => {
    setFromData({ ...data });
  }, [data]);

  useEffect(() => {
    if (formData.id_kelas) {
      fetchSiswa();
    }
  }, [formData.id_kelas]);

  const fetchSiswa = async () => {
    try {
      const response = await api.get(`/dosen/siswakelas/${formData.id_kelas}`);
      setSiswaData(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      console.error('Gagal mengambil data Siswa:', err);
    }
  };

  return (
    <>
      <Modal show={modalLihat} onClose={() => OnClose(false)} size="xl">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-center text-teal-500 w-full">Detail Kelas</h2>
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
                    Semester
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
                  dataSiswa.map((item, index) => (
                    <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                      <td className="px-6 py-4">{item.nama}</td>
                      <td className="px-6 py-4">{item.nim}</td>
                      <td className="px-6 py-4">{item.semester}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </ModalBody>

        <ModalFooter className="bg-white">
          <Button color="gray" onClick={() => OnClose(false)}>
            Tutup
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalDetail;
