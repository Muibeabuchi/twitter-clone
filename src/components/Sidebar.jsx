import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BookmarkIcon,
  BellIcon,
  InboxIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <aside className="fixed hidden h-full p-2 xl:items-start sm:flex sm:flex-col xl:ml-24">
      {/* twitter logo */}
      <div className="p-0 hoverEffect hover:bg-blue-100 xl:px-1">
        <Image
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          width="50"
          height="50"
          alt="twitter-logo"
        />
      </div>
      {/* menu */}
      <div className="mt-4 mb-2 xl:items-start">
        <SideBarMenuItem text="Home" Icon={HomeIcon} active="active" />
        <SideBarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SideBarMenuItem text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem text="Bookmark" Icon={BookmarkIcon} />
            <SideBarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SideBarMenuItem text="Profile" Icon={UserIcon} />
            <SideBarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>

      {/* button */}
      {!session ? (
        <button
          onClick={signIn}
          className="hidden w-36 h-12 text-lg font-bold text-white bg-blue-400 rounded-full shadow-md xl:inline hover:brightness-95 "
        >
          SignIn
        </button>
      ) : (
        <>
          <button className="hidden w-56 h-12 text-lg font-bold text-white bg-blue-400 rounded-full shadow-md xl:inline hover:brightness-95 ">
            Tweet
          </button>

          {/* mini-profile */}
          <div className="flex items-center justify-center mt-auto text-gray-700 hoverEffect xl:justify-start">
            <img
            onClick={signOut}
              src={session.user.image}
              alt="user-image"
              height={40}
              width={40}
              className="rounded-full xl:mr-2"
            />
            <div className="hidden leading-5 xl:inline">
              <h4 className="truncate font-bold">{session.user.name}</h4>
              <p>@{session.user.username}</p>
            </div>
            <EllipsisHorizontalIcon className="hidden h-7 xl:ml-8 xl:inline" />
          </div>
        </>
      )}
    </aside>
  );
}
