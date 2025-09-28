import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import TambahMatkul from './TambahMatkul';
import ModalEdit from './ModalEditMatkul';
import ModalDelete from './ModalDeleteMatkul';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
const Matkul = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMatkul, setSelectedMatkul] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchMatkul = async (params) => {
    try {
      const res = await api.get('/matkul');
      setData(res.data);
    } catch (err) {
      console.log(err);
      setError('Gagal fetch data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMatkul();
  }, []);

  const handleEdit = (item) => {
    setSelectedMatkul(item);
    setShowEditModal(true);
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
      const res = await api.put(`/matkul/${id}`, updatedData);
      setData(data.map((p) => (p.id_matkul === id ? res.data : p)));
      setShowEditModal(false);
      showAlert();
      setLoading(false);
      await fetchMatkul();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setLoading(false);
      setShowDeleteModal(false);
      ErrAlert();
    }
  };
  const handleDelete = (item) => {
    setSelectedMatkul(item);
    setShowDeleteModal(true);
  };

  const handleDeleteMatkul = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/matkul/${id}`);
      setData(data.filter((datas) => datas.id_matkul !== id));
      await fetchMatkul();
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
        <TambahMatkul setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={fetchMatkul} />
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
                  Nama Matkul
                </th>
                <th scope="col" className="px-6 py-3">
                  semester
                </th>
                <th scope="col" className="px-6 py-3">
                  sks
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
                    Tidak ada Matkul
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
                      <td className="px-6 py-4">{item.nama_matkul}</td>
                      <td className="px-6 py-4">{item.semester}</td>
                      <td className="px-6 py-4">{item.sks}</td>
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
      <ModalEdit showEditModal={showEditModal} setLoading={setLoading} setShowEditModal={setShowEditModal} loading={loading} data={selectedMatkul} onUpdate={handleUpdate} />
      <ModalDelete modaldelete={showDeleteModal} data={selectedMatkul} onDelete={handleDeleteMatkul} setModaldelete={setShowDeleteModal} loading={loading} />
    </>
  );
};

export default Matkul;
