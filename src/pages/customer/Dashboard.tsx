import { useState } from 'react';
import { useAuth, useRequireLogin } from '@/contexts/AuthContext';
import { Settings, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MediaContract {
  id: number;
  mediaName: string;
  mediaLocation: string;
  mediaType: string;
  installationType: string;
  size: string;
  operatingHours: string;
  advertisingStartDate: string;
  advertisingCosts: string;
}

export default function Dashboard() {
  useRequireLogin(); // Redirect if not logged in
  
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Get username from localStorage
  const username = localStorage.getItem('username') || 'User';

  // Sample data - replace with actual API data
  const [contracts] = useState<MediaContract[]>([
    {
      id: 1,
      mediaName: 'Media Name',
      mediaLocation: 'Location',
      mediaType: 'Type',
      installationType: 'Installation',
      size: 'Size',
      operatingHours: '9:00 AM - 5:00 PM',
      advertisingStartDate: '2025-01-01',
      advertisingCosts: '$1000'
    },
    {
      id: 2,
      mediaName: 'Media Name 2',
      mediaLocation: 'Location 2',
      mediaType: 'Type 2',
      installationType: 'Installation 2',
      size: 'Size 2',
      operatingHours: '8:00 AM - 6:00 PM',
      advertisingStartDate: '2025-02-01',
      advertisingCosts: '$1200'
    }
  ]);

  const toggleSettingsSidebar = () => {
    setIsSettingsSidebarOpen(!isSettingsSidebarOpen);
  };

  const setLightMode = () => {
    setIsDarkMode(false);
  };

  const setDarkModeHandler = () => {
    setIsDarkMode(true);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-5">
          <div className="mb-8 text-xl font-semibold">Advertiser Menu</div>
          <div className="space-y-4">
            <Link to="/customer/dashboard" className="block px-4 py-2 text-gray-300 hover:bg-blue-700 rounded bg-blue-700">
              Advertising Contract Management
            </Link>
            <Link to="/customer/major-media" className="block px-4 py-2 text-gray-300 hover:bg-blue-700 rounded">
              Major Media
            </Link>
            <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-blue-700 rounded">
              Report Management
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              For detailed inquiries regarding the contract, 551-81-02693 or Please contact us at gbpl@admart.kr
            </h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`px-4 py-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800'}`}
                placeholder="Search..."
              />
              <div className="flex items-center space-x-2">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{username}</span>
                <div className="relative">
                  {/* Gear Icon for Settings */}
                  <button
                    onClick={toggleSettingsSidebar}
                    className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:rotate-90 transition-transform duration-300"
                  >
                    <Settings className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className={`overflow-x-auto shadow rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="px-6 py-4">
              <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                You can check the information about the advertising medium you applied for.
              </p>
              <table className="min-w-full table-auto">
                <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                  <tr>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>#</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Media Name</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Media Location</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Media Type</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Installation Type</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Size</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Operating Hours</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Advertising Start Date</th>
                    <th className={`px-4 py-2 text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Advertising Costs</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.length > 0 ? (
                    contracts.map((contract) => (
                      <tr key={contract.id} className={isDarkMode ? 'border-gray-700' : 'border-gray-200'}>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.id}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.mediaName}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.mediaLocation}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.mediaType}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.installationType}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.size}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.operatingHours}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.advertisingStartDate}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{contract.advertisingCosts}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className={`px-4 py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        There is no data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {contracts.length === 0 && (
                <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  There is no data.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sidebar Overlay */}
      {isSettingsSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSettingsSidebarOpen(false)}
        />
      )}

      {/* Settings Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black p-5 z-50 transform transition-transform duration-300 ease-in-out ${
          isSettingsSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={() => setIsSettingsSidebarOpen(false)} className="hover:opacity-70">
            <X className="w-6 h-6" />
          </button>
        </div>
        <button
          onClick={setLightMode}
          className="w-full py-2 px-4 bg-gray-200 text-black rounded mb-4 hover:bg-gray-300 transition-colors"
        >
          Light Mode
        </button>
        <button
          onClick={setDarkModeHandler}
          className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Dark Mode
        </button>
        <hr className="my-4" />
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
