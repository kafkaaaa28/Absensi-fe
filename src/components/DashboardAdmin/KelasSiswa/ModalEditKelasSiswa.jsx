import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
const ModalEditKelas = ({ data, onUpdate, showEditModal, setShowEditModal, error }) => {
  const [formData, setFormData] = useState({ ...data });
  const [datas, setData] = useState([]);

  useEffect(() => {
    setFormData({ ...data });
    fetchKelas();
  }, [data]);

  const fetchKelas = async (params) => {
    try {
      const res = await api.get('/kelas');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'id_kelas') {
      const selected = datas.find((item) => item.id_kelas.toString() === value);
      if (selected) {
        setFormData({
          ...formData,
          id_kelas: selected.id_kelas,
          nama_kelas: selected.nama_kelas,
          nama_matkul: selected.nama_matkul,
          kode_matkul: selected.kode_matkul,
        });
      } else {
        setFormData({ ...formData, id_kelas: '', nama_kelas: '', nama_matkul: '', kode_matkul: '' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData.id, formData);
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
                    {item.nama_kelas} || {item.nama_matkul} || {item.kode_matkul}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {formData.id_kelas && (
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
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b  border-gray-200 transition">
                    <td className="px-6 py-4">{formData.nama_kelas}</td>
                    <td className="px-6 py-4">{formData.nama_matkul}</td>
                    <td className="px-6 py-4">{formData.kode_matkul}</td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            Simpan
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditKelas;
