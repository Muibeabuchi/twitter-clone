import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";

export default function Post({
  id,
  timestamp,
  name,
  username,
  userImg,
  image,
  text,
}) {
  return (
    <div className="flex p-3 border-b border-gray-200 cursor-pointer">
      <div className="mr-4 min-w-[50px] ">
        <img
          src={userImg}
          alt="user-image"
          className="block rounded-full cursor-pointer h-11 w-11 hover:brightness-95"
        />
      </div>
      <div className="">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {name}
              </h4>
              <span className="sm:text-[15px] text-sm">@{username} - </span>
              <span className="sm:text-[15px] text-sm hover:underline">
                <Moment fromNow>{timestamp?.toDate()}</Moment>
                {/* {timestamp} */}
              </span>
            </div>
            <EllipsisHorizontalIcon className="w-10 h-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 xl:ml-8 xl:inline" />
          </div>
          {/* post-text */}
          <p className="text-gray-800 text-[15px] sm:text-base mb-2 ">{text}</p>
          {/* post-image */}
          {image && (
            <img src={image} alt="post-image" className="mr-2 rounded-2xl" />
          )}
          {/* icons */}
          <div className="flex items-center justify-between p-2 text-gray-500">
            <ChatBubbleOvalLeftEllipsisIcon className="p-2  h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
            <TrashIcon className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100" />
            <HeartIcon className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100" />
            <ShareIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
            <ChartBarIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
