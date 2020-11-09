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
`;
const Container = styled.div`
    width: 100%;
    height: 300px;
    padding: 10px;
    display: flex;
    justify-content: center;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  width: 150px;
  height: 100%;
  border-radius: 5px;
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
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            },
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