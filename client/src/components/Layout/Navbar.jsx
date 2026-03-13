import React from 'react';

const Navbar = ({ userAvatar = "https://avatar.iran.liara.run/public/30" }) => (
  <nav className="flex items-center justify-between gap-4 sticky top-0 bg-[#0a0a0a]/95 z-50 py-3 px-6 border-b border-zinc-900 mb-8">
    {/* Left: Logo & Links */}
    <div className="flex items-center gap-6">
      <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl cursor-pointer">
        A
      </div>
      <div className="hidden md:flex gap-2">
        <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm">Home</button>
        <button className="text-zinc-300 hover:bg-zinc-800 px-6 py-2.5 rounded-full font-bold text-sm transition">Explore</button>
        <button className="text-zinc-300 hover:bg-zinc-800 px-6 py-2.5 rounded-full font-bold text-sm transition">Create</button>
      </div>
    </div>

    {/* Center: Search */}
    <div className="flex-1 max-w-2xl relative">
      <input 
        type="text" 
        placeholder="Search for African art, fashion, culture..." 
        className="w-full bg-zinc-900 border-none rounded-full py-3 px-12 text-sm focus:ring-2 focus:ring-orange-500 placeholder:text-zinc-500"
      />
      <span className="absolute left-4 top-3 text-zinc-500">🔍</span>
    </div>

    {/* Right: Actions & User */}
    <div className="flex items-center gap-2 md:gap-4">
      <button className="p-2.5 hover:bg-zinc-800 rounded-full text-xl text-zinc-300">🔔</button>
      <button className="p-2.5 hover:bg-zinc-800 rounded-full text-xl text-zinc-300">💬</button>
      <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden border border-zinc-800 cursor-pointer">
         <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
  </nav>
);

export default Navbar;