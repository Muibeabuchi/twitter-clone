export default function News({ url, title, urlToImage, source }) {
  return (
    <a href={url} target="_blank">
      <div className="flex items-center justify-center px-4 py-2 space-x-1 transition duration-200 hover:bg-gray-200">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold ">{title}</h6>
          <p className="text-xs font-medium text-gray-500">{source?.name}</p>
        </div>
        <img src={urlToImage} width="70" className=" rounded-xl" />
      </div>
    </a>
  );
}
