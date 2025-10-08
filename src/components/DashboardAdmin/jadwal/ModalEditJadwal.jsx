import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import api from '../../../utils/api';
const ModalEditJadwal = ({ data, onUpdate, showEditModal, loading, setShowEditModal }) => {
  const [formData, setFormData] = useState({ ...data });
  const [datas, setData] = useState([]);

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'id_kelas') {
      const selected = datas.find((item) => item.id_kelas.toString() === value);
      if (selected) {
        setFormData({
          ...formData,
          id_kelas: selected.id_kelas,
          sks: selected.sks,
        });
      } else {
        setFormData({
          ...formData,
          id_kelas: '',
        });
      }
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data.id_jadwal, formData);
  };

  return (
    <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">edit Jadwal</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            <div>
              <select
                name="id_kelas"
                value={formData.id_kelas || ''}
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option className="text-gray-500" value="">
                  Pilih Kelas
                </option>
                {datas.map((item) => (
                  <option key={item.id_kelas} value={item.id_kelas}>
                    {`Kelas ${item.nama_kelas} || ${item.nama_matkul} || ${item.kode_matkul}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <TextInput id="jam_mulai" name="jam_mulai" type="text" value={undefined ? `Pilih Kelas Dahulu` : `${formData.sks} sks`} disabled />
            </div>
            <div>
              <select
                id="hari"
                name="hari"
                value={formData.hari}
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" className="text-gray-500">
                  Pilih hari
                </option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
                <option value="Minggu">Minggu</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <input
                  className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  id="jam_mulai"
                  name="jam_mulai"
                  type="time"
                  placeholder="Contoh: 08:00"
                  value={formData.jam_mulai}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  id="ruang"
                  name="ruang"
                  placeholder="Contoh: A101"
                  value={formData.ruang}
                  onChange={handleChange}
                />
              </div>
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

export default ModalEditJadwal;
