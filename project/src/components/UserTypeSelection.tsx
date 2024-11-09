import { Building2, Users, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserTypeSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Building2 className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Hostel Complaint System
          </h1>
          <p className="text-gray-600">Choose your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/student/register"
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Student</h2>
              <p className="text-gray-600">
                Register or login as a student to submit and track your complaints
              </p>
            </div>
          </Link>

          <Link
            to="/faculty/register"
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <UserCog className="w-12 h-12 text-indigo-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Faculty</h2>
              <p className="text-gray-600">
                Access the management dashboard to handle student complaints
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}