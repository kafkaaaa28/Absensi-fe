import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import TambahMahasiswaModal from './TambahSiswa';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelet';
import Swal from 'sweetalert2';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
const MahasiswaTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedsiswa, setSelectedsiswa] = useState(null);
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
  const fetchMahasiswa = async (params) => {
    try {
      const res = await api.get('/users/siswa');
      setData(res.data);
    } catch (err) {
      console.log(err);
      setError('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const handleEdit = (item) => {
    setSelectedsiswa(item);
    setShowEditModal(true);
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/users/${id}`, updatedData);
      setData(data.map((p) => (p.id_user === id ? res.data : p)));
      setShowEditModal(false);
      showAlert();
      setLoading(false);
      await fetchMahasiswa();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setLoading(false);
      setShowEditModal(false);
    }
  };
  const handleDelete = (item) => {
    setSelectedsiswa(item);
    setShowDeleteModal(true);
  };

  const handleDeletesiswa = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      setData(data.filter((datas) => datas.id_user !== id));
      await fetchMahasiswa();
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
        <input type="text" placeholder="Cari Nim Mahasiswa" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
        <TambahMahasiswaModal setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={fetchMahasiswa} />
      </div>
      <div className="relative overflow-x-auto p-4 rounded-lg">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  NIM
                </th>
                <th scope="col" className="px-6 py-3">
                  Fakultas
                </th>
                <th scope="col" className="px-6 py-3">
                  Prodi
                </th>
                <th scope="col" className="px-6 py-3">
                  Semester
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
                    Tidak ada Mahasiswa
                  </td>
                </tr>
              ) : data.filter((item) => (item.nim ?? '').includes(searchTerm)).length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 bg-white text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                data
                  .filter((item) => (item.nim ?? '').includes(searchTerm))
                  .map((item, index) => (
                    <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                      <td className=" px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.nama}</td>
                      <td className="px-6 py-4">{item.nim}</td>
                      <td className="px-6 py-4">{item.fakultas}</td>
                      <td className="px-6 py-4">{item.prodi}</td>
                      <td className="px-6 py-4">{item.semester}</td>
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
      <ModalEdit showEditModal={showEditModal} setShowEditModal={setShowEditModal} loading={loading} data={selectedsiswa} onUpdate={handleUpdate} />
      <ModalDelete modaldelete={showDeleteModal} data={selectedsiswa} onDelete={handleDeletesiswa} setModaldelete={setShowDeleteModal} loading={loading} />
    </>
  );
};

export default MahasiswaTable;
