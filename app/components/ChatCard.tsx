const ChatCard = ({ data }: any) => {
  const text: string = data[0];

  return (
    <div data-bs-spy="scroll">
      <div
        className={`card m-3 p-7 min-h-20 min-w-60 max-w-lg rounded-lg ${
          data[1] % 2 == 0
            ? "col-start-1 bg-sky-900"
            : "col-start-2 bg-zinc-900 mt-25"
        }`}
      >
        <div className="card-body">{text}</div>
      </div>
    </div>
  );
};

export default ChatCard;
