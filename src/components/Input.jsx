import Image from "next/image";
import { CameraIcon, FaceSmileIcon } from "@heroicons/react/24/outline";

export default function Input() {
  return (
    <div className="flex p-3 space-x-3 border-b border-gray-200">
      <img
        src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
        alt="user-image"
        className="rounded-full cursor-pointer h-11 w-11 hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full text-lg tracking-wide border-none placeholder-gray-700 min-h[50px] focus:ring-0 text-gray-700 "
            rows="2"
            placeholder="What's happening?"
          ></textarea>
        </div>
        <div className="flex items-center pt-2.5 justify-between">
          <div className="flex">
            <CameraIcon className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100" />
            <FaceSmileIcon className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100" />
          </div>
          <button
            className="px-4 text-white bg-blue-400 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50  "
            disabled
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
