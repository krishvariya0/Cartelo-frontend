const SecondaryNavbar = () => {
  return (
    <div className="w-full text-white bg-gray-700 text-center shadow-md">
      <div className="max-w-7xl mx-auto flex flex-row justify-center gap-6 px-4 py-3 text-sm font-medium overflow-x-auto whitespace-nowrap">

        {/* <button className="flex items-center gap-2 hover:text-gray-300 transition">
          <span className="text-xl">☰</span>
          <span>All</span>
        </button> */}

        <button className="hover:text-gray-300 transition">Fresh</button>
        <button className="hover:text-gray-300 transition">Today's Deals</button>
        <button className="hover:text-gray-300 transition">Customer Service</button>
        <button className="hover:text-gray-300 transition">Sell</button>
        <button className="hover:text-gray-300 transition">Buy Again</button>
        <button className="hover:text-gray-300 transition">Browsing History</button>
        <button className="hover:text-gray-300 transition">Kindle eBooks</button>
        <button className="hover:text-gray-300 transition">	brand leader</button>
        <button className="hover:text-gray-300 transition">Gift Ideas</button>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
