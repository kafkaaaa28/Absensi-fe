import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, TextInput } from 'flowbite-react';
import api from '../../../utils/api';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

function TambahKelas({ isOpen, setIsOpen, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [formData, setFromData] = useState({
    id_matkul: '',
    nama_kelas: '',
    kapasitas: '',
    id_dosen: '',
  });
  const { id_matkul, nama_kelas, kapasitas, id_dosen } = formData;
  const handleClose = () => setIsOpen(false);
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
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
  const fetchMatkul = async () => {
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

  useEffect(() => {
    fetchDosen();
    fetchMatkul();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/kelas', formData);
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
      <button onClick={() => setIsOpen(true)} type="button" class="flex gap-2 items-center justify-center text-white bg-[#162542] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 md:w-[240px]  ">
        Tambah Kelas <FaPlus className="" />
      </button>
      <Modal show={isOpen} onClose={handleClose} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Kelas</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nama_kelas" value="Nama Kelas" />
              <TextInput id="nama_kelas" name="nama_kelas" placeholder="Masukkan nama Kelas" value={nama_kelas} onChange={handleChange} />
            </div>
            <div>
              <select name="id_matkul" value={id_matkul || ''} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option className="text-gray-500" value="">
                  Pilih Matkul
                </option>
                {data.map((item) => (
                  <option key={item.id_matkul} value={item.id_matkul}>
                    {item.nama_matkul}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select name="id_dosen" value={id_dosen || ''} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
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
              <Label htmlFor="kapasitas" value="Kapasitas" />
              <TextInput id="email" name="kapasitas" placeholder="Masukkan Kapasitas" value={kapasitas} onChange={handleChange} />
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

export default TambahKelas;
