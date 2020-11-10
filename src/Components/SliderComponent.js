import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const SlideContainer = styled.div`
    padding: 5px 20px;
`;
const Title = styled.div`
    color: white;
    font-size: 32px;
    margin-bottom: 15px;
`;
const Container = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;    
    @media only screen and (min-width: 426px) and (max-width: 768px) {
        width: 150px;
    }
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
        left: 400px;
    }
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    width: 150px;
    height: 100%;
    border-radius: 8px;
    @media only screen and (min-width: 320px) and (max-width: 425px) {
        width: 180px;
        height: 100%;
    }
    @media only screen and (min-width: 426px) and (max-width: 768px) {
        width: 200px;
    }
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
        left: 400px;
    }
`;

const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 100,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 425,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                speed: 500
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3                
            }
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4                
            }
        },        
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5                
            }
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6                
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 7                
            }
        },
        {
            breakpoint: 1350,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 8                
            }
        },
        {
            breakpoint: 1550,
            settings: {
                slidesToShow: 9,
                slidesToScroll: 9                
            }
        },
    ]
}

export default function SliderComponent ({title, programs, isMovie=false}){
    return (
    <SlideContainer>
        <Title>{title}</Title>
        <Slider {...settings}>
            {programs.map(program => (
                <Container key={program.id}>
                    <Link to={isMovie?`/movie/${program.id}`:`/show/${program.id}`}>
                        <Cover bgImage={`https://image.tmdb.org/t/p/w500${program.poster_path}`} />
                    </Link>
                </Container>
            ))}
        </Slider>
    </SlideContainer>
    )
};