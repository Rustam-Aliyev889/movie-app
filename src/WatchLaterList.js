const WatchLaterList = ({ watchLaterList, onRemoveFromWatchLater }) => {
  return (
    <div className="watch-later-list">
      <h2>Watch Later List:</h2>
      <ul>
        {watchLaterList.map((movie) => (
          <li key={movie.id}>
            <img src={movie.posterUrl} alt={movie.title} />
            {movie.title}
            <button onClick={() => onRemoveFromWatchLater(movie)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WatchLaterList;


