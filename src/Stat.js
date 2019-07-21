import React from 'react';
import styled from 'styled-components';

const StatContainer = styled.dl.attrs({
  className: `fl fn-l w-20 dib-l w-auto-l lh-title mr5-l`,
})``;
const StatsTitle = styled.dd.attrs({className: `f6 fw4 ml0`})``;
const StatsValue = styled.dd.attrs({className: `f3 fw6 ml0`})``;

const Stat = ({title, value}) => {
  return (
    <StatContainer>
      <StatsTitle>{title}</StatsTitle>
      <StatsValue>{value}</StatsValue>
    </StatContainer>
  );
};

export default Stat;
