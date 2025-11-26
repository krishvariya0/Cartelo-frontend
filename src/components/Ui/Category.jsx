import { useState } from "react";
import { Link } from "react-router";

function Category() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "src/assets/category/Electronics.png",
      description: "Latest gadgets and tech essentials",
      badge: "Trending",
      link: "/electronics",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Fashion",
      image: "src/assets/category/fashion.png",
      description: "Stylish clothing and accessories",
      badge: "Sale",
      link: "/fashion",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 3,
      name: "Home & Garden",
      image: "src/assets/category/home&gardan.png",
      description: "Everything for your home",
      badge: "New",
      link: "/homegarden",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      name: "Sports",
      image: "src/assets/category/Sports.png",
      description: "Sports gear and equipment",
      badge: "Popular",
      link: "/sports",
      color: "from-orange-500 to-orange-600"
    },
  ];

  const badgeColors = {
    "Trending": "bg-yellow-400",
    "Sale": "bg-red-400",
    "New": "bg-green-400",
    "Popular": "bg-purple-400"
  };

  return (
    <div className="w-full py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {/* <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Explore our wide range of products across different categories
          </p>
        </div> */}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <div className="relative bg-white rounded-lg overflow-hidden shadow-md  h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 sm:h-56 md:h-64 bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover "
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-black opacity-0 "></div>

                  {/* Badge */}
                  <span className={`absolute top-3 right-3 ${badgeColors[category.badge]} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                    {category.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  {/* Category Name */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                    {category.description}
                  </p>

                  {/* Button */}
                  <button className={`w-full bg-gradient-to-r ${category.color} text-white font-semibold py-2 md:py-3 rounded-lg transition-all duration-300 transform group-hover:shadow-lg flex items-center justify-center gap-2 text-sm md:text-base`}>
                    Shop Now
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>


              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-10 md:mt-14">
          <Link
            to="/fresh"
            className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl gap-2"
          >
            View All Categories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
