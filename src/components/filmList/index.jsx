"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./filmList.module.css";
import Loading from "../loading";

const FilmList = () => {
  const url = "https://ghibliapi.vercel.app/films";

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setFilms(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar os filmes na API");
        setError(
          "Não foi possível carregar os filmes. Tente novamente mais tarde."
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
      <h1 className={styles.title}>Filmes do Studio Ghibli</h1>

      {loading ? (
        <Loading />
      ) : (
        <div className={styles.filmGrid}>
          {films.map((film) => (
            <div key={film.id} className={styles.filmCard}>
              <div className={styles.imageContainer}>
                <img
                  src={film.image}
                  alt={film.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.filmTitle}>{film.title}</h2>
                <p className={styles.director}>Diretor: {film.director}</p>
                <p className={styles.year}>{film.release_date}</p>
                <div className={styles.rating}>
                  <span className={styles.score}>{film.rt_score}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilmList;