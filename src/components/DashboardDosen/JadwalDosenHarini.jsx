import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Swal from 'sweetalert2';
import ModalEdit from './Jadwal/ModalEditStatus';
import ModalQrScan from './Abensi/ModalQrScan';
import ModalFaceScan from './Abensi/ModalFaceScan';
const JadwalDosenharini = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [showedit, setShowedit] = useState(false);
  const [showOpenModal, setshowOpenModal] = useState(false);
  const [OpenScan, setOpenScan] = useState(false);
  const [OpenScanFace, setOpenScanFace] = useState(false);
  const [cekDibuka, setCekDibuka] = useState(false);
  useEffect(() => {
    fetchJadwal();
  }, []);
  const fetchJadwal = async (params) => {
    try {
      const res = await api.get('/dosen/jadwalharini');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
      setError('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = () => {
    Swal.fire({
      title: 'Absensi Berhasil Dibuka',
      icon: 'success',
    });
  };

  const ErrAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Terjadi Error',
    });
  };

  const editAlert = () => {
    Swal.fire({
      title: 'Update Status Berhasil',
      icon: 'success',
    });
  };
  const handleEdit = (item) => {
    setSelectedJadwal(item);
    setShowedit(true);
  };
  const handlebuka = (item) => {
    setSelectedJadwal(item);
    handlebukaAbsen(item);
  };
  const handelbukaScan = (item) => {
    setSelectedJadwal(item);
    setOpenScan(true);
  };
  const handleFacescan = (item) => {
    setSelectedJadwal(item);
    setOpenScanFace(true);
  };
  const handlebukaAbsen = async (item) => {
    try {
      const { id_kelas, id_jadwal } = item;
      await api.post(`/dosen/absensi/${id_kelas}/${id_jadwal}`);
      showAlert();
      setshowOpenModal(false);
    } catch (err) {
      console.log(`gagal ${err.response?.data?.message}`);
      ErrAlert();
    }
  };
  const handleOpen = (item) => {
    setSelectedJadwal(item);
    setshowOpenModal(true);
  };
  const handleUpdate = async (updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/dosen/absen/update-all`, updatedData);
      setShowedit(false);
      editAlert();
      setLoading(false);
    } catch (err) {
      console.error(`gagal memperbarui Data ${err.response.data.message}`);
      setLoading(false);

      ErrAlert();
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Matakuliah
              </th>
              <th scope="col" className="px-6 py-3">
                hari
              </th>
              <th scope="col" className="px-6 py-3">
                Ruang
              </th>
              <th scope="col" className="px-6 py-3">
                Absensi
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
                  Tidak ada jadwal
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id_jadwal} className="bg-white border-b  border-gray-200 transition">
                  <td className=" px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    {item.kode_matkul}-{item.nama_matkul}
                  </td>
                  <td className="px-6 py-4">
                    {item.hari} {item.jam_mulai} s/d {item.jam_selesai}
                  </td>
                  <td className="px-6 py-4">{item.ruang}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500" onClick={() => handlebuka(item)}>
                        Buka Absensi
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={() => handelbukaScan(item)}>
                        Qr Scan
                      </button>
                      <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={() => handleFacescan(item)}>
                        Face Scan
                      </button>
                      <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={() => handleEdit(item)}>
                        Edit Absen
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ModalQrScan modalLihat={OpenScan} OnClose={setOpenScan} data={selectedJadwal} />
      <ModalFaceScan modalLihat={OpenScanFace} OnClose={setOpenScanFace} data={selectedJadwal} />
      <ModalEdit showEditModal={showedit} setShowEditModal={setShowedit} data={selectedJadwal} onUpdate={handleUpdate} />
    </>
  );
};

export default JadwalDosenharini;
