import React, { useEffect, useState } from "react";
import RestCardComponent, { withPromotedLabel } from "./RestCard"; // Assuming this component renders restaurant data
// import dataList from "../utils/mockData"; // Importing mock data if needed
import Shimmer from "./Shimmer"; // Shimmer component for loading state
import { Link } from "react-router-dom";

const BodyComponent = () => {
  // State variables for restaurants list, filtered restaurants list, and search input value
  const [restaurants, setRestaurants] = useState([]); // Initial state for restaurants list
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State for filtered restaurants
  const [inputValue, setInputValue] = useState(""); // State for input field value

  const promotedRestaurants = withPromotedLabel(restaurants); // Promoted restaurant

  // useEffect to fetch data when component mounts
  // in UseEffect function after the render the page what we want to do next that will mention here.
  // load --> render(fake UI) --> API Call --> Re-render(updated UI)
  // In useeffect function we make the api call
  useEffect(() => {
    fetchData(); // Call the fetchData function on component mount
  }, []); // Empty dependency array means this effect runs once after the initial render.

  // Function to fetch data from Swiggy API
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      ); // Fetch data from Swiggy API endpoint
      const jsonData = await data.json(); // Convert response to JSON format
      // Set initial restaurants and filtered restaurants state with fetched data
      setRestaurants(
        jsonData?.data.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
      setFilteredRestaurants(
        jsonData?.data.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
      console.log("Fetch");
    } catch (error) {
      console.error("Error fetching data:", error); // Log error if fetch fails
    }
  };

  // Function to filter restaurants with average rating >= 4.2
  const filterTopRatedRestaurants = () => {
    const filteredList = restaurants.filter((res) => res.info.avgRating >= 4.2); // Filter restaurants based on avgRating
    setFilteredRestaurants(filteredList); // Update filteredRestaurants state with filtered list
  };

  // Function to reset filtered restaurants to original list
  const resetFilter = () => {
    setFilteredRestaurants(restaurants); // Reset filteredRestaurants to original restaurants list
  };

  // Conditional rendering for shimmer loading effect when restaurants are not loaded(fake UI for better user experience)
  if (restaurants.length === 0) {
    return <Shimmer />; // Render shimmer loading component if restaurants are empty
  }
  // Render component with restaurants data
  return (
    <div className="body-container px-5 py-3 mx-10 my-5 w-full">
      {/* Search bar for filtering restaurants by name */}
      <div className="search flex justify-center items-center gap-5">
        <input
          type="text"
          className="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Handle input value change
          placeholder="Search by restaurant name..."
        />
        <button
          type="button"
          className="Search text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            // Filter restaurants by name based on input value
            const filteredList = restaurants.filter((res) =>
              res.info.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredRestaurants(filteredList); // Update filteredRestaurants state with filtered list
          }}
        >
          Search
        </button>
      </div>

      {/* Filter buttons for top rated restaurants and reset filter */}
      <div className="filter gap-3 flex p-3 m-3">
        <button
          className="filter-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={filterTopRatedRestaurants}
        >
          Top Rated Restaurants
        </button>
        <button
          className="filter-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={resetFilter}
        >
          Reset Filter
        </button>
      </div>

      {/* Container to render restaurant cards */}
      <div className="flex flex-wrap justify-center p-20 gap-20">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <promotedRestaurants resData={restaurant} />
            ) : (
              <RestCardComponent
                key={restaurant.info.id}  // Unique key for each restaurant card
                resData={restaurant} // Pass restaurant data as props to RestCardComponent
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BodyComponent;
