import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import * as faceapi from 'face-api.js';
import api from '../../../utils/api';
import Swal from 'sweetalert2';
import { Spinner } from 'flowbite-react';
const LihatAbsensi = ({ data, modalLihat, OnClose }) => {
  const [formData, setFromData] = useState({ ...data });
  const videoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    setFromData({ ...data });
  }, [data]);
  useEffect(() => {
    if (modalLihat) {
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [modalLihat]);
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };
    loadModels();
  }, []);
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        throw new Error('getUserMedia tidak didukung di browser ini');
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Gagal mengakses kamera. Pastikan izin sudah diberikan dan browser mendukung getUserMedia.');
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Mendeteksi wajah...');
    const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

    if (!detection) {
      setMessage('Wajah tidak terdeteksi! Coba lagi.');
      return;
    }

    const embedding = Array.from(detection.descriptor);

    try {
      const res = await api.put(`dosen/absensi/update-face`, {
        embedding,
        kelasId: data.id_kelas,
        jadwalId: data.id_jadwal,
      });
      setMessage(res.data.message || 'Absensi wajah berhasil!');
      StopCamera();
      OnClose(false);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: res.data.message,
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Gagal melakukan absensi.');
    } finally {
      setLoading(false);
    }
  };
  const StopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  return (
    <>
      <Modal
        show={modalLihat}
        onClose={() => {
          OnClose(false);
          StopCamera();
        }}
        size="3xl"
      >
        <ModalBody className="bg-white">
          <form onSubmit={handleScan} className="flex flex-col items-center p-6 bg-gray-100 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Absen dengan Wajah</h2>

            <video ref={videoRef} autoPlay muted width="400" height="300" className="rounded-lg border-2 border-gray-400" />

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              {loading ? 'loading...' : 'Cek Wajah & Absen'}
            </button>
          </form>
        </ModalBody>

        <ModalFooter className="bg-white">
          <Button
            color="gray"
            onClick={() => {
              OnClose(false);
              StopCamera();
            }}
          >
            Tutup
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LihatAbsensi;
