import { useState } from 'react';
import { useAuth, useRequireLogin } from '@/contexts/AuthContext';
import { Settings, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MediaItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function MajorMedia() {
  useRequireLogin();
  
  const { logout } = useAuth();
  const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const username = localStorage.getItem('username') || 'User';

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      title: 'Media 1',
      description: 'Description of the media type or advertising solution.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80'
    },
    {
      id: 2,
      title: 'Media 2',
      description: 'Description of the media type or advertising solution.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
    },
    {
      id: 3,
      title: 'Media 3',
      description: 'Description of the media type or advertising solution.',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80'
    }
  ];

  const sliderImages = [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80'
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // TODO: Implement contact form submission
    alert('Message sent successfully!');
    setContactForm({ name: '', email: '', message: '' });
  };

  const toggleSettingsSidebar = () => {
    setIsSettingsSidebarOpen(!isSettingsSidebarOpen);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Navigation Bar */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-40`}>
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold text-blue-600">Logo</Link>
          <nav className="flex items-center space-x-6">
            <ul className={`flex space-x-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
              <li><a href="#about" className="hover:text-blue-600">About</a></li>
              <li><a href="#media" className="hover:text-blue-600">Media</a></li>
              <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
            </ul>
            <div className="flex items-center space-x-2">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{username}</span>
              <button
                onClick={toggleSettingsSidebar}
                className="p-2 bg-gray-800 text-white rounded-full shadow-lg hover:rotate-90 transition-transform duration-300"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-5 min-h-screen sticky top-16">
          <div className="mb-8 text-xl font-semibold">Advertiser Menu</div>
          <div className="space-y-4">
            <Link to="/customer/dashboard" className="block px-4 py-2 text-gray-300 hover:bg-blue-700 rounded">
              Advertising Contract Management
            </Link>
            <Link to="/customer/major-media" className="block px-4 py-2 text-gray-300 hover:bg-blue-700 rounded bg-blue-700">
              Major Media
            </Link>
            <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-blue-700 rounded">
              Report Management
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Digital Outdoor Advertising Platform</h1>
                <p className="text-xl mb-6">Introducing the best way to advertise outdoors with our digital screens</p>
                <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Get Started</a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="max-w-screen-xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-semibold mb-4">About Us</h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We offer cutting-edge digital advertising solutions that help brands reach their audience effectively in urban spaces.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                  <div key={item.id} className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg p-6 rounded-lg`}>
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Slider Section */}
          <section id="media" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="max-w-screen-xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-semibold mb-4">Our Media</h2>
              <div className="flex justify-center space-x-6 overflow-x-auto pb-4">
                {sliderImages.map((image, index) => (
                  <div key={index} className={`flex-shrink-0 w-1/3 min-w-[250px] ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
                    <img src={image} alt={`Media ${index + 1}`} className="w-full h-48 object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} id="map">
            <div className="max-w-screen-xl mx-auto px-6">
              <h2 className="text-3xl font-semibold text-center mb-6">Find Our Locations</h2>
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.3941012!2d126.9779692!3d37.5665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11ecddb3949497!2sSeoul%20City%20Hall!5e0!3m2!1sen!2skr!4v1234567890" 
                  allowFullScreen 
                  loading="lazy"
                  title="Location Map"
                />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="max-w-screen-xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
              <form onSubmit={handleContactSubmit} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg mx-auto max-w-md`}>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full p-4 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    required
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full p-4 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    required
                  />
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    rows={4} 
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className={`w-full p-4 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    required
                  />
                  <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-screen-xl mx-auto px-6 text-center">
              <p>&copy; 2025 Digital Outdoor Advertising. All rights reserved.</p>
            </div>
          </footer>
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
          onClick={() => setIsDarkMode(false)}
          className="w-full py-2 px-4 bg-gray-200 text-black rounded mb-4 hover:bg-gray-300 transition-colors"
        >
          Light Mode
        </button>
        <button
          onClick={() => setIsDarkMode(true)}
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
