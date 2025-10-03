import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';

const ModalEditStatus = ({ data, onUpdate, showEditModal, setShowEditModal }) => {
  const [formData, setFormData] = useState({ ...data });
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFormData({ ...data });
    fetchSiswa();
  }, [data]);

  const fetchSiswa = async () => {
    try {
      const res = await api.get(`/dosen/absensi/siswa/${data.id_jadwal}`);
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

    onUpdate(data.id_absen, formData);
  };

  return (
    <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Edit Absensi</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            {datas.map((item) => (
              <p key={item.id_absen}>
                {item.nama} - {item.status}
              </p>
            ))}
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditStatus;
