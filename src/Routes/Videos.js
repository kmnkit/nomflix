import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import Loader from '../Components/Loader';
import YouTube from 'react-youtube';
import Message from '../Components/Message';
import SliderSettings from "../Components/SliderSettings";

const Container = styled.div`
    width: 52%;
    margin-left: 25px;
    @media only screen and (min-width: 320px) and (max-width: 425px) {
    width: 30%;
    height: 200px;   
    }
    @media only screen and (min-width: 426px) and (max-width: 768px) {
    width: 90%;
    height: 450px;
    }
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
    height: 500px;
    }
`;

const VideoContainer = styled.div`
    outline: none;
    margin-top: 20px;
`;

export default function Videos({videos}){
    const [loading, setLoading] = useState(true); 
    const getVideo = () => {
        try {
            console.log('비디오 로드 함',Object.keys(videos).length);
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getVideo();
    }, []);
    
    return (
        loading?(
            <Loader />
        ) : (
            Object.keys(videos).length > 0? (
                <Container>
                <Slider {...SliderSettings} >
                    {
                        videos.map(video => (
                            <VideoContainer key={video.id}>
                                <YouTube videoId={video.key} id={video.key}/>
                            </VideoContainer>
                        ))
                    }
                </Slider></Container>):(
                    <Message text='등록된 영상이 없습니다.' color='#F1EB23' />
                )
            )
        )
}