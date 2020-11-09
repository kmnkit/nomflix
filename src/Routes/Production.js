import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Loader from '../Components/Loader';
import ReactCountryFlag from "react-country-flag";

const Organization = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const Category = styled.span`
    font-weight: 600;
    font-size: 32px;
    color: white;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 200px;
    width: 250px;
    margin-right: 10px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgImage});
  width: 100%;
  height: 250px;
  border-radius: 4px;
  background-size: cover;
  background-position: center center;
  margin-top: 15px;
`;

const Nameplate = styled.span`
    font-weight: bold;
    font-size: 32px;
`;

export default function Production({pathname, companies, countries}){
    const [loading, setLoading] = useState(true);
    const isMovie = pathname.includes('/movie/');
    const getProductions = async () => {
        try{
            console.log('프로덕션 정보 로드 함',Object.keys(companies).length);
        }catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductions();
    }, []);

    return (
        loading? (
            <Loader />
        ):(
            <>
                <Category>Production Companies</Category>
                <Organization>
                {companies.map((company, index) => (
                    <Container key={index}>
                        {company.logo_path? 
                            <Image bgImage={`https://image.tmdb.org/t/p/original${company.logo_path}`} />: <Image bgImage={"https://lh3.googleusercontent.com/proxy/XPWJXbsVHPsZTSGsjHj_yFF4KzFnl1-lTNZrZrYFbf-Y55T9Fr8DjVHxH7NcBh6adWjMgTQS6v7WN81HAb8Pzi5gfUi110ZeZTcm1pQ"}/>}                    
                        <Nameplate>{company.name}</Nameplate>
                    </Container>
                ))}
                </Organization>

                <Category>Production Countries</Category>
                <Organization>
                {countries.map((country, index) => (
                    <Container key={index}>
                        <ReactCountryFlag
                            className="emojiFlag"
                            countryCode={isMovie? country.iso_3166_1: country}
                            style={{ fontSize: '100px'}}
                            aria-label={isMovie? country.name: country} 
                            role='img'/>
                        <Nameplate>{isMovie? country.name: country}</Nameplate>
                    </Container>
                ))}
                </Organization>  
            </>       
        )
    )

}