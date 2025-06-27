'use client';
import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient'; // Asegúrate de tener esto configurado

const steps = [
  'mainRole',
  'teamStatus',
  'teamSize',
  'womenCount',
  'womenLeadership',
  'web3Funding',
  'challenges',
  'opportunities',
  'countryCity',
  'challenges2',
  'barriers',
  'missing',
  'negativeExp',
  'futureContact',
];

export default function Research() {
  // Estados para cada pregunta
  const [mainRole, setMainRole] = useState('');
  const [mainRoleOther, setMainRoleOther] = useState('');
  const [teamStatus, setTeamStatus] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [womenCount, setWomenCount] = useState('');
  const [womenLeadership, setWomenLeadership] = useState('');
  const [web3Funding, setWeb3Funding] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [challengesOther, setChallengesOther] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [opportunitiesOther, setOpportunitiesOther] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [challenges2, setChallenges2] = useState([]);
  const [challenges2Other, setChallenges2Other] = useState('');
  const [barriers, setBarriers] = useState([]);
  const [barriersOther, setBarriersOther] = useState('');
  const [missing, setMissing] = useState([]);
  const [missingOther, setMissingOther] = useState('');
  const [negativeExp, setNegativeExp] = useState('');
  const [futureContact, setFutureContact] = useState('');
  const [futureContactValue, setFutureContactValue] = useState('');

  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handlers para selección múltiple
  const handleCheckboxChange = (value, state, setState, max = 3) => {
    setState(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      } else {
        if (max && prev.length >= max) return prev;
        return [...prev, value];
      }
    });
  };

  // Handlers específicos para cada pregunta de selección múltiple
  const handleChallengeChange = e => handleCheckboxChange(e.target.value, challenges, setChallenges, 3);
  const handleOpportunityChange = e => handleCheckboxChange(e.target.value, opportunities, setOpportunities, 3);
  const handleChallenge2Change = e => handleCheckboxChange(e.target.value, challenges2, setChallenges2, 3);
  const handleBarriersChange = e => handleCheckboxChange(e.target.value, barriers, setBarriers, 0);
  const handleMissingChange = e => handleCheckboxChange(e.target.value, missing, setMissing, 3);

  // Validación y avance de pasos
  const handleNext = () => {
    console.log('Paso actual:', step, 'Pregunta:', steps[step]);
    switch (steps[step]) {
      case 'mainRole':
        if (!mainRole || (mainRole === 'other' && !mainRoleOther.trim())) {
          setError('Please select your main role or specify if Other.'); return;
        }
        break;
      case 'teamStatus':
        if (!teamStatus) { setError('Please select an option.'); return; }
        break;
      case 'teamSize':
        if (!teamSize) { setError('Please select an option.'); return; }
        break;
      case 'womenCount':
        if (!womenCount) { setError('Please select an option.'); return; }
        break;
      case 'womenLeadership':
        if (!womenLeadership) { setError('Please select an option.'); return; }
        break;
      case 'web3Funding':
        if (!web3Funding) { setError('Please select an option.'); return; }
        break;
      case 'challenges':
        if (challenges.length === 0 || challenges.length > 3 || (challenges.includes('other') && !challengesOther.trim())) {
          setError('Select 1-3 options and specify if Other.'); return;
        }
        break;
      case 'opportunities':
        if (opportunities.length === 0 || opportunities.length > 3 || (opportunities.includes('other') && !opportunitiesOther.trim())) {
          setError('Select 1-3 options and specify if Other.'); return;
        }
        break;
      case 'countryCity':
        if (!country || !city.trim()) { setError('Please select your country and enter your city.'); return; }
        break;
      case 'challenges2':
        if (challenges2.length === 0 || challenges2.length > 3 || (challenges2.includes('other') && !challenges2Other.trim())) {
          setError('Select 1-3 options and specify if Other.'); return;
        }
        break;
      case 'barriers':
        if (barriers.length === 0 || (barriers.includes('other') && !barriersOther.trim())) {
          setError('Select at least one option and specify if Other.'); return;
        }
        break;
      case 'missing':
        if (missing.length === 0 || missing.length > 3 || (missing.includes('other') && !missingOther.trim())) {
          setError('Select 1-3 options and specify if Other.'); return;
        }
        break;
      case 'negativeExp':
        if (!negativeExp) { setError('Please select an option.'); return; }
        break;
      case 'futureContact':
        if (!futureContact || (futureContact === 'yes' && !futureContactValue.trim())) {
          setError('Please answer or provide your email/@handle.'); return;
        }
        break;
      default:
        break;
    }
    setError('');
    setStep(prev => prev + 1);
  };

  // Envío final a Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!futureContact || (futureContact === 'yes' && !futureContactValue.trim())) {
      setError('Please answer or provide your email/@handle.');
      return;
    }
    setError('');
    const formData = {
      main_role: mainRole,
      main_role_other: mainRole === 'other' ? mainRoleOther : '',
      team_status: teamStatus,
      team_size: teamSize,
      women_count: womenCount,
      women_leadership: womenLeadership,
      web3_funding: web3Funding,
      challenges,
      challenges_other: challenges.includes('other') ? challengesOther : '',
      opportunities,
      opportunities_other: opportunities.includes('other') ? opportunitiesOther : '',
      country,
      city,
      challenges2,
      challenges2_other: challenges2.includes('other') ? challenges2Other : '',
      barriers,
      barriers_other: barriers.includes('other') ? barriersOther : '',
      missing,
      missing_other: missing.includes('other') ? missingOther : '',
      negative_experience: negativeExp,
      future_contact: futureContact,
      future_contact_value: futureContact === 'yes' ? futureContactValue : ''
    };
    const { error } = await supabase.from('research_responses').insert([formData]);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      setSuccess(true);
    }
  };

  // Renderizado condicional por paso
  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#8C2478' }}>
      {/* Título y subtítulo fuera del recuadro */}
      <div className="container mx-auto flex flex-col items-center mb-6">
        <h1 className="text-3xl font-extrabold text-center text-white mb-2">Empowering women in web3</h1>
        <h3 className="text-lg text-center text-white mb-8 font-medium">Help us grow better — take a minute to fill out our survey!</h3>
      </div>
      <div className="container mx-auto flex justify-center">
        <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          {success ? (
            <div className="text-center text-white text-2xl">Thank you for your response!</div>
          ) : (
            <form className="text-white" onSubmit={handleSubmit}>
              {/* Paso 1 */}
              {steps[step] === 'mainRole' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">What is your main role in Web3 today?</p>
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center"><input type="radio" name="mainRole" value="founder" checked={mainRole === 'founder'} onChange={() => { setMainRole('founder'); setError(''); }} className="mr-2" />Founder or co-founder of a project</label>
                    <label className="flex items-center"><input type="radio" name="mainRole" value="technical" checked={mainRole === 'technical'} onChange={() => { setMainRole('technical'); setError(''); }} className="mr-2" />Part of a technical team</label>
                    <label className="flex items-center"><input type="radio" name="mainRole" value="employee" checked={mainRole === 'employee'} onChange={() => { setMainRole('employee'); setError(''); }} className="mr-2" />Employee in a Web3 company</label>
                    <label className="flex items-center"><input type="radio" name="mainRole" value="investor" checked={mainRole === 'investor'} onChange={() => { setMainRole('investor'); setError(''); }} className="mr-2" />Investor or advisor</label>
                    <label className="flex items-center"><input type="radio" name="mainRole" value="student" checked={mainRole === 'student'} onChange={() => { setMainRole('student'); setError(''); }} className="mr-2" />Student or in training</label>
                    <label className="flex items-center"><input type="radio" name="mainRole" value="other" checked={mainRole === 'other'} onChange={() => { setMainRole('other'); setError(''); }} className="mr-2" />Other (please specify)</label>
                    {mainRole === 'other' && (
                      <input type="text" className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Please specify your role" value={mainRoleOther} onChange={e => setMainRoleOther(e.target.value)} />
                    )}
                  </div>
                </div>
              )}
              {/* Paso 2 */}
              {steps[step] === 'teamStatus' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">Are you currently part of a Web3 team?</p>
                  <select className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700" value={teamStatus} onChange={e => setTeamStatus(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              )}
              {/* Paso 3 */}
              {steps[step] === 'teamSize' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">How many people are in your current team (if applicable)?</p>
                  <select className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700" value={teamSize} onChange={e => setTeamSize(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="1">1 (just me)</option>
                    <option value="2-5">2–5</option>
                    <option value="6-10">6–10</option>
                    <option value="more">More than 10</option>
                  </select>
                </div>
              )}
              {/* Paso 4 */}
              {steps[step] === 'womenCount' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">How many women are in your current team?</p>
                  <select className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700" value={womenCount} onChange={e => setWomenCount(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="none">None</option>
                    <option value="1">1</option>
                    <option value="2-3">2–3</option>
                    <option value="more">More than 3</option>
                    <option value="unknown">I don't know / Prefer not to say</option>
                  </select>
                </div>
              )}
              {/* Paso 5 */}
              {steps[step] === 'womenLeadership' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">Does your team or project have any women in leadership or decision-making roles?</p>
                  <select className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700" value={womenLeadership} onChange={e => setWomenLeadership(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="not_applicable">Not applicable</option>
                  </select>
                </div>
              )}
              {/* Paso 6 */}
              {steps[step] === 'web3Funding' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">Have you received or accessed any type of Web3 funding?</p>
                  <select className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700" value={web3Funding} onChange={e => setWeb3Funding(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="yes">Yes (investment, grant, scholarship, etc.)</option>
                    <option value="looking">I'm actively looking</option>
                    <option value="interested">I'm interested but don't know where to start</option>
                    <option value="not_interested">I'm not interested in funding</option>
                  </select>
                </div>
              )}
              {/* Paso 7 */}
              {steps[step] === 'challenges' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">What are the main challenges you face when trying to start or grow in Web3?<br/>(Select up to 3)</p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center"><input type="checkbox" value="capital" checked={challenges.includes('capital')} onChange={handleChallengeChange} className="mr-2" />Access to capital or investors</label>
                    <label className="flex items-center"><input type="checkbox" value="team" checked={challenges.includes('team')} onChange={handleChallengeChange} className="mr-2" />Building a trustworthy team</label>
                    <label className="flex items-center"><input type="checkbox" value="ecosystem" checked={challenges.includes('ecosystem')} onChange={handleChallengeChange} className="mr-2" />Understanding the ecosystem / lack of information</label>
                    <label className="flex items-center"><input type="checkbox" value="community" checked={challenges.includes('community')} onChange={handleChallengeChange} className="mr-2" />Lack of community or support network</label>
                    <label className="flex items-center"><input type="checkbox" value="scaling" checked={challenges.includes('scaling')} onChange={handleChallengeChange} className="mr-2" />Scaling the project</label>
                    <label className="flex items-center"><input type="checkbox" value="other" checked={challenges.includes('other')} onChange={handleChallengeChange} className="mr-2" />Other (please specify)</label>
                    {challenges.includes('other') && (
                      <input type="text" className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Please specify your challenge" value={challengesOther} onChange={e => setChallengesOther(e.target.value)} />
                    )}
                  </div>
                </div>
              )}
              {/* Paso 8 */}
              {steps[step] === 'opportunities' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">What types of opportunities do you value most in the ecosystem?<br/>(Select up to 3)</p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center"><input type="checkbox" value="training" checked={opportunities.includes('training')} onChange={handleOpportunityChange} className="mr-2" />Technical training</label>
                    <label className="flex items-center"><input type="checkbox" value="mentorship" checked={opportunities.includes('mentorship')} onChange={handleOpportunityChange} className="mr-2" />Access to mentorship</label>
                    <label className="flex items-center"><input type="checkbox" value="funding" checked={opportunities.includes('funding')} onChange={handleOpportunityChange} className="mr-2" />Funding</label>
                    <label className="flex items-center"><input type="checkbox" value="networking" checked={opportunities.includes('networking')} onChange={handleOpportunityChange} className="mr-2" />International networking</label>
                    <label className="flex items-center"><input type="checkbox" value="visibility" checked={opportunities.includes('visibility')} onChange={handleOpportunityChange} className="mr-2" />Project visibility</label>
                    <label className="flex items-center"><input type="checkbox" value="jobs" checked={opportunities.includes('jobs')} onChange={handleOpportunityChange} className="mr-2" />Hiring / job opportunities</label>
                    <label className="flex items-center"><input type="checkbox" value="other" checked={opportunities.includes('other')} onChange={handleOpportunityChange} className="mr-2" />Other (please specify)</label>
                    {opportunities.includes('other') && (
                      <input type="text" className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Please specify your opportunity" value={opportunitiesOther} onChange={e => setOpportunitiesOther(e.target.value)} />
                    )}
                  </div>
                </div>
              )}
              {/* Paso 9 */}
              {steps[step] === 'countryCity' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">Country and city where you live or work</p>
                  <select className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 text-gray-700 mb-2" value={country} onChange={e => setCountry(e.target.value)}>
                    <option value="">Select your country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cabo Verde">Cabo Verde</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
                    <option value="Congo, Republic of the">Congo, Republic of the</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Eswatini">Eswatini</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Greece">Greece</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, North">Korea, North</option>
                    <option value="Korea, South">Korea, South</option>
                    <option value="Kosovo">Kosovo</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="North Macedonia">North Macedonia</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Vatican City">Vatican City</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                  <input type="text" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Write your city" value={city} onChange={e => setCity(e.target.value)} />
                </div>
              )}
              {/* Paso 10 */}
              {steps[step] === 'challenges2' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">What challenges have you faced or are facing in your journey within the Web3 ecosystem?<br/>(You can select up to 3)</p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center"><input type="checkbox" value="info" checked={challenges2.includes('info')} onChange={handleChallenge2Change} className="mr-2" />Lack of information or technical barriers</label>
                    <label className="flex items-center"><input type="checkbox" value="networks" checked={challenges2.includes('networks')} onChange={handleChallenge2Change} className="mr-2" />Limited access to networks or communities</label>
                    <label className="flex items-center"><input type="checkbox" value="funding" checked={challenges2.includes('funding')} onChange={handleChallenge2Change} className="mr-2" />Difficulty obtaining funding</label>
                    <label className="flex items-center"><input type="checkbox" value="visibility" checked={challenges2.includes('visibility')} onChange={handleChallenge2Change} className="mr-2" />Lack of visibility or platforms to showcase my work</label>
                    <label className="flex items-center"><input type="checkbox" value="opportunities" checked={challenges2.includes('opportunities')} onChange={handleChallenge2Change} className="mr-2" />Unequal opportunities within teams</label>
                    <label className="flex items-center"><input type="checkbox" value="personal" checked={challenges2.includes('personal')} onChange={handleChallenge2Change} className="mr-2" />Personal responsibilities or limited time to dedicate to the ecosystem</label>
                    <label className="flex items-center"><input type="checkbox" value="other" checked={challenges2.includes('other')} onChange={handleChallenge2Change} className="mr-2" />Other (please specify)</label>
                    {challenges2.includes('other') && (
                      <input type="text" className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Please specify your challenge" value={challenges2Other} onChange={e => setChallenges2Other(e.target.value)} />
                    )}
                  </div>
                </div>
              )}
              {/* Paso 11 */}
              {steps[step] === 'barriers' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">What technical or educational barriers have stopped you or are currently stopping you?</p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center"><input type="checkbox" value="language" checked={barriers.includes('language')} onChange={handleBarriersChange} className="mr-2" />Language (most content is in English)</label>
                    <label className="flex items-center"><input type="checkbox" value="curve" checked={barriers.includes('curve')} onChange={handleBarriersChange} className="mr-2" />Very steep learning curve</label>
                    <label className="flex items-center"><input type="checkbox" value="programs" checked={barriers.includes('programs')} onChange={handleBarriersChange} className="mr-2" />Lack of free or well-structured programs</label>
                    <label className="flex items-center"><input type="checkbox" value="mentors" checked={barriers.includes('mentors')} onChange={handleBarriersChange} className="mr-2" />Lack of guidance or mentors</label>
                    <label className="flex items-center"><input type="checkbox" value="validation" checked={barriers.includes('validation')} onChange={handleBarriersChange} className="mr-2" />Not knowing how to validate if what I'm learning is useful</label>
                    <label className="flex items-center"><input type="checkbox" value="other" checked={barriers.includes('other')} onChange={handleBarriersChange} className="mr-2" />Other (please specify)</label>
                    {barriers.includes('other') && (
                      <input type="text" className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Please specify your barrier" value={barriersOther} onChange={e => setBarriersOther(e.target.value)} />
                    )}
                  </div>
                </div>
              )}
              {/* Paso 12 */}
              {steps[step] === 'missing' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">What do you think is missing in the Web3 ecosystem so that more people can start or scale a project?<br/>(Select up to 3)</p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center"><input type="checkbox" value="funding" checked={missing.includes('funding')} onChange={handleMissingChange} className="mr-2" />Accessible funding</label>
                    <label className="flex items-center"><input type="checkbox" value="mentors" checked={missing.includes('mentors')} onChange={handleMissingChange} className="mr-2" />Experienced mentors</label>
                    <label className="flex items-center"><input type="checkbox" value="education" checked={missing.includes('education')} onChange={handleMissingChange} className="mr-2" />Clear and local educational content</label>
                    <label className="flex items-center"><input type="checkbox" value="networks" checked={missing.includes('networks')} onChange={handleMissingChange} className="mr-2" />Connections and support networks</label>
                    <label className="flex items-center"><input type="checkbox" value="visibility" checked={missing.includes('visibility')} onChange={handleMissingChange} className="mr-2" />Visibility and outreach</label>
                    <label className="flex items-center"><input type="checkbox" value="legal" checked={missing.includes('legal')} onChange={handleMissingChange} className="mr-2" />Legal clarity and regulatory framework</label>
                    <label className="flex items-center"><input type="checkbox" value="other" checked={missing.includes('other')} onChange={handleMissingChange} className="mr-2" />Other (please specify)</label>
                    {missing.includes('other') && (
                      <input type="text" className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Please specify what is missing" value={missingOther} onChange={e => setMissingOther(e.target.value)} />
                    )}
                  </div>
                </div>
              )}
              {/* Paso 13 */}
              {steps[step] === 'negativeExp' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">Have you had any negative experiences that made you reconsider your participation in Web3?</p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center"><input type="radio" name="negativeExp" value="several" checked={negativeExp === 'several'} onChange={e => setNegativeExp(e.target.value)} className="mr-2" />Yes, several times</label>
                    <label className="flex items-center"><input type="radio" name="negativeExp" value="once" checked={negativeExp === 'once'} onChange={e => setNegativeExp(e.target.value)} className="mr-2" />Yes, once</label>
                    <label className="flex items-center"><input type="radio" name="negativeExp" value="no" checked={negativeExp === 'no'} onChange={e => setNegativeExp(e.target.value)} className="mr-2" />No</label>
                    <label className="flex items-center"><input type="radio" name="negativeExp" value="prefer_not" checked={negativeExp === 'prefer_not'} onChange={e => setNegativeExp(e.target.value)} className="mr-2" />Prefer not to answer</label>
                  </div>
                </div>
              )}
              {/* Paso 14 */}
              {steps[step] === 'futureContact' && (
                <div className="mb-6">
                  <p className="block text-lg font-bold mb-4 text-center">Would you like to receive the study results and participate in future networks or calls?</p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center"><input type="radio" name="futureContact" value="yes" checked={futureContact === 'yes'} onChange={e => setFutureContact(e.target.value)} className="mr-2" />Yes</label>
                    <label className="flex items-center"><input type="radio" name="futureContact" value="no" checked={futureContact === 'no'} onChange={e => setFutureContact(e.target.value)} className="mr-2" />No</label>
                    {futureContact === 'yes' && (
                      <input type="text" className="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-pink-200 placeholder-gray-500" placeholder="Enter your email or @handle" value={futureContactValue} onChange={e => setFutureContactValue(e.target.value)} />
                    )}
                  </div>
                </div>
              )}
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              <div className="flex items-center justify-center mt-8">
                {step === steps.length - 1 ? (
                  <button type="submit" className="bg-[#31041F] text-white border border-pink-500 font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto">
                    Enviar
                  </button>
                ) : (
                  <button type="button" onClick={handleNext} className="bg-[#31041F] text-white border border-pink-500 font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto">
                    Next
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
} 