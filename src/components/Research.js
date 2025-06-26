import React, { useState } from 'react';

export default function Research() {
  const [mainRole, setMainRole] = useState('');
  const [mainRoleOther, setMainRoleOther] = useState('');
  const [teamStatus, setTeamStatus] = useState('');
  const [error, setError] = useState('');
  const [teamSize, setTeamSize] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mainRole || (mainRole === 'other' && !mainRoleOther.trim()) || !teamStatus || !teamSize) {
      setError('Please answer all questions.');
      return;
    }
    setError('');
    // Aquí podrías manejar el envío de datos
    alert('Form submitted!');
  };

  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#8C2478' }}>
      <div className="container mx-auto flex justify-center">
        <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <form className="text-white" onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="block text-lg font-bold mb-4 text-center">What is your main role in Web3 today?</p>
              <div className="flex flex-col space-y-3">
                <label className="flex items-center">
                  <input type="radio" name="mainRole" value="founder" checked={mainRole === 'founder'} onChange={() => setMainRole('founder')} className="mr-2" />
                  Founder or co-founder of a project
                </label>
                <label className="flex items-center">
                  <input type="radio" name="mainRole" value="technical" checked={mainRole === 'technical'} onChange={() => setMainRole('technical')} className="mr-2" />
                  Part of a technical team
                </label>
                <label className="flex items-center">
                  <input type="radio" name="mainRole" value="employee" checked={mainRole === 'employee'} onChange={() => setMainRole('employee')} className="mr-2" />
                  Employee in a Web3 company
                </label>
                <label className="flex items-center">
                  <input type="radio" name="mainRole" value="investor" checked={mainRole === 'investor'} onChange={() => setMainRole('investor')} className="mr-2" />
                  Investor or advisor
                </label>
                <label className="flex items-center">
                  <input type="radio" name="mainRole" value="student" checked={mainRole === 'student'} onChange={() => setMainRole('student')} className="mr-2" />
                  Student or in training
                </label>
                <label className="flex items-center">
                  <input type="radio" name="mainRole" value="other" checked={mainRole === 'other'} onChange={() => setMainRole('other')} className="mr-2" />
                  Other (please specify)
                </label>
                {mainRole === 'other' && (
                  <input
                    type="text"
                    className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500"
                    placeholder="Please specify your role"
                    value={mainRoleOther}
                    onChange={e => setMainRoleOther(e.target.value)}
                  />
                )}
              </div>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <div className="mb-6">
              <p className="block text-lg font-bold mb-4 text-center">Are you currently part of a Web3 team?</p>
              <select
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700"
                value={teamStatus}
                onChange={e => setTeamStatus(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="mb-6">
              <p className="block text-lg font-bold mb-4 text-center">How many people are in your current team (if applicable)?</p>
              <select
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700"
                value={teamSize}
                onChange={e => setTeamSize(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="1">1 (just me)</option>
                <option value="2-5">2–5</option>
                <option value="6-10">6–10</option>
                <option value="more">More than 10</option>
              </select>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="bg-[#31041F] text-white border border-pink-500 font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 