import ItemsList from "./ItemsList";

const RestaurantCategory = ({ data, isAccordionOpen, setActiveIndex }) => {
  // const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // state lifting concept:
  const handleToggle = () => {
    setActiveIndex();
  };

  return (
    <div className="max-w-4xl mx-auto m-8 p-6 bg-white shadow-lg rounded-lg">
      <div
        className="flex justify-between text-xl font-bold text-gray-800 cursor-pointer"
        onClick={handleToggle}
      >
        <span>
          {data.title} ({data.itemCards.length})
        </span>
        <span>{isAccordionOpen ? "🔼" : "🔽"}</span>
      </div>
      {/* Accordion Content: Items List */}
      {isAccordionOpen &&
        data.itemCards.map((item) => (
          <ItemsList key={item?.card?.info?.id} data={item?.card?.info} />
        ))}
    </div>
  );
};

export default RestaurantCategory;
