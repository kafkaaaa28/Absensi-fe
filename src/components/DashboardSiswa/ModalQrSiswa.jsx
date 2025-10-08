import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../utils/api';
const ModalQrSiswa = () => {
  const [qrpath, setQrpath] = useState(null);
  const [Modalqr, setModalQr] = useState(false);
  useEffect(() => {
    fetchqr();
  }, []);
  const isDevelopment = window.location.hostname === 'localhost';

  const baseURL = isDevelopment ? 'http://localhost:5000' : 'http://192.168.100.230:5000';
  const fetchqr = async () => {
    try {
      const res = await api.get('/siswa/qrsiswa');
      setQrpath(`${baseURL}${res.data.qr}`);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full bg-gray-200 rounded-lg gap-2 shadow-lg p-3 md:w-[35%] items-center justify-center">
        <img src={qrpath} alt="QR Mahasiswa" style={{ width: 200, height: 200 }} />

        <button onClick={() => setModalQr(true)} className=" bg-blue-600 px-2 text-white py-2 rounded hover:bg-blue-700">
          Lihat Qr Code
        </button>
      </div>
      <Modal show={Modalqr} onClose={() => setModalQr(false)} size="xl">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Qr Code</h2>
        </ModalHeader>
        <ModalBody className="bg-white flex items-center justify-center">
          <img src={qrpath} alt="QR Mahasiswa" style={{ width: 300, height: 300 }} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalQrSiswa;
