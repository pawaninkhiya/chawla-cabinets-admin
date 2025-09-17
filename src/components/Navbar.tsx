import { useUIContext } from "@hooks/context/useUIContext";
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FiBell, FiSearch } from "react-icons/fi";

// import { useAuthContext } from "@hooks/context/useAuthContext";

const Navbar = () => {
  const { toggleSidebar, isSidebarOpen } = useUIContext();
  //   const { user } = useAuthContext();
  //   const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-white h-16 shadow-sm border-b border-gray-200 w-full px-4 md:px-6 flex items-center justify-between transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {
          !isSidebarOpen && <button
            onClick={toggleSidebar}
            className="text-default-500 hover:text-default-700 cursor-pointer p-2 rounded-lg hover:bg-default-100 transition-colors"
            aria-label="Open Sidebar"
          >
            <BiMenuAltRight size={25} />
          </button>
        }


        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-64 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-default-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Pawan Kumar</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-default-500 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {"P"}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;