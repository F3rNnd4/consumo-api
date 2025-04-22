"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./animeList.module.css";
import Loading from "../loading";

const AnimeList = () => {
  const url = "http://localhost:4000/animes";

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}`);
        setFilms(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar os animes na API");
        setError(
          "Não foi possível carregar os animes. Tente novamente mais tarde."
        );
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Animes</h1>

      {loading ? (
        <Loading />
      ) : (
        <div className={styles.filmGrid}>
          {films.map((film) => (
            <div key={film.mal_id} className={styles.filmCard}>
              <div className={styles.imageContainer}>
                <img
                  src={film.images.jpg.image_url}
                  alt={film.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.filmTitle}>{film.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeList;
