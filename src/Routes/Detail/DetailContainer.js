import React, { useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import { useHistory } from 'react-router-dom';
import { moviesApi, tvApi } from "../../api";

export default function DetailContainer({
  location: {pathname},
  match: {
    params: { id }
  }
}) {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const parsedId = parseInt(id, 10);
  const isMovie = pathname.includes('/movie/');
  if(isNaN(parsedId)){
    isMovie? history.push("/home") : history.push("/tv");
  }

  const getDetail = async () => {
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
      }
      setResults(result);
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <DetailPresenter isMovie={isMovie} pathname={pathname} result={results} error={error} loading={loading} />
  );
}
