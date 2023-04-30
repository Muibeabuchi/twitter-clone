import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";

export default function Feed() {
  return (
    <div className="xl:ml-[370px] border-l border-r  border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl  ">
      <div className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 bg-white border-b ">
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">Home</h2>
        <div className="flex items-center justify-center px-0 w-9 h-9 hoverEffect ">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
    </div>
  );
}
