import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
const ModalAbsensiSiswa = ({ data, modalLihat, OnClose }) => {
  const [formData, setFormData] = useState({ ...data });
  const [dataAbsen, setDataAbsen] = useState([]);
  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  useEffect(() => {
    if (formData.id_kelas) {
      fetchAbsensi();
    }
  }, [formData.id_kelas]);

  const fetchAbsensi = async () => {
    try {
      const res = await api.get(`/siswa/absensi/${formData.id_kelas}`);
      setDataAbsen(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(`Gagal Ambil Absen ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <>
      <Modal
        show={modalLihat}
        onClose={() => {
          OnClose(false);
        }}
        size="xl"
      >
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-center text-teal-500 w-full">Absensi Saya</h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Metode
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataAbsen.map((item, index) => (
                  <tr key={index}>
                    <td className=" px-4 py-2">
                      {item.tanggal
                        ? new Date(item.tanggal).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Tidak tersedia'}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          item.status === 'hadir' ? 'bg-green-500' : item.status === 'sakit' ? 'bg-yellow-500' : item.status === 'izin' ? 'bg-blue-500' : item.status === 'alpha' ? 'bg-red-500' : 'bg-gray-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className=" px-4 py-2">{item.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter className="bg-white">
          <Button
            color="gray"
            onClick={() => {
              OnClose(false);
            }}
          >
            Tutup
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalAbsensiSiswa;
