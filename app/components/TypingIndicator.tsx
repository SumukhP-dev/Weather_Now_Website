const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-3 rounded-2xl bg-gray-700 text-white w-fit">
      <div className="size-2 rounded-full bg-white animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-2 rounded-full bg-white animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-2 rounded-full bg-white animate-bounce"></div>
    </div>
  );
};

export default TypingIndicator;