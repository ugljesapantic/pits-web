import React from 'react';
import styled from 'styled-components';

const Greeting = styled.div`
  font-size: 3rem;
  line-height: 5rem;
  text-align: center;
  transform: translateY(calc(50vh - 10rem));
`;

function DashboardPage() {
  return <Greeting>Welcome to the Personal Management Tool</Greeting>;
}

export default DashboardPage;
