import { useState } from 'react';
import { Droplet, Hammer, Zap, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Complaint } from '../../types';

const COMPLAINT_TYPES = [
  { id: 'water', icon: Droplet, label: 'Water Issues', color: 'blue' },
  { id: 'woods', icon: Hammer, label: 'Woodwork Issues', color: 'amber' },
  { id: 'electricity', icon: Zap, label: 'Electrical Issues', color: 'yellow' },
  { id: 'others', icon: MoreHorizontal, label: 'Other Issues', color: 'purple' }
] as const;

interface ComplaintFormProps {
  onSubmit: (data: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function ComplaintForm({ onSubmit, onClose }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    onSubmit({
      type: formData.type as Complaint['type'],
      description: formData.description
    });
    
    toast.success('Complaint submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">New Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complaint Type
            </label>
            <select
              required
              className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Select Type</option>
              {COMPLAINT_TYPES.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              required
              className="w-full rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your issue..."
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}