'use client'

import { useEffect, useState } from "react";
import HeroesGrid from "../HeroesGrid/HeroesGrid";


function HeroesGridContainer() {
    const [heroesData, setHeroesData] = useState(null)

useEffect(() => {
    fetch("http://gateway.marvel.com/v1/public/characters?offset=210&limit=8&ts=1&apikey=798a820405391028076a4b49bc50f7f5&hash=ff9f3b6fdf656a1b6f8c8250040cfb6e")
    .then((res) => res.json())
    .then((data) => {
        setHeroesData(data.data.results)
    })
}, [])

    return ( 
        <div>
            <HeroesGrid heroes={heroesData}/>
        </div>
     );
}

export default HeroesGridContainer;