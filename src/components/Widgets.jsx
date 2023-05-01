import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from "./News";

export default function Widgets({ newsResults, articleNum, setArticleNum }) {
  function handleNewsResultsNum() {
    if (articleNum < newsResults.length) {
      setArticleNum((prev) => prev + 3);
    }
  }
  return (
    <div className="xl:w-[600px] lg:inline hidden ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] bg-white sticky top-0 py-1.5 z-[50]">
        <div className="relative flex items-center p-3 rounded-full">
          <MagnifyingGlassIcon className="h-5 z-[50] text-gray-500" />
          <input
            type="text"
            placeholder="Search twitter"
            className="absolute inset-0 text-gray-700 bg-gray-100 border-gray-500 rounded-full focus:shadow-lg focus:bg-white pl-11"
          />
        </div>
      </div>

      <div className="space-y-3 text-gray-700 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="px-4 text-lg font-bold ">What's Happening</h4>
        {newsResults.slice(0, articleNum).map((news) => (
          <News key={news.source?.id} {...news} />
        ))}
        <button
          onClick={handleNewsResultsNum}
          className="pb-3 pl-4 text-blue-300 hover:text-blue-400"
        >
          Show More
        </button>
      </div>
    </div>
  );
}
