import { CDN_URL } from "../utils/constants";

const ItemsList = ({ data }) => {
  return (
    <div className="flex items-start p-4 border-b border-gray-200">
      {/* Left Section: Details */}
      <div className="w-9/12">
        {/* Title */}
        <div className="text-lg font-semibold text-gray-800">{data?.name}</div>

        {/* Price and Ratings */}
        <div className="flex items-center space-x-2 mt-1">
          <div className="text-sm text-gray-600">₹{data?.defaultPrice}</div>
          {data?.ratings?.aggregatedRating?.rating && (
            <div className="flex items-center text-xs text-white bg-green-500 px-2 py-1 rounded-full">
              <span>{data?.ratings?.aggregatedRating?.rating} ★</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="text-sm text-gray-500 mt-2">{data?.description}</div>
      </div>

      {/* Right Section: Image and Button */}
      <div className="w-3/12 flex flex-col items-center">
        <img
          src={CDN_URL + data?.imageId}
          className="w-24 h-24 object-cover rounded-lg mb-2"
          alt="rest-card-img"
        />
        <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">
          ADD
        </button>
        <span className="text-xs text-gray-400 mt-1">Customizable</span>
      </div>
    </div>
  );
};

export default ItemsList;
