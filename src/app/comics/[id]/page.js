"use client";

import { useEffect, useState } from "react";
import { useSearchBarContext } from "@/context/SearchBarContext";

export default function Characters({ params }) {
  const [searchResults, setSearchResults] = useState([]);
  const { apikey, hash } = useSearchBarContext();

  useEffect(() => {
    fetch(
      `http://gateway.marvel.com/v1/public/comics/${params.id}?apikey=${apikey}&hash=${hash}&ts=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.data.results);
        console.log("Se ejecuta fetch de comics");
      });
  }, []);

  return (
    <div>
      {searchResults.length > 0 && (
        <div className="d-flex flex-row justify-content-center align-items-stretch comic-detail-container">
          <div className="comic-detail-img-container">
            <img
              className="comic-detail-img"
              src={`${searchResults[0]?.thumbnail?.path}.${searchResults[0]?.thumbnail?.extension}`}
              alt={searchResults[0]?.title}
            />
          </div>
          <div className="comic-detail-information d-flex flex-column gap-5">
            <div>
              <h2>{searchResults[0]?.title}</h2>
            </div>
            <div className="d-flex flex-column gap-0">
              {searchResults[0]?.dates?.map((dateObj) => {
                if (dateObj.type === "onsaleDate") {
                  const onSaleDate = new Date(dateObj.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  return (
                    <p key={dateObj.type} style={{ fontWeight: "bold" }}>
                      Published: {onSaleDate}
                    </p>
                  );
                }
              })}
              <p style={{ fontWeight: "bold" }}>Writer(s):</p>
              <ul>
                {searchResults[0]?.creators?.items
                  .filter((creator) => creator.role === "writer")
                  .map((writer) => (
                    <li key={writer.resourceURI}>{writer.name}</li>
                  ))}
              </ul>
              <p style={{ fontWeight: "bold" }}>Penciller(s):</p>
              <ul>
                {searchResults[0]?.creators?.items
                  .filter(
                    (creator) =>
                      creator.role.includes("penciller") ||
                      creator.role.includes("penciler")
                  )
                  .map((penciller) => (
                    <li key={penciller.resourceURI}>{penciller.name}</li>
                  ))}
              </ul>
              <p style={{ fontWeight: "bold" }}>Cover Artist(s):</p>
              <ul>
                {searchResults[0]?.creators?.items
                  .filter((creator) => creator.role.includes("cover"))
                  .map((penciller) => (
                    <li key={penciller.resourceURI}>{penciller.name}</li>
                  ))}
              </ul>
            </div>
            <div>
              <p>{searchResults[0]?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
