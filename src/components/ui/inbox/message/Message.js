export default function Message({ justify, message }) {
  const style = justify === 'end' ? "text-white bg-violet-600" : "text-gray-700";

  return (
    <li className={`flex justify-${justify}`}>
      <div className={`relative max-w-md px-4 py-2 font-medium rounded-xl text-justify shadow ${style}`}>
        <span className="block">{message}</span>
      </div>
    </li>
  );
}
