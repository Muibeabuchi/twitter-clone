export default function FeedSuggestion({
  children,
  handleShowMore,
  name,
  type,
}) {
  return (
    <div
      className={`${
        type == "randomUser" && "sticky top-16"
      } space-y-3 text-gray-700 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]`}
    >
      <h4 className="px-4 text-lg font-bold ">{name}</h4>
      {children}
      <button
        onClick={handleShowMore}
        className="pb-3 pl-4 text-blue-300 hover:text-blue-400"
      >
        Show More
      </button>
    </div>
  );
}
