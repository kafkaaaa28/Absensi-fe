import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
const ModalEditKelas = ({ data, onUpdate, showEditModal, loading, setLoading, setShowEditModal }) => {
  const [formData, setFormData] = useState({ ...data });
  const [datas, setData] = useState([]);
  const [dosen, setDosen] = useState([]);

  useEffect(() => {
    setFormData({ ...data });
    fetchMatkul();
    fetchDosen();
  }, [data]);
  const fetchMatkul = async (params) => {
    try {
      const res = await api.get('/matkul');
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchDosen = async () => {
    try {
      const res = await api.get('/users/dosen');
      setDosen(res.data);
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
    onUpdate(data.id_kelas, formData);
  };

  return (
    <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">edit Kelas</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Nama Kelas</label>
              <input className="w-full border px-3 py-2 rounded" name="nama_kelas" value={formData.nama_kelas} onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nama MataKuliah</label>

              <select
                name="id_matkul"
                value={formData.id_matkul || ''}
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option className="text-gray-500" value="">
                  Pilih Matakuliah
                </option>
                {datas.map((item) => (
                  <option key={item.id_matkul} value={item.id_matkul}>
                    {item.nama_matkul}
                  </option>
                ))}
              </select>
            </div>{' '}
            <div>
              <label className="block mb-1 font-medium">Nama Dosen</label>

              <select
                name="id_dosen"
                value={formData.id_dosen || ''}
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option className="text-gray-500" value="">
                  Pilih Dosen
                </option>
                {dosen.map((item) => (
                  <option key={item.id_dosen} value={item.id_dosen}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Kapasitas</label>
              <input className="w-full border px-3 py-2 rounded" name="kapasitas" value={formData.kapasitas} onChange={handleChange} />
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

export default ModalEditKelas;
