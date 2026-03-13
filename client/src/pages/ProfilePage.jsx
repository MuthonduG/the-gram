import React from 'react';
import Navbar from '../components/Layout/Navbar';
import ContentCard from '../components/ui/card';

const ProfilePage = () => {
  // 💾 Mock data representing the 6 gallery pins
  const pinsData = [
    { id: 1, title: 'Crown braid study', img: 'https://picsum.photos/400/500?s=1', aspect: 'tall' },
    { id: 2, title: 'Editorial silhouettes', img: 'https://picsum.photos/400/800?s=2', aspect: 'extra-tall' },
    { id: 3, title: 'Calm interior mood', img: 'https://picsum.photos/400/600?s=3', aspect: 'tall' },
    { id: 4, title: 'Evening market scenes', img: 'https://picsum.photos/400/350?s=4', aspect: 'square' },
    { id: 5, title: 'Bold architecture', img: 'https://picsum.photos/400/350?s=5', aspect: 'square' },
    { id: 6, title: 'Bead detail board', img: 'https://picsum.photos/400/350?s=6', aspect: 'square' },
    { id: 7, title: 'Hair and gold references', img: 'https://picsum.photos/400/700?s=7', aspect: 'tall' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* 🟢 Reusable Navbar is now here! */}
      <Navbar userAvatar="https://i.pravatar.cc/150?u=amina" />

      {/* Main Content Area */}
      <main className="max-w-[1700px] mx-auto p-6 md:p-8">
        {/* 👤 Profile Header Section */}
        <section className="text-center mb-16 flex flex-col items-center">
          <img 
            src="https://i.pravatar.cc/300?u=amina" 
            alt="Amina N." 
            className="w-32 h-32 rounded-full border-4 border-zinc-900 mb-6 object-cover shadow-2xl"
          />
          <h1 className="text-5xl font-extrabold tracking-tight mb-2">Amina N.</h1>
          <p className="text-zinc-500 text-lg mb-6 font-medium">@amina.afriq</p>
          <p className="max-w-2xl text-zinc-300 leading-relaxed mb-8">
            Curating African interiors, fashion editorials, architecture, braiding inspiration, and everyday cultural moments across the continent.
          </p>

          {/* Followers Stats */}
          <div className="flex gap-10 mb-8 border border-zinc-800 rounded-full px-10 py-5 bg-zinc-950/50">
            {[ { label: 'followers', num: 248 }, { label: 'following', num: 81 }, { label: 'pins', num: 126 } ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold">{stat.num}</p>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-12">
            <button className="bg-zinc-800 hover:bg-zinc-700 font-semibold px-8 py-3 rounded-full text-sm">Share</button>
            <button className="bg-white text-black hover:bg-zinc-100 font-extrabold px-8 py-3 rounded-full text-sm">Edit profile</button>
            <button className="bg-zinc-800 hover:bg-zinc-700 font-semibold px-8 py-3 rounded-full text-sm">New board</button>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-4 border-t border-zinc-900 pt-8 w-full justify-center">
            {['Created', 'Saved', 'Boards'].map((tab, i) => (
              <button 
                key={tab} 
                className={`px-8 py-3 rounded-full text-sm font-semibold transition ${i === 0 ? 'bg-zinc-900' : 'text-zinc-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* 🖼️ Grid Layout (Sidebar | Gallery | Sidebar) */}
        <section className="grid grid-cols-[1fr,3fr,1fr] gap-x-12 items-start">
            {/* Column 1: A subset of pins (or empty to push gallery) */}
            <div className="space-y-6">
                <ContentCard data={pinsData[0]} />
                <ContentCard data={pinsData[2]} />
            </div>

            {/* Column 2: The Main Center Column (Tall Gallery) */}
            <div className="grid grid-cols-2 gap-x-6 items-start">
                <div className="space-y-6">
                    <ContentCard data={pinsData[1]} />
                    <ContentCard data={pinsData[5]} />
                </div>
                <div className="space-y-6">
                    <ContentCard data={pinsData[3]} />
                    <ContentCard data={pinsData[4]} />
                    <ContentCard data={pinsData[6]} />
                </div>
            </div>

            {/* Column 3: "Boards" and "About" Sidebars */}
            <aside className="space-y-8">
                {/* Boards Box */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-7">
                <h2 className="text-2xl font-bold mb-6 tracking-tight">Boards</h2>
                <div className="space-y-5">
                    {[ 
                    { title: 'Hair References', pins: 34, icon: 'https://i.pravatar.cc/100?u=amina-b1' }, 
                    { title: 'Interior Mood', pins: 22, icon: 'https://picsum.photos/80?s=1' }, 
                    { title: 'Architecture', pins: 18, icon: 'https://picsum.photos/80?s=2' }
                    ].map((board) => (
                    <button key={board.title} className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-900 rounded-2xl transition">
                        <div className="flex items-center gap-4">
                        <img src={board.icon} alt={board.title} className="w-16 h-16 rounded-xl object-cover"/>
                        <div>
                            <p className="font-semibold text-sm">{board.title}</p>
                            <p className="text-xs text-zinc-500">{board.pins} pins</p>
                        </div>
                        </div>
                        <span className="text-zinc-600">→</span>
                    </button>
                    ))}
                </div>
                </div>

                {/* About Box */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-7">
                <h2 className="text-2xl font-bold mb-6 tracking-tight">About</h2>
                <div className="space-y-5 text-zinc-400 text-sm">
                    <div className="flex items-center gap-4"><span className="text-lg">📍</span><p>Accra, Ghana</p></div>
                    <div className="flex items-center gap-4"><span className="text-lg">🔗</span><a href="#" className="hover:text-white">afriq.app/amina</a></div>
                    <div className="flex items-center gap-4"><span className="text-lg">🗓️</span><p>Joined February 2025</p></div>
                </div>
                </div>
            </aside>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;