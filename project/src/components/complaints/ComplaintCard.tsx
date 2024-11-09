import { Droplet, Hammer, Zap, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';
import type { Complaint } from '../../types';

const COMPLAINT_ICONS = {
  water: Droplet,
  woods: Hammer,
  electricity: Zap,
  others: MoreHorizontal
} as const;

const COMPLAINT_COLORS = {
  water: 'text-blue-500',
  woods: 'text-amber-500',
  electricity: 'text-yellow-500',
  others: 'text-purple-500'
} as const;

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800'
} as const;

interface ComplaintCardProps {
  complaint: Complaint;
  onStatusToggle: (id: string) => void;
}

export default function ComplaintCard({ complaint, onStatusToggle }: ComplaintCardProps) {
  const Icon = COMPLAINT_ICONS[complaint.type] || MoreHorizontal;
  const colorClass = COMPLAINT_COLORS[complaint.type] || 'text-purple-500';
  const statusClass = STATUS_STYLES[complaint.status];

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className={`h-6 w-6 ${colorClass}`} />
          <h3 className="text-lg font-medium text-gray-900">
            {complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1)} Issue
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onStatusToggle(complaint.id)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${complaint.status === 'resolved' 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
          >
            {complaint.status === 'resolved' ? (
              <CheckCircle2 className="w-4 h-4 mr-1" />
            ) : (
              <Clock className="w-4 h-4 mr-1" />
            )}
            {complaint.status === 'resolved' ? 'Completed' : 'Pending'}
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{complaint.description}</p>
      <p className="text-sm text-gray-500">
        Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}