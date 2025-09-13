export const CTASection = () => {
  return (
    <div className="grid justify-items-center gap-2.5">
      <div className="flex items-center gap-2">
        <button
          className="rounded-lg bg-linear-to-br from-gray-100 to-green-200 p-3 px-6 font-semibold text-green-700 hover:from-gray-200 hover:to-green-200 hover:text-green-800 transition-all"
          type="button"
        >
          Start Building Resume
        </button>
        <button
          className="rounded-lg border border-gray-300 p-3 px-6 text-sm font-semibold hover:bg-gray-50 transition-all"
          type="button"
        >
          View Examples
        </button>
      </div>
    </div>
  );
};
