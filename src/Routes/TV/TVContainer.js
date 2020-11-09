import React,{ useState, useEffect } from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default () => {
  const [topRatedes, setTopRatedes] = useState(null);
  const [populars, setPopulars] = useState(null);
  const [airingTodays, setAiringTodays] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getShows = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      setTopRatedes(topRated);
      setPopulars(popular);
      setAiringTodays(airingToday);

    } catch {
      setError("Can't find TV information.");      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getShows();
  }, []);
  
  return (
    <TVPresenter
        topRated={topRatedes}
        popular={populars}
        airingToday={airingTodays}
        error={error}
        loading={loading}
      />
  )
}
