import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, TextInput } from 'flowbite-react';
import api from '../../../utils/api';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

function TambahDosen({ isOpen, setIsOpen, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFromData] = useState({
    nama: '',
    email: '',
    password: '',
    fakultas: '',
    prodi: '',
    role: 'dosen',
  });
  const { nama, email, password, prodi, fakultas } = formData;
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const res = await api.post('/users/createusers', formData);
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
        Tambah Dosen <FaPlus className="" />
      </button>
      <Modal show={isOpen} onClose={handleClose} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Dosen</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nama" value="Nama" />
              <TextInput id="nama" name="nama" placeholder="Masukkan nama Dosen" value={nama} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput type="email" id="email" name="email" placeholder="Masukkan email" value={email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password" value="password" />
              <TextInput id="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="fakultas" value="fakultas" />
              <TextInput id="fakultas" placeholder="fakultas" name="fakultas" value={fakultas} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="prodi" value="prodi" />
              <TextInput id="prodi" name="prodi" placeholder="Masukkan prodi" value={prodi} onChange={handleChange} />
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

export default TambahDosen;
