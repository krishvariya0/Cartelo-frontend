import { Link } from "react-router";

const SecondaryNavbar = () => {
  return (
    <nav className="w-full text-white bg-gray-700 text-center shadow-md">
      <div className="max-w-7xl mx-auto flex flex-row justify-center gap-6 px-4 py-3 text-sm font-medium overflow-x-auto whitespace-nowrap">
        <Link to="/fresh" className="hover:text-gray-300 transition">Fresh</Link>
        <Link to="/todays-deals" className="hover:text-gray-300 transition">Today's Deals</Link>
        <Link to="/customer-service" className="hover:text-gray-300 transition">Customer Service</Link>
        <Link to="/buy-again" className="hover:text-gray-300 transition">Buy Again</Link>
        <Link to="/browsing-history" className="hover:text-gray-300 transition">Browsing History</Link>
        <Link to="/ebooks" className="hover:text-gray-300 transition">eBooks</Link>
        <Link to="/top-picks" className="hover:text-gray-300 transition">Brand Leader</Link>
        <Link to="/gift-cards" className="hover:text-gray-300 transition">Gift Cards</Link>
      </div>
    </nav>
  );
};

export default SecondaryNavbar;

