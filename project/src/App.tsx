import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/LoadingScreen';
import UserTypeSelection from './components/UserTypeSelection';
import StudentRegister from './components/StudentRegister';
import FacultyRegister from './components/FacultyRegister';
import StudentLogin from './components/StudentLogin';
import FacultyLogin from './components/FacultyLogin';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        {loading ? (
          <LoadingScreen onComplete={() => setLoading(false)} />
        ) : null}
        <Routes>
          <Route path="/" element={<UserTypeSelection />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/faculty/register" element={<FacultyRegister />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;