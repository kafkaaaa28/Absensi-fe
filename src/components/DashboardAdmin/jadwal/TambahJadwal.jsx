import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, TextInput } from 'flowbite-react';
import api from '../../../utils/api';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

function TambahJadwal({ isOpen, setIsOpen, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id_kelas: '',
    hari: '',
    jam_mulai: '',
    ruang: '',
  });
  const { id_kelas, hari, jam_mulai, ruang } = formData;

  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'id_kelas') {
      const selected = data.find((item) => item.id_kelas.toString() === e.target.value);
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

  const showAlert = () => {
    Swal.fire({
      title: 'Berhasil menambah jadwal!',
      icon: 'success',
    });
  };

  const ErrAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Terjadi Error saat menambah jadwal',
    });
  };
  const fetchKelas = async (params) => {
    try {
      const res = await api.get('/kelas');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchKelas();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/jadwal', formData);
      setIsOpen(false);
      showAlert();
      onSuccess();
    } catch (err) {
      setIsOpen(false);
      ErrAlert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex gap-2 items-center justify-center text-white bg-[#162542] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 md:w-[240px]"
      >
        Tambah Jadwal <FaPlus />
      </button>
      <Modal show={isOpen} onClose={handleClose} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Jadwal</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <select name="id_kelas" value={id_kelas || ''} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option className="text-gray-500" value="">
                  Pilih Kelas
                </option>
                {data.map((item) => (
                  <option key={item.id_kelas} value={item.id_kelas}>
                    {`Kelas ${item.nama_kelas} || ${item.nama_matkul} || ${item.kode_matkul}`}
                  </option>
                ))}
              </select>
            </div>
            <p style={{ display: 'none' }}>{formData.sks}</p>
            <div>
              <TextInput id="jam_mulai" name="jam_mulai" type="text" value={`${formData.sks} sks`} disabled />
            </div>
            <div>
              <Label htmlFor="hari" value="hari" />
              <select id="hari" name="hari" value={hari} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
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
            <div>
              <label className="text-gray-500 text-sm">Jam Mulai</label>

              <Label htmlFor="jam_mulai" value="Jam Mulai" />
              <TextInput id="jam_mulai" name="jam_mulai" type="time" placeholder="Contoh: 08:00" value={jam_mulai} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="ruang" value="Ruang" />
              <TextInput id="ruang" name="ruang" placeholder="Contoh: A101" value={ruang} onChange={handleChange} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={handleClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>{loading ? 'Memuat...' : 'Tambah'}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default TambahJadwal;
