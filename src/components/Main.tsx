import { useRecoilValue } from "recoil";
import Search from "./searchbar";
import { usersAtom } from "../store";
import React, { Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";

const UserCard = React.lazy(() => import("./userCard"));

export default function Main() {
  const users = useRecoilValue(usersAtom);

  return (
    <div className="m-4 p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl shadow-lg">
      <Search />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users && users.length > 0 ? (
          users.map((user) => (<div className="flex flex-center justify-items-center place-content-center" key={user.id}>
            <Suspense
              key={user.id}
              fallback={
                <div className="flex flex-col items-center space-y-4 p-6 bg-gray-800/50 rounded-lg animate-pulse shadow-xl">
                  {/* Custom Skeleton */}
                  <div className="w-24 h-24 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded-md"></div>
                  <div className="h-3 w-24 bg-gray-700 rounded-md"></div>
                  <div className="h-3 w-16 bg-gray-700 rounded-md"></div>
                </div>
              }
            >
              <UserCard user={user} accessToken={""} />
            </Suspense>
          </div>))
        ) : (
          <div className="text-center text-lg text-gray-400">
            {users === null ? "Loading users..." : "No users found"}
          </div>
        )}
      </div>
    </div>
  );
}
