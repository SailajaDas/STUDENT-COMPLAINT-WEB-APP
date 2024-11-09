import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, LogOut, Bell, Search, Filter,
  Droplet, Hammer, Zap, MoreHorizontal,
  CheckCircle, XCircle, Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const COMPLAINT_TYPES = [
  { id: 'water', icon: Droplet, label: 'Water Issues', color: 'blue' },
  { id: 'woods', icon: Hammer, label: 'Woodwork Issues', color: 'amber' },
  { id: 'electricity', icon: Zap, label: 'Electrical Issues', color: 'yellow' },
  { id: 'others', icon: MoreHorizontal, label: 'Other Issues', color: 'purple' }
];

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  // Mock complaints data
  const [complaints] = useState([
    {
      id: '1',
      type: 'water',
      description: 'Low water pressure in hostel room',
      status: 'pending',
      createdAt: '2024-03-15T10:00:00Z',
      student: {
        name: 'John Doe',
        regNumber: 'CSE/2024/001',
        room: 'A-101'
      },
      escalatedTo: 'warden'
    },
    {
      id: '2',
      type: 'electricity',
      description: 'Power socket not working',
      status: 'in-progress',
      createdAt: '2024-03-14T15:30:00Z',
      student: {
        name: 'Jane Smith',
        regNumber: 'CSE/2024/002',
        room: 'B-205'
      },
      escalatedTo: 'warden'
    }
  ]);

  const handleLogout = () => {
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleStatusChange = (complaintId: string, newStatus: string) => {
    toast.success(`Complaint status updated to ${newStatus}`);
    setSelectedComplaint(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {COMPLAINT_TYPES.map(({ id, icon: Icon, label, color }) => (
            <div
              key={id}
              className={`p-6 bg-white rounded-xl shadow-sm
                ${color === 'blue' ? 'border-l-4 border-blue-500' : ''}
                ${color === 'amber' ? 'border-l-4 border-amber-500' : ''}
                ${color === 'yellow' ? 'border-l-4 border-yellow-500' : ''}
                ${color === 'purple' ? 'border-l-4 border-purple-500' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {complaints.filter(c => c.type === id).length}
                  </p>
                </div>
                <Icon className={`h-8 w-8
                  ${color === 'blue' ? 'text-blue-500' : ''}
                  ${color === 'amber' ? 'text-amber-500' : ''}
                  ${color === 'yellow' ? 'text-yellow-500' : ''}
                  ${color === 'purple' ? 'text-purple-500' : ''}
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search complaints..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {COMPLAINT_TYPES.map(({ id, label }) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {COMPLAINT_TYPES.find(t => t.id === complaint.type)?.icon({
                        className: `h-5 w-5 mr-2 ${
                          complaint.type === 'water' ? 'text-blue-500' :
                          complaint.type === 'electricity' ? 'text-yellow-500' :
                          complaint.type === 'woods' ? 'text-amber-500' :
                          'text-purple-500'
                        }`
                      })}
                      <span className="text-sm text-gray-900">
                        {COMPLAINT_TYPES.find(t => t.id === complaint.type)?.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{complaint.student.name}</div>
                    <div className="text-sm text-gray-500">{complaint.student.regNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{complaint.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Status Update Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Complaint Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  {getStatusIcon('in-progress')}
                  <span className="ml-2">Mark as In Progress</span>
                </div>
                <button
                  onClick={() => handleStatusChange(selectedComplaint.id, 'in-progress')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Select
                </button>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  {getStatusIcon('resolved')}
                  <span className="ml-2">Mark as Resolved</span>
                </div>
                <button
                  onClick={() => handleStatusChange(selectedComplaint.id, 'resolved')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                >
                  Select
                </button>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  {getStatusIcon('rejected')}
                  <span className="ml-2">Reject Complaint</span>
                </div>
                <button
                  onClick={() => handleStatusChange(selectedComplaint.id, 'rejected')}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Select
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}