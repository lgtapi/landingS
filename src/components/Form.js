"use client";

import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { supabase } from '../../utils/supabaseClient'; // Import Supabase client
import { useState } from 'react'; // Import useState

export default function Form() {
  // State variables for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const [web3Role, setWeb3Role] = useState('');
  const [howHear, setHowHear] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data with keys matching Supabase table column names (waitlist_entries)
    const formData = {
      full_name: fullName, // Matching waitlist_entries column
      email: email, // Matching waitlist_entries column
      country: country, // Matching waitlist_entries column
      username: username, // Matching waitlist_entries column
      web3_role: web3Role, // Matching waitlist_entries column
      how_hear: howHear, // Matching waitlist_entries column,
    };

    // Insert data into Supabase using the table name 'waitlist_entries'
    const { data, error } = await supabase
      .from('waitlist_entries') // Using the correct table name
      .insert([formData]);

    if (error) {
      console.error('Error submitting form:', error.message);
      alert('Error submitting form. Please try again later.');
    } else {
      console.log('Form submitted successfully:', data);
      alert('Thank you for joining the waitlist!');
      // Clear form fields
      setFullName('');
      setEmail('');
      setCountry('');
      setUsername('');
      setWeb3Role('');
      setHowHear('');
    }
  };

  return (
    <section id="form-section" className="py-16 px-6" style={{ backgroundColor: '#8C2478' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        {/* Left side: Text and Cube Image - Reverted text alignment, adjusted image size */}
        {/* Restored md:text-left and changed justify-center back to md:justify-start for image container */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-12">
          <p className="text-2xl md:text-3xl font-normal text-white mb-8">
            Join today and
            <br />be among the
            <br />first to make it
            <br />possible.
          </p>
          {/* Placeholder for the cube image - Adjusted size for larger screens, left-aligned on md+ */}
          <div className="flex justify-center md:justify-start">
             {/* Make sure to add your cube image in the public directory and update the src path */}
             {/* Increased base width/height, kept responsive class */}
             <Image src="/Postshebn.png" alt="3D Cube" width={350} height={350} className="w-48 md:w-auto"/>
          </div>
        </div>

        {/* Right side: Form - Added onSubmit handler */}
        <div className="md:w-1/2 bg-white bg-opacity-20 p-8 rounded-lg shadow-lg w-full">
          <form className="text-white" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-bold mb-2">Full Name:</label>
              {/* Added value and onChange handler */}
              <input type="text" id="fullName" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Write your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
              {/* Added value and onChange handler */}
              <input type="email" id="email" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Write your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-bold mb-2">Country:</label>
              <div className="relative">
                {/* Added value and onChange handler */}
                <select id="country" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700" value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="">Choose your country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="AR">Argentina</option>
                  <option value="BR">Brazil</option>
                  <option value="CO">Colombia</option>
                  <option value="VE">Venezuela</option>
                  <option value="CL">Chile</option>
                  {/* Add more country options here as needed */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-bold mb-2">Your @ more active (X, Lens, Farcaster o IG)</label>
              {/* Added value and onChange handler */}
              <input type="text" id="username" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Write your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            
            <div className="mb-6">
              <p className="block text-sm font-bold mb-2 text-center">To get to know you better...</p>
              <label htmlFor="web3Role" className="block text-sm font-bold mb-2">What role does Web3 represent for you today?</label>
              <div className="relative">
                {/* Added value and onChange handler */}
                <select id="web3Role" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700" value={web3Role} onChange={(e) => setWeb3Role(e.target.value)}>
                  <option value="">Choose your role</option>
                  <option value="builder">Builder (devs, smart contracts, infra)</option>
                  <option value="founder">Founder or co-founder</option>
                  <option value="designer">Designer / UX</option>
                  <option value="content_creator">Content creator</option>
                  <option value="artist">Artist or collector of NFTs</option>
                  <option value="investor">Investor / DeFi Curious</option>
                  <option value="community">Community builder / mod</option>
                  <option value="explorer">Explorer (just entering the ecosystem)</option>
                  <option value="other">Other (tell us)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="howHear" className="block text-sm font-bold mb-2">¿How did you meet us?</label>
              {/* Added value and onChange handler */}
              <input type="text" id="howHear" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Write how you meet us" value={howHear} onChange={(e) => setHowHear(e.target.value)} />
            </div>

            <div className="flex items-center justify-center mt-8">
              {/* Removed hover effects */}
              <button type="submit" className="bg-[#31041F] text-white border border-pink-500 font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto">
                Join SHEBN
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 