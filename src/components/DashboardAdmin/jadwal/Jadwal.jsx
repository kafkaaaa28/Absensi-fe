import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import TambahJadwal from './TambahJadwal';
import ModalEdit from './ModalEditJadwal';
import ModalDelete from './ModalDeleteJadwal';
import Swal from 'sweetalert2';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const DataJadwal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const fetchJadwal = async (params) => {
    try {
      const res = await api.get('/jadwal');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
      setError('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJadwal();
  }, []);

  const handleEdit = (item) => {
    setSelectedJadwal(item);
    setShowEditModal(true);
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/jadwal/${id}`, updatedData);
      setData(data.map((p) => (p.id_jadwal === id ? res.data : p)));
      setShowEditModal(false);
      showAlert();
      fetchJadwal();
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setLoading(false);
      setShowEditModal(false);
      ErrAlert();
    }
  };
  const handleDelete = (item) => {
    setSelectedJadwal(item);
    setShowDeleteModal(true);
  };

  const handleDeleteJadwal = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/jadwal/${id}`);
      setData(data.filter((datas) => datas.id_jadwal !== id));
      await fetchJadwal();
      setLoading(false);
      setShowDeleteModal(false);
      showAlert();
    } catch (err) {
      console.log(err.response?.data?.message || 'Failed to delete user');
      setLoading(false);
      setShowDeleteModal(false);
      ErrAlert();
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-3 justify-center items-center">
        <input type="text" placeholder="Cari Nama Mata Kuliah" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
        <TambahJadwal setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={fetchJadwal} erralert={ErrAlert} showAlert={showAlert} />
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
                  Kelas
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Matakuliah
                </th>
                <th scope="col" className="px-6 py-3">
                  hari
                </th>
                <th scope="col" className="px-6 py-3">
                  Jam Mulai
                </th>
                <th scope="col" className="px-6 py-3">
                  Jam Selesai
                </th>
                <th scope="col" className="px-6 py-3">
                  Ruang
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode Matakuliah
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
                    <tr key={item.id_jadwal} className="bg-white border-b  border-gray-200 transition">
                      <td className=" px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.nama_kelas}</td>
                      <td className="px-6 py-4">{item.nama_matkul}</td>
                      <td className="px-6 py-4">{item.hari}</td>
                      <td className="px-6 py-4">{item.jam_mulai}</td>
                      <td className="px-6 py-4">{item.jam_selesai}</td>
                      <td className="px-6 py-4">{item.ruang}</td>
                      <td className="px-6 py-4">{item.kode_matkul}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-600" onClick={() => handleEdit(item)}>
                            <FaRegEdit /> Edit
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-2" onClick={() => handleDelete(item)}>
                            <FaRegTrashAlt /> Delete
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
      <ModalEdit showEditModal={showEditModal} setShowEditModal={setShowEditModal} loading={loading} data={selectedJadwal} onUpdate={handleUpdate} />
      <ModalDelete modaldelete={showDeleteModal} data={selectedJadwal} onDelete={handleDeleteJadwal} setModaldelete={setShowDeleteModal} loading={loading} />
    </>
  );
};

export default DataJadwal;
