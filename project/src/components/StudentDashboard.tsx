import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Building2, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import ComplaintForm from './complaints/ComplaintForm';
import ComplaintFilters from './complaints/ComplaintFilters';
import ComplaintList from './complaints/ComplaintList';
import QuickActions from './complaints/QuickActions';
import type { Complaint } from '../types';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const handleSubmitComplaint = useCallback((complaintData: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => {
    const newComplaint: Complaint = {
      ...complaintData,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setComplaints(prev => [newComplaint, ...prev]);
  }, []);

  const handleStatusToggle = useCallback((id: string) => {
    setComplaints(prev => prev.map(complaint => {
      if (complaint.id === id) {
        const newStatus = complaint.status === 'pending' ? 'resolved' : 'pending';
        toast.success(`Complaint marked as ${newStatus}`);
        return { ...complaint, status: newStatus };
      }
      return complaint;
    }));
  }, []);

  const handleLogout = useCallback(() => {
    navigate('/');
    toast.success('Logged out successfully');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Student Dashboard</h1>
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
        {/* Quick Actions */}
        <QuickActions onNewComplaint={() => setShowNewComplaint(true)} />

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <ComplaintFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
          <button
            onClick={() => setShowNewComplaint(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto justify-center transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-1" />
            New Complaint
          </button>
        </div>

        {/* Complaints List */}
        <ComplaintList
          complaints={complaints}
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          onStatusToggle={handleStatusToggle}
        />
      </main>

      {/* New Complaint Modal */}
      {showNewComplaint && (
        <ComplaintForm
          onSubmit={handleSubmitComplaint}
          onClose={() => setShowNewComplaint(false)}
        />
      )}
    </div>
  );
}