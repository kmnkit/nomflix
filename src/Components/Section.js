import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
  @media only screen and (min-width: 320px) and (max-width: 425px) {
    grid-template-columns: repeat(auto-fill, 150px);
    margin-left: 30px;
  }
  @media only screen and (min-width: 426px) and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, 150px);
    margin-left: 30px;
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, 170px);
    margin-left: 20px;
  }
`;

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
