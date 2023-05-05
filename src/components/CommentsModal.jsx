import { modalAtom, postIdAtom } from "@/atom/ModalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Modal from "react-modal";
import {
  CameraIcon,
  FaceSmileIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebaseconfig";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import { useRouter } from "next/router";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalAtom);
  const postId = useRecoilValue(postIdAtom);
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const router = useRouter();

  console.log(post);

  async function sendComment() {
    if (input) {
      const commentRef = collection(db, "posts", postId, "comments");
      await addDoc(commentRef, {
        comment: input,
        name: session?.user?.name,
        username: session?.user?.username,
        userImg: session?.user.image,
        timestamp: serverTimestamp(),
      });
      setOpen(false);
      setInput("");
      router.push(`post/${postId}`);
    }
    // console.log("comment has been sent");
  }

  // console.log(postId);

  // async function fetchPostData() {
  //   console.log("fetching data");
  // }
  useEffect(() => {
    const postRef = doc(db, "posts", postId);
    const unsub = onSnapshot(postRef, (snapShot) => {
      setPost(snapShot.data());
    });
    return () => unsub();
  }, [postId]);

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] bg-white border-2 absolute left-[50%] translate-x-[-50%] top-24 rounded-xl shadow-md  border-gray-400 "
        >
          <div className="p-1">
            <div className="border-gray-200 py-2 px-1.5 border-b">
              <div
                onClick={() => setOpen(false)}
                className=" w-9 h-9 flex items-center justify-center hoverEffect"
              >
                <XMarkIcon className="text-gray-700 h-[22px]" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <div className="w-[2px]  bg-gray-300 h-[50px] absolute left-8 top-11 z-[-1]" />
              <img
                src={post?.userImg}
                alt="user-image"
                className="block rounded-full cursor-pointer h-11 w-11 hover:brightness-95"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline whitespace-nowrap truncate">
                {post?.user}
              </h4>
              <span className="sm:text-[15px] text-sm truncate">
                @{post?.username} -{" "}
              </span>
              <span className="sm:text-[15px] text-sm hover:underline truncate">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                {/* {timestamp} */}
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-base ml-16 mb-2">
              {post?.text}
            </p>
            {/* {session && ( */}
            <div className="flex p-3 space-x-3 ">
              <img
                // onClick={signOut}
                src={session.user.image}
                className="rounded-full cursor-pointer h-11 w-11 hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full text-lg tracking-wide border-none placeholder-gray-700 min-h[50px] focus:ring-0 text-gray-700 "
                    rows="2"
                    placeholder="Tweet Your Reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                {/* {selectedFile && (
              <div className="relative">
                <XMarkIcon
                  onClick={() => setSelectedFile(null)}
                  className="absolute border border-white cursor-pointer  h-9 text-black bg-white p-0 rounded-full "
                />
                <img
                  src={selectedFile}
                  className={`${loading && "animate-pulse"}`}
                  alt="upload image"
                />
              </div>
            )} */}
                <div className="flex items-center pt-2.5 justify-between">
                  {/* {!loading && ( */}
                  {/* <> */}
                  <div className="flex">
                    <div>
                      <CameraIcon className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        ref={filePickerRef}
                        onChange={addImageToPost}
                        hidden
                      /> */}
                    </div>
                    <FaceSmileIcon className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    className="px-4 text-white bg-blue-400 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50  "
                    disabled={!input.trim()}
                  >
                    Reply
                  </button>
                  {/* </> */}
                  {/* )} */}
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </Modal>
      )}
    </div>
  );
}
