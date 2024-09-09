import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, SearchIcon, CheckCircle, XCircle } from 'lucide-react';
import { issueCertificate, verifyCertificate, getAllCertificates } from './icpInterface';

const AwardCard = ({ award }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="bg-white rounded-lg shadow-lg p-6 mb-4"
  >
    <h3 className="text-xl font-bold mb-2">{award.student_name}</h3>
    <p className="text-gray-600 mb-1">{award.course_name}</p>
    <p className="text-gray-500 text-sm">Issued on: {award.issue_date}</p>
    <p className="text-gray-500 text-sm">By: {award.issuer}</p>
    <p className="text-gray-500 text-sm">Certificate ID: {award.id}</p>
  </motion.div>
);

const App = () => {
  const [view, setView] = useState('verify');
  const [awards, setAwards] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [newAward, setNewAward] = useState({
    id: '',
    student_name: '',
    course_name: '',
    issue_date: '',
    issuer: '',
  });
  const [issuedVerificationId, setIssuedVerificationId] = useState(null);

  useEffect(() => {
    if (view === 'list') {
      getAllCertificates().then(setAwards);
    }
  }, [view]);

  const handleVerify = async () => {
    try {
      const result = await verifyCertificate(searchId);
      setVerificationResult(result);
    } catch (error) {
      console.error('Error during verification:', error);
      setVerificationResult(null);
      alert('Verification failed. Please try again.');
    }
  };

  const handleIssue = async () => {
    try {
      const verificationId = await issueCertificate(newAward);
      setNewAward({ id: '', student_name: '', course_name: '', issue_date: '', issuer: '' });
      setIssuedVerificationId(verificationId);
      alert(`Certificate issued successfully! Verification ID: ${verificationId}`);
    } catch (error) {
      console.error('Error issuing certificate:', error);
      alert('Failed to issue certificate. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Award className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Award Verification System
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-5">
            Securely verify and issue awards on the Internet Computer
          </p>
        </motion.div>

        <nav className="mb-8">
          <ul className="flex justify-center space-x-4">
            {['verify', 'issue', 'list'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setView(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    view === tab
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-indigo-100'
                  } transition duration-150 ease-in-out`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <AnimatePresence mode="wait">
          {view === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Enter Verification ID
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Verification ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      onClick={handleVerify}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <SearchIcon className="h-5 w-5 mr-2" />
                      Verify
                    </button>
                  </div>
                </div>
              </div>
              {verificationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-md bg-green-100"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700">Certificate verified successfully!</span>
                  </div>
                  <AwardCard award={verificationResult} />
                </motion.div>
              )}
              {verificationResult === null && searchId !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-md bg-red-100"
                >
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700">Certificate not found.</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === 'issue' && (
            <motion.div
              key="issue"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={(e) => { e.preventDefault(); handleIssue(); }} className="space-y-4">
                {Object.keys(newAward).map((key) => (
                  <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </label>
                    <input
                      type="text"
                      name={key}
                      id={key}
                      value={newAward[key]}
                      onChange={(e) => setNewAward({ ...newAward, [key]: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Issue Certificate
                </button>
              </form>
              {issuedVerificationId && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-md bg-green-100"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700">Certificate issued successfully!</span>
                  </div>
                  <p className="mt-2">Verification ID: {issuedVerificationId}</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {awards.map((award, index) => (
                <AwardCard key={index} award={award} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;