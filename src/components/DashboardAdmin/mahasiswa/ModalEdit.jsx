import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
const Modalpasien = ({ data, onUpdate, showEditModal, loading, setShowEditModal }) => {
  const [formData, setFormData] = useState({ ...data });
  const [datas, setData] = useState([]);

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data.id_user, formData);
  };
  const fetchKelas = async (params) => {
    try {
      const res = await api.get('/kelas');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };
  useEffect(() => {
    fetchKelas();
  }, []);
  return (
    <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">edit mahasiswa</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nama</label>
              <input className="w-full border px-3 py-2 rounded" name="nama" value={formData.nama} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input className="w-full border px-3 py-2 rounded" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">NIM</label>
              <input className="w-full border px-3 py-2 rounded" name="nim" value={formData.nim} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fakultas</label>
              <input className="w-full border px-3 py-2 rounded" name="fakultas" value={formData.fakultas} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Prodi</label>
              <input className="w-full border px-3 py-2 rounded" name="prodi" value={formData.prodi} onChange={handleChange} />
            </div>

            <div>
              <label className="block mb-1 font-medium">Semester</label>
              <input className="w-full border px-3 py-2 rounded" name="semester" value={formData.semester} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default Modalpasien;
