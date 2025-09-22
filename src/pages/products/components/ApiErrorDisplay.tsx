
interface ApiErrorDisplayProps {
  error: any | null;
}

const ApiErrorDisplay = ({ error }: ApiErrorDisplayProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
      Error: {error.message || "Failed to create product"}
    </div>
  );
};

export default ApiErrorDisplay;