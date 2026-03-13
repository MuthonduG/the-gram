import React, { useState } from 'react';

// --- Reusable Sub-Components ---

// 1. Primary Button (Solid Orange)
const PrimaryButton = ({ label, onClick, type = "button" }) => (
  <button 
    type={type}
    onClick={onClick}
    className="w-full bg-[#ff7b57] hover:bg-[#e96e4c] text-black font-bold py-3.5 px-4 rounded-full text-sm transition-colors duration-200"
  >
    {label}
  </button>
);

// 2. Input Field
const InputField = ({ label, type = "text", placeholder }) => (
  <div className="w-full mb-5">
    <label className="block text-white text-xs font-semibold mb-2 ml-1">
      {label}
    </label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-black/40 text-white placeholder:text-zinc-600 border border-zinc-800 focus:border-[#ff7b57] focus:ring-1 focus:ring-[#ff7b57] rounded-full py-3 px-6 text-sm outline-none transition"
    />
  </div>
);

// 3. Social Button (Outline with Icon)
const SocialButton = ({ label, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full bg-transparent hover:bg-zinc-900 text-white border border-zinc-800 rounded-full py-3.5 px-4 flex items-center justify-center gap-3 text-sm transition-colors duration-200"
  >
    <span className="text-lg">{icon}</span>
    {label}
  </button>
);

// 4. Auth Header (Title and Subtitle)
const AuthHeader = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <div className="bg-[#ff7b57] w-14 h-14 rounded-full flex items-center justify-center font-bold text-3xl mb-5 mx-auto text-black">
      A
    </div>
    <h1 className="text-3xl font-extrabold text-white mb-2">{title}</h1>
    <p className="text-zinc-400 text-sm font-medium">{subtitle}</p>
  </div>
);

// 5. Section Divider ("OR")
const Divider = () => (
  <div className="relative flex items-center w-full my-8">
    <div className="flex-grow border-t border-zinc-800"></div>
    <span className="flex-shrink mx-4 text-xs font-bold text-zinc-500">OR</span>
    <div className="flex-grow border-t border-zinc-800"></div>
  </div>
);

// --- MAIN COMPONENT ---

const AuthPage = () => {
  // 💡 State to track whether to show Log in (true) or Sign up (false)
  const [showLogin, setShowLogin] = useState(true);

  return (
    // Main Container (Dark Background)
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-sans p-6">
      
      {/* Background Images (Placeholder / Position Only) */}
      <div className="absolute inset-0 opacity-10 flex gap-10 overflow-hidden scale-110">
          <img src="https://picsum.photos/400/600" className="object-cover" alt="" />
          <img src="https://picsum.photos/400/500" className="object-cover" alt="" />
          <img src="https://picsum.photos/400/800" className="object-cover" alt="" />
      </div>

      {/* Central Auth Container */}
      <div className="relative z-10 w-full max-w-md bg-[#131313] rounded-3xl p-12 border border-zinc-900 shadow-2xl">
        
        {/* The Reusable Header */}
        <AuthHeader 
          title={`Welcome to Afriq`} 
          subtitle={`Discover African art, fashion, and culture.`} 
        />

        {/* 💡 Tabs Container: This manages switching between the two states */}
        <div className="w-full bg-black/40 rounded-full flex p-1 mb-8 border border-zinc-800">
          <button 
            onClick={() => setShowLogin(true)}
            className={`flex-1 text-sm font-semibold py-3 px-6 rounded-full transition-colors duration-200 ${showLogin ? 'bg-zinc-100 text-black' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Log in
          </button>
          <button 
            onClick={() => setShowLogin(false)}
            className={`flex-1 text-sm font-semibold py-3 px-6 rounded-full transition-colors duration-200 ${!showLogin ? 'bg-zinc-100 text-black' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Sign up
          </button>
        </div>

        {/* --- DYNAMIC FORM AREA --- */}
        <form onSubmit={(e) => e.preventDefault()}>
          <InputField label="Email address" type="email" placeholder="Enter your email" />
          <InputField label="Password" type="password" placeholder="Enter your password" />

          {/* Conditional rendering for "Forgot Password?" */}
          {showLogin && (
            <div className="text-left mb-6">
              <a href="#" className="text-xs text-zinc-400 hover:text-zinc-200 font-semibold underline">
                Forgot your password?
              </a>
            </div>
          )}

          {/* DYNAMIC PRIMARY BUTTON (LOG IN vs CREATE ACCOUNT) */}
          <PrimaryButton label={showLogin ? "Log in" : "Create account"} type="submit" />
        </form>
        {/* --- END DYNAMIC FORM AREA --- */}

        {/* Section Divider */}
        <Divider />

        {/* Social Buttons Container */}
        <div className="w-full flex flex-col gap-4">
          <SocialButton label="Continue with Google" icon="G" onClick={() => {}} />
          <SocialButton label="Continue with Apple" icon="" onClick={() => {}} />
        </div>

      </div>
    </div>
  );
}

export default AuthPage;