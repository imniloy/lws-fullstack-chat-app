export default function Error({ message }) {
  return (
    <div className="flex items-center">
      <div className="relative max-w-xl px-4 py-2 bg-[#FF0000] text-center rounded shadow w-full">
        <span className="block text-white font-bold text-sm">{message}</span>
      </div>
    </div>
  );
}
