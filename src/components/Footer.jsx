import React from 'react';
import { Package, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">Your trusted partner for inventory and order management.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Phone size={20} /> Contact</h3>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Mail size={20} /> Email</h3>
            <p className="text-gray-400">support@inventory.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin size={20} /> Location</h3>
            <p className="text-gray-400">123 Business St, City, State</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-400">&copy; 2024 Inventory Portal. All rights reserved.</p>
          <div className="flex gap-4">
            <Facebook size={20} className="cursor-pointer hover:text-blue-400" />
            <Twitter size={20} className="cursor-pointer hover:text-blue-400" />
            <Instagram size={20} className="cursor-pointer hover:text-pink-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
