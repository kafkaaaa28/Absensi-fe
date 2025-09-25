import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import TambahKelas from './TambahKelas';
import ModalEdit from './ModalEditKelas';
import ModalDelete from './DeleteKelas';
import Swal from 'sweetalert2';
import { FaRegEdit, FaRegTrashAlt, FaEye } from 'react-icons/fa';
import ModalLihatSiswa from './ModalLihatSiswa';
import { FaE } from 'react-icons/fa6';

const Kelas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSiswaModal, setShowSiswaModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fetchKelas = async (params) => {
    try {
      const res = await api.get('/kelas');
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
      setError('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchKelas();
  }, []);

  const handleEdit = (item) => {
    setSelectedKelas(item);
    setShowEditModal(true);
  };
  const handleSiswa = (item) => {
    setSelectedKelas(item);
    setShowSiswaModal(true);
  };
  const showAlert = () => {
    Swal.fire({
      title: 'Berhasil!',
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
  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/kelas/${id}`, updatedData);
      setData(data.map((p) => (p.id_kelas === id ? res.data : p)));
      setShowEditModal(false);
      showAlert();
      setLoading(false);
      await fetchKelas();
    } catch (err) {
      console.error(`Gagal memperbarui data ${err.response?.data?.message}`);
      setLoading(false);
      setShowDeleteModal(false);
      ErrAlert();
    }
  };

  const handleDelete = (item) => {
    setSelectedKelas(item);
    setShowDeleteModal(true);
  };

  const handleDeletekelas = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/kelas/${id}`);
      setData(data.filter((datas) => datas.id_matkul !== id));
      await fetchKelas();
      setLoading(false);
      setShowDeleteModal(false);
      showAlert();
    } catch (err) {
      console.log(err.response?.data?.message || 'Failed to delete kelas');
      setLoading(false);
      setShowDeleteModal(false);
      ErrAlert();
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-3 justify-center items-center">
        <input type="text" placeholder="Cari Nama Mata Kuliah" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
        <TambahKelas setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={fetchKelas} />
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
                  Nama Kelas
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Matakuliah
                </th>

                <th scope="col" className="px-6 py-3">
                  Kapasitas
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode Matakuliah
                </th>
                <th scope="col" className="px-6 py-3">
                  Dosen
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
              ) : data.filter((item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 bg-white text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                data
                  .filter((item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, index) => (
                    <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                      <td className=" px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.nama_kelas}</td>
                      <td className="px-6 py-4">{item.nama_matkul}</td>
                      <td className="px-6 py-4">{item.kapasitas}</td>
                      <td className="px-6 py-4">{item.kode_matkul}</td>
                      <td className="px-6 py-4">{item.nama}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-600" onClick={() => handleEdit(item)}>
                            <FaRegEdit /> Edit
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-2" onClick={() => handleDelete(item)}>
                            <FaRegTrashAlt /> Delete
                          </button>
                          <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 flex items-center gap-2" onClick={() => handleSiswa(item)}>
                            <FaEye />
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
      <ModalEdit showEditModal={showEditModal} setLoading={setLoading} setShowEditModal={setShowEditModal} loading={loading} data={selectedKelas} onUpdate={handleUpdate} />
      <ModalDelete modaldelete={showDeleteModal} data={selectedKelas} onDelete={handleDeletekelas} setModaldelete={setShowDeleteModal} loading={loading} />
      <ModalLihatSiswa modallihatsiswa={showSiswaModal} kelas={selectedKelas} setModalLihat={setShowSiswaModal} />
    </>
  );
};

export default Kelas;
