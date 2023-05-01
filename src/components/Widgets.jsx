import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Widgets() {
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
    </div>
  );
}
