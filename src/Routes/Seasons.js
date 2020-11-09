import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import Loader from "../Components/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Overview from "../Components/Overview";

const Container = styled.div`
    width: 60%;
    height: 500px;
    margin-left: 20px;
`;

const SlideContainer = styled.div`
    display: flex !important;
    width: 100%;
    margin-top: 20px;
    outline: none;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;  
  height: 350px;
  border-radius: 5px;
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    width: 70%;
    margin-left: 15px;
`;

const Title = styled.span`
    font-size: 24px;
    margin-bottom: 10px;
`;

const Episode = styled.span`
    margin-bottom: 10px;
    `;
const Airdate = styled.span`
    margin-bottom: 10px;
`;

const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1
}

export default function Seasons({seasons}){
    const [loading, setLoading] = useState(true);

    const getSeasons = () =>{
        try {
            setLoading(false);
        } catch (e){
            console.log(e);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getSeasons();
    }, []);

    return (
        loading? (
            <Loader />
        ):(
            <Container>
                <Slider {...settings}>
                {seasons.map(season => (
                    <SlideContainer key={season.id}>
                        <Cover bgImage={season.poster_path? `https://image.tmdb.org/t/p/w500${season.poster_path}` : require("../assets/noPosterSmall.png")} />
                        <Data>
                        <Title>Season {season.season_number}</Title>
                        <Episode>{season.episode_count} Episodes</Episode>
                            <Airdate>Air Date : {season.air_date?season.air_date:"TBD"}</Airdate>
                            <Overview overview={season.overview} />
                        </Data>
                    </SlideContainer>)
                    )}                    
                </Slider>
            </Container>
        )
    )
}