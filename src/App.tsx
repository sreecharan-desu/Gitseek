import React, { Suspense } from 'react'

const Navbar = React.lazy(()=>import('./components/Navbar'))
const Main = React.lazy(()=>import('./components/Main'))
function App() {
  return (
    <>
      <Suspense fallback={<>Loading navbar...</>}><Navbar/></Suspense>
      <Suspense fallback={<>Loading main...</>}><Main/></Suspense>s
    </>
  )
}

export default App
