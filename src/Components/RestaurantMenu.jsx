import React, { useEffect, useState } from "react";
import { RiMenuFold2Line } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import { RESTAURANT_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchRestaurantinfo = async () => {
      try {
        const response = await fetch(RESTAURANT_URL + resId);
        const json = await response.json();
        setResInfo(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRestaurantinfo();
  }, [resId]); // Include resId since it is used inside the effect

  // Render null while waiting for data
  if (!resInfo) {
    return <div>Loading...</div>;
  }

  // Safely access nested properties
  const restaurant = resInfo?.cards?.[2]?.card?.card?.info;
  const restaurantCategory =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (items) => {
        return (
          items.card?.["card"]?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      }
    );

  console.log(restaurantCategory);

  // UI Part -1
  return (
    <>
      <div className="max-w-4xl mx-auto m-8 p-4 bg-white shadow-lg rounded-lg relative">
        {/* Gradient Border Wrapper */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white via-[#ebebf2] to-[#dfdfe7] z-0"></div>

        {/* Main Content */}
        <div className="relative z-10 bg-white .rounded-lg p-3">
          {/* Restaurant Name */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {restaurant?.name}
          </h1>

          {/* Ratings and Cost */}
          <div className="flex items-center text-gray-600 text-xl mb-3">
            <span className="flex items-center bg-green-100 text-green-800 px-4 py-1 rounded-full">
              {restaurant?.avgRating || "N/A"} ★
            </span>
            <span className="mx-4">•</span>
            <span>{restaurant?.costForTwo || "N/A"} for two</span>
          </div>

          {/* Cuisines */}
          <p className="text-lg text-gray-700 mb-2">
            {restaurant?.cuisines?.join(", ") || "No cuisines available"}
          </p>

          {/* Outlet and Location */}
          <div className="text-lg text-gray-500 mb-2">
            <span className="font-medium">Outlet:</span>{" "}
            {restaurant?.areaName || "Unknown"}
          </div>

          {/* Delivery Time */}
          <div className="text-lg text-gray-500">
            <span className="font-medium">Delivery Time:</span>{" "}
            {restaurant?.sla?.slaString || "N/A"}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 my-6 py-4 border-t border-gray-300">
        {/* Left Icon */}
        <RiMenuFold2Line className="text-gray-600 text-xl" />

        {/* Menu Text */}
        <div className="text-center text-lg font-medium text-gray-800 uppercase tracking-wide">
          Menu
        </div>

        {/* Right Icon */}
        <RiMenuFoldLine className="text-gray-600 text-xl transform rotate-180" />
      </div>

      <div className="flex justify-center items-center w-full my-4">
        <div className="relative max-w-4xl w-full">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for dishes"
            className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {/* Search Icon */}
          <IoIosSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>

      {/* Accordion */}
      {restaurantCategory.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          isAccordionOpen={index === activeIndex ? true : false}
          /* passing the state to child component as props and whenever they click on accordion the index is set to setActiveInde */
          setActiveIndex={() => setActiveIndex(index)}
        />
      ))}
    </>
  );
};

export default RestaurantMenu;
