import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { Html5Qrcode } from 'html5-qrcode';
import Swal from 'sweetalert2';
import api from '../../../utils/api';
const ModalQrScan = ({ data, modalLihat, OnClose }) => {
  const [formData, setFormData] = useState({ ...data });
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const html5QrCodeRef = useRef(null);
  const qrCodeRegionId = 'qr-code-region';
  const [isScanning, setIsScanning] = useState(false);
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  useEffect(() => {
    if (modalLihat) {
      setTimeout(() => {
        startScanner();
      }, 100);
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [modalLihat]);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const handleQrSuccess = async (decodedText) => {
    setScanResult(decodedText);
    stopScanner();
    try {
      const res = await api.put(`/dosen/absensi/update-qr`, { qrCode: decodedText, kelasId: data.id_kelas, jadwalId: data.id_jadwal });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: res.data.message,
      });
      stopScanner();
      OnClose(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || 'Terjadi kesalahan saat update absensi!',
      });
    }
  };
  const startScanner = () => {
    if (isScanning) return;
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    html5QrCodeRef.current = html5QrCode;

    Html5Qrcode.getCameras().then((cameras) => {
      if (cameras && cameras.length) {
        html5QrCode
          .start(cameras[0].id, { fps: 10, qrbox: 250 }, handleQrSuccess, () => {})
          .then(() => setIsScanning(true))
          .catch((err) => setError('Gagal mengakses kamera: ' + err.message));
      } else {
        setError('Tidak menemukan kamera.');
      }
    });
  };
  const stopScanner = () => {
    if (html5QrCodeRef.current && isScanning) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          return html5QrCodeRef.current.clear();
        })
        .then(() => {
          setIsScanning(false);
          html5QrCodeRef.current = null;
        })
        .catch((err) => {
          console.error('Gagal menghentikan scanner:', err);
          setIsScanning(false);
          html5QrCodeRef.current = null;
        });
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
          <h2 className="text-xl font-bold text-center text-teal-500 w-full">Scan QR</h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div id={qrCodeRegionId} style={{ width: '100%', height: '300px' }}>
            {error && <p className="text-red-500">{error}</p>}
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

export default ModalQrScan;
