import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({isLoggedIn, handleLogout}) => {
  
  return (
    <>
      <nav className="bg-black-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <h2 className="text-white font-bold text-2xl">Aesthetic Domain</h2>
              </Link>
            </div>
            <div className="flex-grow">
              <ul className="flex justify-end text-gray-300 text-lg font-medium">
                <li>
                  <Link to="/search">
                    <h4 className="px-3 py-2 hover:text-white">Search for Artwork</h4>
                  </Link>
                </li>
                {isLoggedIn ? (
                  // Render "Log Out" when user is logged in
                  <button onClick={handleLogout} className="px-3 py-2 hover:text-white">
                    Log Out
                  </button>

                ) : (
                  // Render "Sign Up" and "Log In" when user is not logged in
                  <>
                    <li>
                      <Link to="/auth/signup">
                        <h4 className="px-3 py-2 hover:text-white">Sign Up</h4>
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth/login">
                        <h4 className="px-3 py-2 hover:text-white">Log In</h4>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
