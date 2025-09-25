import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
import Swal from 'sweetalert2';
import ModalEdit from './ModalEditKelasSiswa';
import ModalDelete from './ModalDeleteKelasSiswa';

const ModalDetail = ({ data, modalLihat, setShowKelasModal }) => {
  const [formData, setFromData] = useState({ ...data });
  const [dataKelas, setKelasData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showmodalDelete, setShowdeletemodal] = useState(false);

  const [error, setError] = useState('');
  useEffect(() => {
    setFromData({ ...data });
  }, [data]);

  useEffect(() => {
    if (formData.id_siswa) {
      fetchKelas();
    }
  }, [formData]);
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
  const fetchKelas = async () => {
    try {
      const response = await api.get(`/kelas/kelassiswa/${formData.id_siswa}`);
      setKelasData(response.data);
    } catch (error) {
      console.error('Gagal mengambil data kelas:', error);
    }
  };
  const handleEdit = (item) => {
    setSelectedKelas(item);
    setShowEditModal(true);
  };
  const handleDelete = (item) => {
    setSelectedKelas(item);
    setShowdeletemodal(true);
  };
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`/kelas/siswa/${id}`, updatedData);
      setKelasData(dataKelas.map((p) => (p.id_kelas === id ? res.data : p)));
      setShowEditModal(false);
      showAlert();
      setError('');
      await fetchKelas();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      ErrAlert();
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      }
    }
  };
  const handleDeleteKelas = async (id) => {
    try {
      await api.delete(`/kelas/siswa/${id}`);
      setKelasData(dataKelas.filter((datas) => datas.id_user !== id));
      await fetchKelas();
      setShowdeletemodal(false);
      showAlert();
    } catch (err) {
      console.log(err.response?.data?.message || 'Failed to delete user');
      setShowdeletemodal(false);
      ErrAlert();
    }
  };
  return (
    <>
      <Modal show={modalLihat} onClose={() => setShowKelasModal(false)} size="xl">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-center text-teal-500 w-full">Detail Kelas</h2>
        </ModalHeader>

        <ModalBody className="bg-white">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Matakuliah
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataKelas.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                      Tidak ada Kelas
                    </td>
                  </tr>
                ) : (
                  dataKelas.map((item, index) => (
                    <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                      <td className="px-6 py-4">{item.nama_kelas}</td>
                      <td className="px-6 py-4">{item.nama_matkul}</td>
                      <td className="px-6 py-4">{item.kode_matkul}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEdit(item)}>
                            Edit
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(item)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </ModalBody>

        <ModalFooter className="bg-white">
          <Button color="gray" onClick={() => setShowKelasModal(false)}>
            Tutup
          </Button>
        </ModalFooter>
      </Modal>
      <ModalDelete modaldelete={showmodalDelete} data={selectedKelas} setshowdeleteModal={setShowdeletemodal} onDelete={handleDeleteKelas} />
      <ModalEdit showEditModal={showEditModal} error={error} setShowEditModal={setShowEditModal} data={selectedKelas} onUpdate={handleUpdate} />
    </>
  );
};

export default ModalDetail;
