import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-[#FF29D7] text-white py-8 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo - Adjusted size back to 50x50 */}
        <div className="flex-shrink-0">
          <Image src="/logoB.png" alt="SHEBN Logo" width={50} height={50} />
        </div>

        {/* Removed Dotted Line Placeholder */}

        {/* Social Media Icons */}
        {/* Grouped icons, removed profile pic placeholder */}
        <div className="flex items-center space-x-6 flex-shrink-0">
          {/* Instagram icon with updated href */}
          <a href="https://www.instagram.com/shebn.io" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} className="hover:text-gray-300 transition-colors duration-300" />
          </a>
          {/* X (Twitter) icon with updated href */}
          <a href="https://x.com/shebn_" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
            <BsTwitterX size={24} className="hover:text-gray-300 transition-colors duration-300" />
          </a>
          {/* Removed Profile Picture Placeholder */}

          {/* Placeholder for Discord icon (optional, if needed later) */}
          {/* <a href="#" aria-label="Discord">
             <span className="text-2xl">Discord</span>
          </a> */}
        </div>

        {/* Copyright Text - Removed as per previous request to match image */}

      </div>
    </footer>
  );
} 