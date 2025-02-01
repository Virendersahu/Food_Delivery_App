import { CDN_URL } from "../utils/constants";

// Rest card for items
const RestCardComponent = (props) => {
  // object destructing
  const { resData } = props;
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    sla: { deliveryTime },
    areaName,
  } = resData.info; // Access the restaurant info here
  return (
    <div className="w-72 border-2 rounded-xl border-solid border-gray-300 overflow-hidden bg-cyan-100 shadow-lg shadow-cyan-100/50 transition-transform bg-white-500 hover:transform-gpu">
      {
        <img
          src={CDN_URL + cloudinaryImageId}
          className="w-full h-56 object-fill"
          alt="rest-card-img"
        ></img>
      }
      <h3 className="m-2 text-center">{name}</h3>
      <h4 className="m-2 text-center">{cuisines.join(", ")}</h4>
      <h4 className="m-2 text-center">{avgRating} stars</h4>
      <h4 className="m-2 text-center">{deliveryTime} minutes</h4>
      <h4 className="m-2 text-center">{areaName} </h4>
    </div>
  );
};

export const withPromotedLabel = (RestCardComponent) => {
  return () => {
    return (
      <div>
        <label className="promoted"> promoted</label>
        <RestCardComponent />
      </div>
    );
  };
};

export default RestCardComponent;
