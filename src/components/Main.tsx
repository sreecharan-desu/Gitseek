import { useRecoilValue } from "recoil";
import Search from "./searchbar";
import { usersAtom } from "../store";
import React, { Suspense, useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion"; // For animations

const UserCard = React.lazy(() => import("./userCard"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPage = ({ onSearchClick }:any ) => (
  <div className="flex flex-col items-center justify-center h-screen p-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-xl shadow-lg">
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#10b981]">
        Welcome to GitSeek!
      </h1>
      <p className="text-xl mb-6 text-gray-300">
        The platform to discover developers, projects, and open-source collaborators.
      </p>
    </motion.div>

    <motion.div
      className="bg-[#1e293b] p-6 rounded-lg shadow-md mb-6"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg text-gray-300">
        No users to display right now, but we have a world of developers waiting for you to find them!
      </p>
    </motion.div>

    <motion.div
      className="mt-8 text-center text-gray-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <p className="text-lg mb-4">
        Discover new developers, contributors, or repositories. Start your journey below!
      </p>
      <button
        className="py-2 px-6 bg-gradient-to-r from-[#f59e0b] to-[#10b981] rounded-full text-white text-lg shadow-md transform hover:scale-105 transition-all duration-200"
        onClick={onSearchClick}
      >
        Start Searching Now
      </button>
    </motion.div>

    <motion.div
      className="mt-6 text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <p>Find your next coding collaborator, or explore open-source repositories!</p>
    </motion.div>
  </div>
);

export default function Main() {
  const users = useRecoilValue(usersAtom);
  const [usersLength, setUsersLength] = useState(0);

  useEffect(() => {
    if (users) {
      setUsersLength(users.length);
    }
  }, [users]);

  return (
    <div className="m-4 p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl shadow-lg">
      {usersLength > 0 ? (
        <>
          <Search />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div className="flex flex-center justify-items-center place-content-center" key={user.id}>
                <Suspense
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
              </div>
            ))}
          </div>
        </>
      ) : (
        <LandingPage onSearchClick={() => setUsersLength(1)} />
      )}
    </div>
  );
}
