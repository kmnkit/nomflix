import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(NavLink)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

const styles = {
  opacity: 1,
  borderBottom: "3px solid #2BC9E5",
  transition: "all 1s"
}

export default () => {
  return(
  <Header>
    <List>
      <Item style={{fontSize: 40}}>
        <SLink 
        activeStyle = {styles}
        exact to="/">🍿</SLink>
      </Item>
      <Item>
        <SLink 
          activeStyle = {styles}
          exact to="/home">Movies</SLink>
      </Item>
      <Item>
        <SLink 
          activeStyle = {styles}
          exact to="/tv">TV</SLink>
      </Item>
      <Item>
        <SLink 
          activeStyle = {styles}
          to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
  )
}