const Home = () => {
  const accounts = [{ name: "Main" }, { name: "Card" }, { name: "Savings" }];
  return (
    <div className="flex flex-col w-fit items-center  bg-black">
      <div className="grid w-fit grid-cols-2 gap-4 p-4 bg-gray-600">
        {accounts.map((acc) => (
          <div
            key={acc.name}
            className="flex w-20 h-20 p-2 rounded-md bg-white text-black items-center justify-center"
          >
            {acc.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
