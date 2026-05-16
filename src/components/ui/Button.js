export default function Button({
  children,
  className = "",
  ...props
}) {

  return (
    <button
      {...props}
      className={`
      px-6 py-3
      rounded-2xl
      bg-black
      text-white
      hover:bg-gray-900
      transition-all
      duration-300
      shadow-lg
      ${className}
      `}
    >
      {children}
    </button>
  );
}