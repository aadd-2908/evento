import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Calendar, TicketCheck, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated, isOrganizer } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">EventMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Explore Events
            </Link>
            {isOrganizer && (
              <Link to="/create-event" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Create Event
              </Link>
            )}
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
              About
            </Link>
          </div>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name || 'User'}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {isOrganizer && (
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/my-tickets" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      My Tickets
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-indigo-600 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-indigo-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/events" 
                className="text-gray-600 hover:text-indigo-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore Events
              </Link>
              {isOrganizer && (
                <Link 
                  to="/create-event" 
                  className="text-gray-600 hover:text-indigo-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Event
                </Link>
              )}
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-indigo-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200 space-y-2">
                  {isOrganizer && (
                    <Link 
                      to="/dashboard" 
                      className="flex items-center text-gray-600 hover:text-indigo-600 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/my-tickets" 
                    className="flex items-center text-gray-600 hover:text-indigo-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TicketCheck className="h-5 w-5 mr-2" />
                    My Tickets
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center text-gray-600 hover:text-indigo-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-gray-600 hover:text-indigo-600 py-2 w-full text-left"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;