import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebaseconfig";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";

export default function Post({
  // id,
  // timestamp,
  // name,
  // username,
  // userImg,
  // image,
  // text,
  id,
  post,
}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  async function likePost() {
    if (!session) {
      signIn();
    }
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
        username: session.user.username,
      });
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts", id, "likes"),
      (querySnapshot) => {
        // console.log(querySnapshot.docs.data());
        // setLikes([querySnapshot.data()]);
        setLikes(
          querySnapshot?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
    // console.log(likes);

    return () => unsub();
  }, [session?.user?.uid, id, db]);

  useEffect(() => {
    if (likes && likes.length > 0) {
      const myLike = likes.find((like) => like?.id == session?.user?.uid);
      // console.log(myLike);
      if (myLike) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
      // const myLike = likes.findIndex(
      //   (index) => index == session?.user?.username
      // );
      // setHasLiked(myLike !== -1);
    } else {
      setHasLiked(false);
    }
  }, [likes]);

  async function deletePost() {
    const postRef = doc(db, "posts", id);
    if (window.confirm("are you sure you want to delete this post?")) {
      try {
        await deleteDoc(postRef);
        if (post?.image) {
          await deleteObject(ref(storage, `posts/${id}/image`));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // console.log(hasLiked);

  return (
    <div className="flex p-3 border-b border-gray-200 cursor-pointer">
      <div className="mr-4 min-w-[50px] ">
        <img
          src={post?.userImg}
          alt="user-image"
          className="block rounded-full cursor-pointer h-11 w-11 hover:brightness-95"
        />
      </div>
      <div className="">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.name}
              </h4>
              <span className="sm:text-[15px] text-sm">
                @{post?.username} -{" "}
              </span>
              <span className="sm:text-[15px] text-sm hover:underline">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                {/* {timestamp} */}
              </span>
            </div>
            <EllipsisHorizontalIcon className="w-10 h-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 xl:ml-8 xl:inline" />
          </div>
          {/* post-text */}
          <p className="text-gray-800 text-[15px] sm:text-base mb-2 ">
            {post?.text}
          </p>
          {/* post-image */}
          {post?.image && (
            <img
              src={post?.image}
              alt="post-image"
              className="mr-2 rounded-2xl"
            />
          )}
          {/* icons */}
          <div className="flex items-center justify-between p-2 text-gray-500">
            <ChatBubbleOvalLeftEllipsisIcon className="p-2  h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
            {session?.user?.uid === post?.id && (
              <TrashIcon
                onClick={deletePost}
                className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"
              />
            )}
            <div className="flex space-x-1 items-center">
              {hasLiked ? (
                <SolidHeartIcon
                  onClick={likePost}
                  className="p-2 h-9 w-9 hoverEffect text-red-600 hover:bg-red-100"
                />
              ) : (
                <HeartIcon
                  onClick={likePost}
                  className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"
                />
              )}
              {likes?.length > 0 && (
                <span
                  className={`${
                    hasLiked && "text-red-600"
                  } text-sm select-none`}
                >
                  {likes.length}
                </span>
              )}
            </div>
            <ShareIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
            <ChartBarIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
