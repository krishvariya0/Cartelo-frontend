import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const SecondaryNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const navRef = useRef(null);

  const allNavItems = [
    { to: "/fresh", label: "Fresh" },
    { to: "/todays-deals", label: "Today's Deals" },
    { to: "/customer-service", label: "Customer Service" },
    { to: "/buy-again", label: "Buy Again" },
    { to: "/browsing-history", label: "Browsing History" },
    { to: "/ebooks", label: "eBooks" },
    { to: "/top-picks", label: "Brand Leader" },
    { to: "/gift-cards", label: "Gift Cards" },
  ];

  // Calculate visible items based on container width
  useEffect(() => {
    const updateVisibleItems = () => {
      if (navRef.current && window.innerWidth < 768) {
        const containerWidth = navRef.current.offsetWidth;
        const itemWidth = 120; // Approximate width per item
        const maxVisibleItems = Math.floor((containerWidth - 60) / itemWidth); // Reserve space for menu button
        
        setVisibleItems(allNavItems.slice(0, maxVisibleItems));
        setHiddenItems(allNavItems.slice(maxVisibleItems));
      } else {
        setVisibleItems(allNavItems);
        setHiddenItems([]);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full text-white bg-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Desktop & Mobile Hybrid Navigation */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Navigation Items */}
          <div 
            ref={navRef}
            className="flex flex-1 overflow-x-auto scrollbar-hide gap-4 md:gap-6 md:justify-center"
          >
            {/* Always visible items */}
            {visibleItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-gray-300 transition-colors duration-200 whitespace-nowrap text-sm font-medium min-w-max"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* More Button for Mobile */}
          {hiddenItems.length > 0 && (
            <div className="md:hidden ml-4 relative">
              <button
              
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
                aria-label="More menu items"
              >
                <span className="text-sm font-medium mr-1">More</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">
                  <div className="py-2">
                    {hiddenItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default SecondaryNavbar;