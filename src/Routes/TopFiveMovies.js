import React,{useState, useEffect} from "react";
import Slider from "react-slick";
import { moviesApi } from "../api";
import Loader from "../Components/Loader";
import styled from "styled-components";
import SliderSettings from "../Components/SliderSettings";
import { Helmet } from "react-helmet";

const Title = styled.h1`
    color: white;
    font-size: 48px;
`;
const Container = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    outline: none;
`;

const SlideContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position:relative;
    display: grid;
    outline: none;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
  outline: none;
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 600px;
    top: 10px;
`;

const Cover = styled.div`
  left: 20px;
  top: 20px;
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  z-index: 10;
`;

const Popularity = styled.span`
    color: white;
    font-size: 30px;
`;

const Vote = styled.span`
    color: white;
    font-size: 35px;
`;

const Edge = styled.span`
    position: absolute;
    right: 0px;
    bottom: 0px;
`;

const Star = styled.span``;

export default () => {
    const [topRated, setTopRated] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getTopRated = async () => {
        let results;
        try {
            ({data: {results}} = await moviesApi.topRated());
            setTopRated(results.slice(0,5));
        } catch {
            setError("Can't find Top Rated Movies Information.");
            console.log(error);
        } finally{
            setLoading(false);
        }
        const datas= results.forEach(async (movie) => {
            return (movie, moviesApi.getVideo(movie.id));
        })
        console.log(datas);
    }

    useEffect(() => {
        getTopRated();
    }, []);

    return (
        loading? (
            <Loader/>
        ):(
            <Container>
                <Helmet>
                <title>
                Top Rated 5 Movies{" "}
                | Nomflix
                </title>
                </Helmet>
                <Slider {...SliderSettings}>
                {topRated.map(movie => (
                    <SlideContainer key={movie.id}>
                        <Backdrop 
                            bgImage={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                            <Cover bgImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        <Data>
                            <Title>{movie.original_title}</Title>
                            <Vote><Star role="img">⭐️</Star> : {movie.vote_average}</Vote>
                            <Popularity>Popularity : {movie.popularity}</Popularity>
                        </Data>
                        <Edge>{movie.original_title}</Edge>
                    </SlideContainer>
                ))}
                </Slider>
            </Container>
        )
    )
}