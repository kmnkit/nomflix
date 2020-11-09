import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import Loader from '../Components/Loader';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 400px;
    margin-top: 15px;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;  
  height: 350px;
  border-radius: 5px;
`;

const Title = styled.span`
    font-size: 24px;
    margin-bottom: 10px;
    margin-left: 15px;
`;

export default function MovieCollection({collection}){
    const [loading, setLoading] = useState(true);

    function getCollections (){
        try {
            console.log('Belong Collection Load');
        } catch (e) {
            console.log(e);
        } finally {            
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getCollections();
    }, []);

    return (
        loading? (
            <Loader />
        ):(
            <Container>
                <Cover bgImage={collection.poster_path? `https://image.tmdb.org/t/p/w500${collection.poster_path}` : require("../assets/noPosterSmall.png")} />
                <Title>{collection.name}</Title>
            </Container>
        )
    )
}