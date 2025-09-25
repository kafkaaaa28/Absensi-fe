import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaUserCircle, FaEnvelope, FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';

const ProfileDosen = () => {
  const [dosen, setDosen] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProfile = async () => {
    try {
      const res = await api.get('/dosen/profiledosen');
      if (res.data && res.data.length > 0) {
        setDosen(res.data[0]);
      } else {
        setDosen(null);
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (!dosen) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 my-10">
      <div className="flex flex-col items-center">
        <IoMdSchool className="text-[#162542] text-[80px]" />
        <h2 className="text-xl font-semibold mt-4">{dosen.nama}</h2>
        <p className="text-gray-500">{dosen.role}</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-[#162542]" />
          <p className="text-gray-700">{dosen.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <FaUniversity className="text-[#162542]" />
          <p className="text-gray-700">{dosen.fakultas}</p>
        </div>
        <div className="flex items-center gap-4">
          <FaGraduationCap className="text-[#162542]" />
          <p className="text-gray-700">{dosen.prodi}</p>
        </div>
        <div className="flex items-center gap-4">
          <FaCalendarAlt className="text-[#162542]" />
          <p className="text-gray-700">
            Anda Terdaftar Pada{' '}
            {dosen.created_at
              ? new Date(dosen.created_at).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })
              : 'Tidak tersedia'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDosen;
