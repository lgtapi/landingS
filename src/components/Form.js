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
  const [web3RoleOther, setWeb3RoleOther] = useState('');
  const [howHear, setHowHear] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!country) {
      newErrors.country = 'Please select your country';
    }
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!web3Role) {
      newErrors.web3Role = 'Please select your Web3 role';
    }
    
    if (web3Role === 'other' && !web3RoleOther.trim()) {
      newErrors.web3RoleOther = 'Please specify your Web3 role';
    }
    
    if (!howHear.trim()) {
      newErrors.howHear = 'Please tell us how you heard about us';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        full_name: fullName,
        email: email,
        country: country,
        username: username,
        web3_role: web3Role,
        rol_web3_otro: web3Role === 'other' ? web3RoleOther : '',
        how_hear: howHear,
      };

      const { data, error } = await supabase
        .from('waitlist_entries')
        .insert([formData]);

      if (error) {
        throw error;
      }

      alert('Thank you for joining the waitlist!');
      // Clear form fields
      setFullName('');
      setEmail('');
      setCountry('');
      setUsername('');
      setWeb3Role('');
      setWeb3RoleOther('');
      setHowHear('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert('Error submitting form. Please try again later.');
    } finally {
      setIsSubmitting(false);
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
              <label htmlFor="fullName" className="block text-sm font-bold mb-2">Full Name: *</label>
              <input
                type="text"
                id="fullName"
                required
                className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500 ${errors.fullName ? 'border-2 border-red-500' : ''}`}
                placeholder="Write your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">Email: *</label>
              <input
                type="email"
                id="email"
                required
                className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500 ${errors.email ? 'border-2 border-red-500' : ''}`}
                placeholder="Write your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-bold mb-2">Country: *</label>
              <div className="relative">
                <select
                  id="country"
                  required
                  className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700 ${errors.country ? 'border-2 border-red-500' : ''}`}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
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
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-bold mb-2">Your @ more active (X, Lens, Farcaster o IG): *</label>
              <input
                type="text"
                id="username"
                required
                className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500 ${errors.username ? 'border-2 border-red-500' : ''}`}
                placeholder="Write your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            
            <div className="mb-6">
              <p className="block text-sm font-bold mb-2 text-center">To get to know you better...</p>
              <label htmlFor="web3Role" className="block text-sm font-bold mb-2">What role does Web3 represent for you today?: *</label>
              <div className="relative">
                <select
                  id="web3Role"
                  required
                  className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700 ${errors.web3Role ? 'border-2 border-red-500' : ''}`}
                  value={web3Role}
                  onChange={(e) => setWeb3Role(e.target.value)}
                >
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
                {errors.web3Role && <p className="text-red-500 text-xs mt-1">{errors.web3Role}</p>}
              </div>
              {web3Role === 'other' && (
                <div className="mt-4">
                  <label htmlFor="web3RoleOther" className="block text-sm font-bold mb-2">Please specify your Web3 role: *</label>
                  <input
                    type="text"
                    id="web3RoleOther"
                    className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500 ${errors.web3RoleOther ? 'border-2 border-red-500' : ''}`}
                    placeholder="Write your Web3 role"
                    value={web3RoleOther}
                    onChange={(e) => setWeb3RoleOther(e.target.value)}
                  />
                  {errors.web3RoleOther && <p className="text-red-500 text-xs mt-1">{errors.web3RoleOther}</p>}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="howHear" className="block text-sm font-bold mb-2">¿How did you meet us?: *</label>
              <input
                type="text"
                id="howHear"
                required
                className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500 ${errors.howHear ? 'border-2 border-red-500' : ''}`}
                placeholder="Write how you meet us"
                value={howHear}
                onChange={(e) => setHowHear(e.target.value)}
              />
              {errors.howHear && <p className="text-red-500 text-xs mt-1">{errors.howHear}</p>}
            </div>

            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#31041F] text-white border border-pink-500 font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Join SHEBN'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 