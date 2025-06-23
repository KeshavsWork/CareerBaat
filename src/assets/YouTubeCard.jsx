const YouTubeCard = ({ video }) => {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-black bg-opacity-40 border border-gray-700 rounded-lg overflow-hidden hover:scale-105 transition transform"
    >
      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-white font-medium text-sm">{video.title}</h4>
      </div>
    </a>
  );
};

export default YouTubeCard;
