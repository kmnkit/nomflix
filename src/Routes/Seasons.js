import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import Loader from "../Components/Loader";
import Slider from "react-slick";

const Container = styled.div`
    width: 100%;
    height: 500px;
`;

const SlideContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`;

const Cover = styled.div`
  width: 20%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;  
  height: 400px;
  border-radius: 5px;
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
    color: white;    
    height: 100%;
`;

const Title = styled.span`
    font-size: 24px;    
`;

const Airdate = styled.span`
`;

const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

export default function Seaons({seasons}){
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
                        <Cover bgImage={`https://image.tmdb.org/t/p/w500${season.poster_path}`} />
                        <Data>
                            <Title>Season {season.season_number}</Title>
                            <Airdate>Air Date : {season.air_date?season.air_date:`Don't know yet.`}</Airdate>
                        </Data>
                    </SlideContainer>)
                    )}                    
                </Slider>
            </Container>
        )
    )
}