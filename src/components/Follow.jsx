export default function Follow({ picture: { thumbnail }, login, name }) {
  return (
    <div className="flex items-center  px-4 py-2 cursor-pointer hover:bg-gray-200">
      <img
        src={thumbnail}
        width="40"
        className="rounded-full"
        alt="random-user profilepic"
      />
      <div className="truncate ml-4 leading-5 ">
        <h4 className="font-bold text-sm truncate hover:underline">
          {login?.username}
        </h4>
        <h5 className="text-[13px] text-gray-500 truncate">{name?.first + "" + name?.last}</h5>
      </div>
      <button className="ml-auto bg-black text-white rounded-full font-bold px-3.5 py-1.5 text-sm">
        Follow
      </button>
    </div>
  );
}
