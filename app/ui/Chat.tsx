const Chat = ({ data }: any) => {
  const text: string = data;
  console.log("inputValue: " + text);

  return (
    <div className="card bg-zinc-900 m-3 p-5 min-h-20 max-w-lg rounded-lg">
      <div className="card-body">{text}</div>
    </div>
  );
};

export default Chat;
