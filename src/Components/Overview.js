import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
`;

export default ({overview}) => (
    <Container>{overview}</Container>
);