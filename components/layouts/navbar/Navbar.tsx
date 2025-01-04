"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Search, Calendar, User } from 'lucide-react';

const menuItems = [
  { title: 'Home', icon: Home, link: '/' },
  { title: 'Search', icon: Search, link: '/search' },
  { title: 'Bookings', icon: Calendar, link: '/bookings' },
  { title: 'Profile', icon: User, link: '/profile' }
];

export default function Navbar() {
const [isOpen, setIsOpen] = useState(false);
const [scrollPosition, setScrollPosition] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  return (
    <nav className={`fixed w-full top-0 z-50  ${scrollPosition > 50 ? 'bg-white shadow-md  text-black' : 'bg-transparent text-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-semibold text-xl tracking-tight bg-red-600 cursor-pointer text-transparent bg-clip-text"
          >
            BookingApp
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 ">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-1  hover:text-red-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden  overflow-hidden z-10 "
            >
              <div className="pb-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 px-4 py-2 text-white hover:text-red-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}