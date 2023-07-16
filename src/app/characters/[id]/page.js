"use client";

import ComicModal from "@/components/ComicModal/ComicModal";
import { useEffect,useState } from "react";

export default function Characters({ params }) {

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(
      `http://gateway.marvel.com/v1/public/characters/${params.id}/comics?orderBy=onsaleDate&limit=99&apikey=798a820405391028076a4b49bc50f7f5&hash=ff9f3b6fdf656a1b6f8c8250040cfb6e`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.data.results);
      });
  }, [searchResults]);


  return <div>
    {searchResults.map((comic)=> 
    <p>
      {comic.title}
    </p>
    )}  
    </div>;
}
