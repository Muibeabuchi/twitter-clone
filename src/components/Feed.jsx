import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";
import { db } from "@/firebaseconfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, post: doc.data() });
      });
      console.log(posts);
      setPosts(posts);
    });
    // console.log(posts);

    return () => unsub();
  }, []);
  if (!posts) {
    return <p>LOADING....</p>;
  }
  const POSTS = posts.map((item, index) => <Post key={index} {...item} />);
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
