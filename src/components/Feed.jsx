import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Jhoe Daniel",
      username: "Jhoedaniel",
      userimg:
        "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png",
      img: "https://media.istockphoto.com/id/1350384978/photo/autumn-in-alps-hochk%C3%B6nig-mountain-in-austria.jpg?s=612x612&w=0&k=20&c=Wysit8uWNwdWCRIOBuhxla5EBRM_-JeCCFOQhK4qzsg=",
      text: "GREAT VIEW AND A HAPPY SUNDAY!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Jhoe Daniel",
      username: "Jhoedaniel",
      userimg:
        "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png",
      img: "https://media.istockphoto.com/id/480975754/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=g0FV3fbVGrbKMYH6XIuYp9im_j3fAIe-0CCJhNrGl9U=",
      text: "JUST CAN NOT GET ENOUGH",
      timestamp: "30 min ago",
    },
  ];
  const POSTS = posts.map((post) => <Post key={post.id} {...post} />);
  return (
    <div className="xl:ml-[370px] border-l border-r  border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl  ">
      <div className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 bg-white border-b ">
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">Home</h2>
        <div className="flex items-center justify-center px-0 w-9 h-9 hoverEffect ">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {POSTS}
    </div>
  );
}
