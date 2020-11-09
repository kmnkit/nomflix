import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "0eaa6db7e6ac99943d7b4b24e95ec968",
    language: "en-US",
  },
});

export const tvApi = {
  topRated: () => api.get("/tv/top_rated"),
  popular: () => api.get("/tv/popular"),
  airingToday: () => api.get("/tv/airing_today"),
  tvDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("/search/tv", {
      params: {
        query: term,
      },
    }),
  getVideos: (id) => api.get(`/tv/${id}/videos`)
};

export const moviesApi = {
  nowPlaying: () => api.get("/movie/now_playing"),
  upcoming: () => api.get("/movie/upcoming"),
  popular: () => api.get("/movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("/search/movie", {
      params: {
        query: term,
      },
    }),
  topRated: () => 
    api.get("/movie/top_rated",{
      params:{
        region: "us"
      }
    }),
  getVideo: (id) =>
    api.get(`/movie/${id}/videos`)
};
