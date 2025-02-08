import React, { Suspense } from "react";

const Navbar = React.lazy(() => import("./components/Navbar"));
const Main = React.lazy(() => import("./components/Main"));

function NavbarSkeleton() {
  return (
    <div className="bg-gray-800 p-4 animate-pulse">
      <div className="w-full h-12 bg-gray-600 rounded-md"></div>
    </div>
  );
}

function MainSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="w-full h-48 bg-gray-600 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>

      <Suspense fallback={<MainSkeleton />}>
        <Main />
      </Suspense>
    </>
  );
}
