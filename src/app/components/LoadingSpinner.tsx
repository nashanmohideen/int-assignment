// LoadingSpinner.tsx
export default function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 border-opacity-50 animate-spin"></div>
      </div>
    );
  }
  