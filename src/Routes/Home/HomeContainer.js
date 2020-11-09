import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

export default () => {
  const [nowPlayings, setNowPlayings] = useState(null);
  const [upcomings, setUpcomings] = useState(null);
  const [populars, setPopulars] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const getMovies = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();

      setNowPlayings(nowPlaying);
      setUpcomings(upcoming);
      setPopulars(popular);

    } catch (error) {
      setError("Can't find Movies Information.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <HomePresenter
        nowPlaying={nowPlayings}
        upcoming={upcomings}
        popular={populars}
        error={error}
        loading={loading}
      />
  );
}
