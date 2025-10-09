import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';
import { Spinner } from 'flowbite-react';
import { MdOutlineRefresh } from 'react-icons/md';
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
      const res = await api.get(`/dosen/absensi/siswa/${data.id_jadwal}/${data.id_kelas}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const refreshStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchSiswa();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...datas];
    updatedData[index] = { ...updatedData[index], status: newStatus };
    setData(updatedData);
  };
  const statusOptions = ['alpha', 'hadir', 'izin', 'sakit'];
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(datas);
  };

  return (
    <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="xl">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Edit Absensi</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <button onClick={refreshStatus} className="w-full flex items-center mb-2 justify-center text-sm gap-3 md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300" type="button">
          {loading ? (
            <Spinner color="info" aria-label="Info spinner example" size="sm" />
          ) : (
            <>
              <MdOutlineRefresh className="text-lg" />
              <p>Refresh Status</p>
            </>
          )}
        </button>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nim
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                        Tidak ada Mahasiswa
                      </td>
                    </tr>
                  ) : (
                    datas.map((item, index) => (
                      <tr key={`${item.id_jadwal}-${item.id_siswa}`} className="bg-white border-b  border-gray-200 transition">
                        <td className=" px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.nama}</td>
                        <td className="px-6 py-4">{item.nim}</td>
                        <td className="px-6 py-4">
                          <select className="border border-gray-300 rounded p-2" name="status" value={item.status} onChange={(e) => handleStatusChange(index, e.target.value)}>
                            {statusOptions.map((statusOption) => (
                              <option name="status" key={statusOption} value={statusOption}>
                                {statusOption}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p></p>
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditStatus;
