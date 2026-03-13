const ContentCard = ({ imageUrl, title, creator, creatorImg }) => (
  <div className="mb-6 break-inside-avoid group cursor-pointer">
    <div className="relative overflow-hidden rounded-2xl">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="mt-3 px-1">
      <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
      <div className="flex items-center mt-1 gap-2">
        <img src={creatorImg} className="w-5 h-5 rounded-full" alt={creator} />
        <span className="text-gray-400 text-xs">{creator}</span>
      </div>
    </div>
  </div>
);

export default ContentCard;