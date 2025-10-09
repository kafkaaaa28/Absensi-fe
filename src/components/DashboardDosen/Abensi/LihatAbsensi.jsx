import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
import Swal from 'sweetalert2';
import { Spinner } from 'flowbite-react';
const LihatAbsensi = ({ data, modalLihat, OnClose }) => {
  const [formData, setFromData] = useState({ ...data });
  const [dataSiswa, setSiswaData] = useState([]);
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postTanggal, setPostTanggal] = useState({ tanggal: '' });
  const [Absensi, setAbsensi] = useState([]);
  useEffect(() => {
    setFromData({ ...data });
  }, [data]);

  useEffect(() => {
    if (formData.id_kelas) {
      fetchTanggal();
    }
  }, [formData.id_kelas]);
  useEffect(() => {
    if (formData.id_kelas && !Absensi) {
      fetchAllAbsen();
    }
  }, [formData.id_kelas, Absensi]);
  const handleChange = (e) => {
    setPostTanggal({ ...postTanggal, [e.target.name]: e.target.value });
  };
  const fetchTanggal = async () => {
    try {
      const res = await api.get(`/dosen/absensi/tanggal/${formData.id_kelas}`);
      setDate(res.data);
    } catch (err) {
      console.log(`error ambil tanggal ${err.response.data.message}`);
    }
  };

  const fetchAllAbsen = async () => {
    if (!postTanggal.tanggal) {
      Swal.fire({
        text: 'Silahkan Pilih Tanggal',
        icon: 'question',
      });
      return;
    }

    setLoading(true);
    try {
      const dates = new Date(postTanggal.tanggal);
      const formattedDate = dates.toISOString().split('T')[0];

      const res = await api.get(`/dosen/absensi/Allsiswa/${formData.id_kelas}/${formattedDate}`);
      setAbsensi(res.data);
    } catch (err) {
      console.log(`error ambil Absen ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAllAbsen();
  };
  return (
    <>
      <Modal
        show={modalLihat}
        onClose={() => {
          OnClose(false);
          setAbsensi([]);
          setPostTanggal({
            tanggal: '',
          });
        }}
        size="3xl"
      >
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-center text-teal-500 w-full">Detail Kelas</h2>
        </ModalHeader>

        <ModalBody className="bg-white">
          <form onSubmit={handleSubmit}>
            <div className="max-w-2xl mx-auto p-4">
              <p className="text-lg font-semibold mb-4">Cari Absen Berdasarkan Tanggal</p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1">
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} name="tanggal" value={postTanggal.tanggal}>
                    <option value="">Pilih tanggal</option>
                    {date.map((waktu, index) => (
                      <option key={index} value={waktu.tanggal}>
                        {waktu.tanggal
                          ? new Date(waktu.tanggal).toLocaleString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Tidak tersedia'}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300" type="submit">
                  {loading ? <Spinner color="info" aria-label="Info spinner example" size="md" /> : 'Cari'}
                </button>
              </div>
            </div>
          </form>
          {Absensi.length > 0 ? (
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Absensi.map((item, index) => (
                    <tr key={index}>
                      <td className=" px-4 py-2">{item.nama}</td>
                      <td className=" px-4 py-2">{item.nim}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-white ${
                            item.status === 'hadir' ? 'bg-green-500' : item.status === 'sakit' ? 'bg-yellow-500' : item.status === 'izin' ? 'bg-blue-500' : item.status === 'alpha' ? 'bg-red-500' : 'bg-gray-500'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>{' '}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-500">Data absensi belum tersedia.</p>
          )}{' '}
        </ModalBody>

        <ModalFooter className="bg-white">
          <Button
            color="gray"
            onClick={() => {
              OnClose(false);
              setAbsensi([]);
              setPostTanggal({
                tanggal: '',
              });
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
