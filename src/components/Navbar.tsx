export default function Navbar() {
    return (
      <div className="flex justify-between items-center w-full bg-[#010409]/80 backdrop-blur-md shadow-lg px-6 py-3 border-b border-gray-800" onClick={() => window.location.reload()}>
        <div className="text-3xl font-bold text-[#f0f6dd] tracking-wide transition-all duration-300 hover:text-[#58a6ff] hover:scale-105">
          Git<span className="text-[#58a6ff]">seek</span>
        </div>
      </div>
    );
  }
  