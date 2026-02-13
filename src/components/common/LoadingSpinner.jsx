
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-[#1a1f4b]/50">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#E68369]/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#E68369] rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
}
