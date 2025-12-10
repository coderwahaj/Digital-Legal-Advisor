import { User, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const PlatformHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-[#29473E] h-20 lg:h-28 flex items-center justify-between px-8 lg: px-20 border-b-2 border-black flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center pl-4 lg:pl-12">
        <img
          src="/logo.png"
          alt="Digital Legal Advisor"
          className="h-16 lg:h-24 w-auto object-contain"
          onError={(e) => {
            e.target. style.display = 'none';
          }}
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3 lg:gap-6 pr-4 lg:pr-12 flex-shrink-0">
        {/* User Info Button */}
        <button className="group flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-lg bg-white bg-opacity-10 hover:bg-white transition-all duration-300">
          <User 
            size={20} 
            className="text-gray-100 group-hover:text-[#29473E] lg:w-6 lg:h-6 transition-colors duration-300" 
            strokeWidth={1.5} 
          />
          <span 
            className="text-gray-100 group-hover:text-[#29473E] font-semibold text-sm lg:text-base whitespace-nowrap transition-colors duration-300"
            style={{ fontFamily: 'Noto Sans' }}
          >
            {user?.firstName || 'User'}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-lg bg-white bg-opacity-10 hover:bg-white transition-all duration-300"
        >
          <LogOut 
            size={20} 
            className="text-gray-100 group-hover:text-[#29473E] lg:w-6 lg:h-6 transition-colors duration-300" 
            strokeWidth={1.5} 
          />
          <span 
            className="text-gray-100 group-hover:text-[#29473E] font-semibold text-sm lg:text-base whitespace-nowrap transition-colors duration-300"
            style={{ fontFamily: 'Noto Sans' }}
          >
            Log Out
          </span>
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(! sidebarOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default PlatformHeader;