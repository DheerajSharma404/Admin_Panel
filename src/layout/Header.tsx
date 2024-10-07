import { useState } from "react";
import { FaChevronCircleDown, FaUser, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [useMenuOpen, setUseMenuOpen] = useState(false);
  return (
    <div className='w-full p-4 relative'>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <i className="text-2xl text-black-300" ></i>
        </div>
        <div className="flex items-center space-x-4">
          <figure>
            <img src='/assets/profile.jpg' alt="avatar" className="w-10 h-10 rounded-full" />
          </figure>
          <div className="flex flex-row items-center space-x-2">
            <h1 className="text-lg font-bold">John Doe</h1>
            <i onClick={() => setUseMenuOpen(!useMenuOpen)}><FaChevronCircleDown /></i>
          </div>
          {
            useMenuOpen && (
              <div className="absolute right-0 top-14 bg-white shadow-md p-4 w-48">
                <ul className="flex flex-col space-y-2">
                  <li className="text-sm font-bold flex items-center space-x-2 cursor-pointer" onClick={() => {navigate('/UserProfile'); setUseMenuOpen(false)}}>
                    <FaUser />
                    <span>Profile</span>
                  </li>
                  <li className="text-sm font-bold flex items-center space-x-2">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Header
