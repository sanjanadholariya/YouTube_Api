import { useState, useEffect, useRef } from "react";
import './app.css'

function App() {
  const [videoIds, setVideoIds] = useState([]);
  const query = useRef("");

  useEffect(() => {
    fetchVideos("react"); 
  }, []);

  const fetchVideos = (searchItem) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchItem}&type=video&videoEmbeddable=true&maxResults=6&key=AIzaSyD6idnnZdgIuZ2qcAJpsga6Bm-zYtvZczM`
    )
      .then((data) => data.json())
      .then((res) => {
        const temp = res.items.map((item) => item.id.videoId);
        setVideoIds(temp);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  };

  const displayVideos = (e) => {
    e.preventDefault();
    const searchItem = query.current.value;
    fetchVideos(searchItem);
  };

  return (
    <>

      <h1 align="center" style={{color:"white"}}>YouTube Video Player</h1>

      <form onSubmit={displayVideos} align="center" style={{ margin: 10 }}>
        <input
          type="search"
          ref={query}
          placeholder="Search here"
          style={{ height: 50, width: 600, fontSize: 20, padding: 10, borderRadius: 50 , padding:20 ,color:"white",border:0,backgroundColor:"#283747"}}
        />
        <button type="submit" style={{ height: 50, width: 100, fontSize: 20, borderRadius: 50 ,color:"white",border:0}}>
          Search
        </button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {videoIds.map((id, index) => (
          <iframe
            key={index}
            width="480"
            height="300"
            src={`https://www.youtube.com/embed/${id}`}
            title={`YouTube Video ${index}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ margin: "10px" }}
          ></iframe>
        ))}
      </div>
    </>
  );
}

export default App;