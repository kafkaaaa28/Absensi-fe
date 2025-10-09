import React from 'react';
import { useState, useEffect } from 'react';
import { FaBars, FaHome, FaChalkboardTeacher, FaBook, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaUserGraduate } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { MdMeetingRoom } from 'react-icons/md';
import appease from '../img/univ.png';
import { IoMdSchool } from 'react-icons/io';
import api from '../../utils/api';
const Navdashboard = ({ setIsAuthenticated, setUser }) => {
  const [open, setOpen] = useState(false);
  const [IsUser, setIsUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const Toggler = () => {
    setOpen(!open);
  };
  const getMe = async () => {
    try {
      const response = await api.get('/auth/me');
      setIsUser(response.data);
      setLoading(false);
    } catch (err) {
      console.log('gagal ambil data');
      setLoading(false);
    }
  };
  useEffect(() => {
    getMe();
  }, []);
  const Logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <div>
      <div className="flex justify-end">
        <button onClick={Toggler} type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-[26px] text-gray-500 rounded-lg sm:hidden hover:bg-[#162542] focus:outline-none focus:ring-2 focus:ring-gray-200 hover:text-white">
          <FaBars />
        </button>
      </div>
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-[#162542]">
          <div className="flex flex-col justify-center items-center mb-5 gap-2">
            <img class="w-14 h-14 rounded-full" src={appease} alt="Rounded avatar"></img>
            <p className="text-white font-bold uppercase">Universitas Appease</p>
          </div>
          <div className=" flex flex-col justify-center items-center gap-2">
            <div className="bg-white h-14 w-14 flex items-center justify-center rounded-full">
              <FaUserGraduate className="text-[24px]" />
            </div>
            <p className="text-white font-bold ">{IsUser.nama}</p>
            <p className="text-white font-bold mb-3">{IsUser.email}</p>
          </div>
          <ul className="space-y-2 font-medium flex-1  mx-6 ">
            <li>
              <Link to={'/dashboard'} className="flex items-center p-2 text-white rounded-lg  hover:bg-gray-700">
                <FaHome className="text-red-500" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/profilesaya'} className="flex items-center p-2 text-white rounded-lg   hover:bg-gray-700">
                <IoMdSchool className="text-yellow-500" />
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/jadwalsaya'} className="flex items-center p-2 text-white rounded-lg  hover:bg-gray-700">
                <FaCalendarAlt className="text-green-500" />
                <span className="ms-3">Jadwal</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/matkulsaya'} className="flex items-center p-2 text-white rounded-lg  hover:bg-gray-700">
                <FaBookOpen className="text-blue-500" />
                <span className="ms-3">MataKuliah</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboard/absensi'} className="flex items-center p-2 text-white rounded-lg  hover:bg-gray-700">
                <MdOutlineDateRange className="text-purple-500" />
                <span className="ms-3">Absensi</span>
              </Link>
            </li>
          </ul>

          <div className="mt-auto">
            <button onClick={Logout} className="flex items-center p-2 w-full text-white bg-black rounded-lg hover:bg-gray-700">
              <RiLogoutBoxLine className="text-lg" />
              <span className="ms-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navdashboard;
