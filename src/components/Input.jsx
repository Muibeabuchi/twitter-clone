import { useSession, signOut } from "next-auth/react";
import { CameraIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "@/firebaseconfig";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      // console.log(readerEvent.target.result);
      setSelectedFile(readerEvent.target.result);
    };
  };
  const addPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      text: input,
      id: session.user.uid,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      username: session.user.username,
      user: session.user.name,
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      // console.log("uploading image...");
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      });
    }
    setInput("");
    setLoading(false);
    setSelectedFile(null);
  };
  // console.log(session);
  return (
    <>
      {session && (
        <div className="flex p-3 space-x-3 border-b border-gray-200">
          <img
          
            src={session.user.image}
            className="rounded-full cursor-pointer h-11 w-11 hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full text-lg tracking-wide border-none placeholder-gray-700 min-h[50px] focus:ring-0 text-gray-700 "
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
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
            )}
            <div className="flex items-center pt-2.5 justify-between">
              {!loading && (
                <>
                  <div className="flex">
                    <div onClick={() => filePickerRef.current.click()}>
                      <CameraIcon className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        ref={filePickerRef}
                        onChange={addImageToPost}
                        hidden
                      />
                    </div>
                    <FaceSmileIcon className="w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={addPost}
                    className="px-4 text-white bg-blue-400 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50  "
                    disabled={!input.trim()}
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
