import ComplaintCard from './ComplaintCard';
import type { Complaint } from '../../types';

interface ComplaintListProps {
  complaints: Complaint[];
  searchQuery: string;
  filterStatus: string;
  onStatusToggle: (id: string) => void;
}

export default function ComplaintList({ 
  complaints, 
  searchQuery, 
  filterStatus,
  onStatusToggle 
}: ComplaintListProps) {
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-200">
        {filteredComplaints.map(complaint => (
          <ComplaintCard 
            key={complaint.id} 
            complaint={complaint}
            onStatusToggle={onStatusToggle}
          />
        ))}
        {filteredComplaints.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No complaints found
          </div>
        )}
      </div>
    </div>
  );
}