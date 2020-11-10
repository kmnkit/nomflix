import React from "react";
import {Route, Link} from "react-router-dom";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Overview from '../../Components/Overview';
import Videos from "../Videos";
import Production from "../Production";
import Seasons from "../Seasons";
import MovieCollection from "../MovieCollection";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 10px;
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
`;

const Content = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  @media only screen and (min-width: 320px) and (max-width: 425px) {
    
  }
  @media only screen and (min-width: 426px) and (max-width: 768px) {
    height: 60%;
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, 170px);
    margin-left: 20px;
  }
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
  @media only screen and (min-width: 320px) and (max-width: 425px) {
    width: 50%;
    height: 250px;   
  }
  @media only screen and (min-width: 426px) and (max-width: 768px) {
    width: 40%;
    height: 450px;
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 45%;
    height: 500px;
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const Imdblink = styled.a``;
const ImdbImage = styled.div`
  width: 50px;
  height: 30px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
`;

const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #1abc9c;
  padding: 5px;
  border-radius: 3px;
  background-color: ${props => (props.active ? "#1abc9c" : "transparent")};
  color: ${props => (props.active ? "white" : "#1abc9c")};
`;

const Item = styled.span``;

const ButtonMenu = styled.div`
  display: flex;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const DetailPresenter = ({ isMovie, pathname, result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={error} color='red'/>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <Imdblink href={`https://www.imdb.com/title/${result.imdb_id}`}>
            <ImdbImage bgImage={`https://media-exp1.licdn.com/dms/image/C560BAQHkZIZJFEOLxA/company-logo_200_200/0?e=2159024400&v=beta&t=XVmRXf7XVLdmcIY2Ym3lABkVeebMHp-RU_qLnsye6UY`}></ImdbImage>
          </Imdblink>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name}/`
                )}
            </Item>
          </ItemContainer>
          <Overview overview={result.overview}/>
          <ButtonMenu>
            <List>
              <ListItem active={
                pathname === (isMovie? 
                  (`/movie/${result.id}/videos`):
                  (`/show/${result.id}/videos`))}>
              <Link to={isMovie?(`/movie/${result.id}/videos`):(`/show/${result.id}/videos`)}>videos</Link>
              </ListItem>
              <ListItem active={
                pathname === (isMovie?
                  (`/movie/${result.id}/productions`):
                  (`/show/${result.id}/productions`))}>
              <Link to={isMovie?(`/movie/${result.id}/productions`):(`/show/${result.id}/productions`)}>Production</Link>
              </ListItem>
              {
                isMovie ? ( result.belongs_to_collection? 
                  (<ListItem active={pathname === `/movie/${result.id}/collection`}>
                    <Link to={`/movie/${result.id}/collection`}>Collection</Link>
                  </ListItem>) : (<div></div>)
                ) : (
                  <ListItem active={pathname === `/show/${result.id}/seasons`}>
                    <Link to={`/show/${result.id}/seasons`}>Seasons</Link>
                  </ListItem>
                  
                )
              }
            </List>
          </ButtonMenu>
            <Route path={isMovie? "/movie/:id/videos":
                                    "/show/:id/videos"}
                    render={() => 
              <Videos 
                videos={result.videos.results} /> } />

            <Route path={isMovie? "/movie/:id/productions":
                                    "/show/:id/productions"} 
                    render={() => 
              <Production 
                pathname={pathname}
                companies={result.production_companies} 
                countries={isMovie? result.production_countries: result.origin_country} />} />

            <Route path={isMovie? "/movie/:id/collection":
                                    "/show/:id/collection"} 
                    render={() => isMovie? 
                      <MovieCollection collection={result.belongs_to_collection} /> : 
                      <Seasons seasons={result.seasons} />} />
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
