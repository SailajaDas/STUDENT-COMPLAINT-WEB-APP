import { Droplet, Hammer, Zap, MoreHorizontal } from 'lucide-react';

const COMPLAINT_TYPES = [
  { id: 'water', icon: Droplet, label: 'Water Issues', color: 'blue' },
  { id: 'woods', icon: Hammer, label: 'Woodwork Issues', color: 'amber' },
  { id: 'electricity', icon: Zap, label: 'Electrical Issues', color: 'yellow' },
  { id: 'others', icon: MoreHorizontal, label: 'Other Issues', color: 'purple' }
] as const;

interface QuickActionsProps {
  onNewComplaint: () => void;
}

export default function QuickActions({ onNewComplaint }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {COMPLAINT_TYPES.map(({ id, icon: Icon, label, color }) => (
        <button
          key={id}
          onClick={onNewComplaint}
          className={`p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1
            ${color === 'blue' ? 'hover:bg-blue-50' : ''}
            ${color === 'amber' ? 'hover:bg-amber-50' : ''}
            ${color === 'yellow' ? 'hover:bg-yellow-50' : ''}
            ${color === 'purple' ? 'hover:bg-purple-50' : ''}
          `}
        >
          <Icon className={`h-8 w-8 mb-2
            ${color === 'blue' ? 'text-blue-500' : ''}
            ${color === 'amber' ? 'text-amber-500' : ''}
            ${color === 'yellow' ? 'text-yellow-500' : ''}
            ${color === 'purple' ? 'text-purple-500' : ''}
          `} />
          <h3 className="text-lg font-medium text-gray-900">{label}</h3>
        </button>
      ))}
    </div>
  );
}