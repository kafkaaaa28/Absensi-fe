import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
const ModalEditMatkul = ({ data, onUpdate, showEditModal, loading, setLoading, setShowEditModal }) => {
  const [formData, setFormData] = useState({ ...data });
  const [datas, setData] = useState([]);

  useEffect(() => {
    setFormData({ ...data });
    fetchDosen();
  }, [data]);
  const fetchDosen = async (params) => {
    try {
      const res = await api.get('/users/dosen');
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data.id_matkul, formData);
  };

  return (
    <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">edit Matakuliah</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nama</label>
              <input className="w-full border px-3 py-2 rounded" name="nama_matkul" value={formData.nama_matkul} onChange={handleChange} />
            </div>

            <div>
              <label className="block mb-1 font-medium">semester</label>
              <input className="w-full border px-3 py-2 rounded" name="semester" value={formData.semester} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">sks</label>
              <input className="w-full border px-3 py-2 rounded" name="sks" value={formData.sks} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Kode Matakuliah</label>
              <input className="w-full border px-3 py-2 rounded" name="kode_matkul" value={formData.kode_matkul} onChange={handleChange} />
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

export default ModalEditMatkul;
