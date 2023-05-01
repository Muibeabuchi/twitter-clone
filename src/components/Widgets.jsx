import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from "./News";
import FeedSuggestion from "./FeedSuggestion";
import Follow from "./Follow";
import { useState } from "react";

export default function Widgets({
  followResult,
  newsResults,
  articleNum,
  setArticleNum,
}) {
  const [randomUserNumber, setRandomUserNumber] = useState(3);
  function handleNewsResultsNum() {
    if (articleNum < newsResults.length) {
      setArticleNum((prev) => prev + 3);
    }
  }
  function handleRandomUserNum() {
    if (randomUserNumber < followResult.length) {
      setRandomUserNumber((prev) => prev + 3);
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

      <FeedSuggestion
        name={"Whats Happening"}
        handleShowMore={handleNewsResultsNum}
      >
        {newsResults.slice(0, articleNum).map((news) => (
          <News key={news.title} {...news} />
        ))}
      </FeedSuggestion>

      <FeedSuggestion
        type="randomUser"
        name={"Who to Follow"}
        handleShowMore={handleRandomUserNum}
      >
        {followResult.slice(0, randomUserNumber).map((follow) => (
          <Follow key={follow.login.username} {...follow} />
        ))}
      </FeedSuggestion>
    </div>
  );
}
