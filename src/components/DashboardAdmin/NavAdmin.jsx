import React from 'react';
import { useState } from 'react';
import { FaBars, FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { MdMeetingRoom } from 'react-icons/md';
import appease from '../img/univ.png';

const Navdashboard = ({ setIsAuthenticated, setUser }) => {
  const [open, setOpen] = useState(false);
  const Toggler = () => {
    setOpen(!open);
  };
  const Logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={Toggler}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-[26px] text-gray-500 rounded-lg sm:hidden hover:bg-[#00B686] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <FaBars />
        </button>
      </div>
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-[#162542]">
          <div className="flex  justify-center items-center mb-5 gap-2">
            <img class="w-10 h-10 rounded-full" src={appease} alt="Rounded avatar"></img>
            <p className="text-white font-bold uppercase">Universitas Appease</p>
          </div>
          <ul className="space-y-2 font-medium flex-1">
            <li>
              <Link to={'/dashboardAdmin'} className="flex items-center p-2 text-white rounded-lg bg-black  hover:bg-gray-700">
                <FaHome className="text-red-500" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboardAdmin/mahasiswa" className="flex items-center p-2 text-white rounded-lg bg-black hover:bg-gray-700">
                <FaUserGraduate className="text-blue-500" />
                <span className="ml-3">Data Mahasiswa</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/dosen'} className="flex items-center p-2 text-white rounded-lg bg-black  hover:bg-gray-700">
                <FaChalkboardTeacher className="text-green-500" />
                <span className="ms-3">Data Dosen</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/matkul'} className="flex items-center p-2 text-white rounded-lg bg-black  hover:bg-gray-700">
                <FaBook className="text-purple-500" />
                <span className="ms-3">Data MataKuliah</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/jadwal-matkul'} className="flex items-center p-2 text-white rounded-lg bg-black  hover:bg-gray-700">
                <FaCalendarAlt className="text-yellow-500" />
                <span className="ms-3">Jadwal MataKuliah</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/kelas'} className="flex items-center p-2 text-white rounded-lg bg-black  hover:bg-gray-700">
                <MdMeetingRoom className="text-blue-500" />
                <span className="ms-3">Data Kelas</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/kelas-siswa'} className="flex items-center p-2 text-white rounded-lg bg-black  hover:bg-gray-700">
                <MdMeetingRoom className="text-emerald-400" />
                <span className="ms-3">Data Kelas Mahasiswa</span>
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
