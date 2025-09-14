interface ResultCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function ResultCard({ title, children, icon, className = "" }: ResultCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        {icon && (
          <div className="w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}