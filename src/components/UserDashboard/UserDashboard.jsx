import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { FaUniversity, FaMoneyBillWave, FaCreditCard, FaCheckCircle, FaChevronLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const db = getFirestore();
const auth = getAuth();

const ProgramRegistration = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    amount: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    educationLevel: '',
    previousSchool: '',
    documents: []
  });
  const [currentStep, setCurrentStep] = useState(1); // 1: Select program, 2: Payment, 3: Registration form
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsQuery = query(collection(db, 'programs'));
        const querySnapshot = await getDocs(programsQuery);
        const programsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPrograms(programsData);
      } catch (error) {
        toast.error('Failed to fetch programs: ' + error.message);
      }
    };

    fetchPrograms();
  }, []);

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setPaymentInfo(prev => ({
      ...prev,
      amount: program.fee || '0'
    }));
    setCurrentStep(2);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentUpload = (e) => {
    // In a real app, you would upload files to storage and get URLs
    const files = Array.from(e.target.files);
    setRegistrationForm(prev => ({
      ...prev,
      documents: [...prev.documents, ...files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))]
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process payment here
    // For demo, we'll just validate and move to next step
    if (paymentInfo.paymentMethod === 'credit' && 
        (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv)) {
      toast.error('Please fill all payment details');
      return;
    }
    setCurrentStep(3);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      // Save registration data
      const registrationRef = doc(collection(db, 'registrations'));
      await setDoc(registrationRef, {
        userId: user.uid,
        programId: selectedProgram.id,
        programName: selectedProgram.name,
        paymentInfo,
        registrationData: registrationForm,
        status: 'pending',
        createdAt: new Date()
      });

      // Update user profile with program info
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        program: selectedProgram.name,
        programId: selectedProgram.id,
        registrationStatus: 'pending'
      });

      setRegistrationComplete(true);
      toast.success('Registration submitted successfully!');
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderProgramSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-950">Select a Program</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map(program => (
          <div 
            key={program.id} 
            className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProgramSelect(program)}
          >
            <div className="flex items-start mb-4">
              <FaUniversity className="text-blue-600 text-2xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">{program.name}</h3>
                <p className="text-gray-600">{program.type} Program</p>
              </div>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">Duration:</span> {program.duration}</p>
              <p><span className="font-medium">Fee:</span> {program.fee || 'Contact for pricing'}</p>
              <p className="text-sm text-gray-600">{program.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <button 
        onClick={() => setCurrentStep(1)} 
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <FaChevronLeft className="mr-1" /> Back to Programs
      </button>
      
      <h2 className="text-2xl font-bold text-blue-950">Payment Information</h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Program: {selectedProgram.name}</h3>
        <p className="text-lg font-bold">Amount Due: {selectedProgram.fee || '0'}</p>
      </div>
      
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Payment Method</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={paymentInfo.paymentMethod === 'credit'}
                onChange={handlePaymentChange}
                className="mr-2"
              />
              <span>Credit Card</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentInfo.paymentMethod === 'bank'}
                onChange={handlePaymentChange}
                className="mr-2"
              />
              <span>Bank Transfer</span>
            </label>
          </div>
        </div>

        {paymentInfo.paymentMethod === 'credit' && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={paymentInfo.expiry}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  placeholder="123"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {paymentInfo.paymentMethod === 'bank' && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Bank Transfer Details</h4>
            <p className="mb-1">Bank Name: Capital College Bank</p>
            <p className="mb-1">Account Number: 1234567890</p>
            <p className="mb-1">Account Name: Capital College</p>
            <p className="mb-1">Reference: Your Full Name</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center"
          >
            <FaMoneyBillWave className="mr-2" />
            Proceed to Registration
          </button>
        </div>
      </form>
    </div>
  );

  const renderRegistrationForm = () => (
    <div className="space-y-6">
      <button 
        onClick={() => setCurrentStep(2)} 
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <FaChevronLeft className="mr-1" /> Back to Payment
      </button>
      
      <h2 className="text-2xl font-bold text-blue-950">Registration Form</h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold">Program: {selectedProgram.name}</h3>
        <p>Payment Method: {paymentInfo.paymentMethod === 'credit' ? 'Credit Card' : 'Bank Transfer'}</p>
      </div>
      
      <form onSubmit={handleRegistrationSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={registrationForm.fullName}
              onChange={handleRegistrationChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={registrationForm.email}
              onChange={handleRegistrationChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={registrationForm.phone}
              onChange={handleRegistrationChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={registrationForm.address}
              onChange={handleRegistrationChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Education Level</label>
            <select
              name="educationLevel"
              value={registrationForm.educationLevel}
              onChange={handleRegistrationChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select your education level</option>
              <option value="highSchool">High School</option>
              <option value="diploma">Diploma</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Previous School/Institution</label>
            <input
              type="text"
              name="previousSchool"
              value={registrationForm.previousSchool}
              onChange={handleRegistrationChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Required Documents</label>
          <p className="text-sm text-gray-600 mb-2">
            Please upload scanned copies of: Transcripts, ID, and Certificates
          </p>
          <input
            type="file"
            multiple
            onChange={handleDocumentUpload}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {registrationForm.documents.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Uploaded files:</p>
              <ul className="text-sm text-gray-600">
                {registrationForm.documents.map((doc, index) => (
                  <li key={index}>{doc.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : (
              <>
                <FaCheckCircle className="mr-2" />
                Complete Registration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center py-12">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-blue-950 mb-4">Registration Complete!</h2>
      <p className="text-lg mb-6">
        Thank you for registering for {selectedProgram.name}. Your application is being processed.
      </p>
      <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto text-left mb-6">
        <h3 className="font-semibold mb-2">Next Steps:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>You will receive a confirmation email shortly</li>
          <li>Our admissions team will review your documents</li>
          <li>Expect a response within 5-7 business days</li>
        </ul>
      </div>
      <button
        onClick={() => navigate('/student-dashboard')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Go to Student Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        {!registrationComplete ? (
          <>
            {currentStep === 1 && renderProgramSelection()}
            {currentStep === 2 && renderPaymentForm()}
            {currentStep === 3 && renderRegistrationForm()}
          </>
        ) : (
          renderComplete()
        )}
      </div>
    </div>
  );
};

export default ProgramRegistration;