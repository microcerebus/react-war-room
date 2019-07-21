/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stat from './Stat';

const ImageContainer = styled.div.attrs({className: `fl w-third tl`})``;
const Image = styled.img.attrs((props) => ({
  alt: `${props.alt}`,
  src: `${props.url}`,
  className: `br-100 h4 w4 dib ba b--black-05 pa2`,
}))``;
const Title = styled.h1.attrs({className: `f3 mb2`})``;
const Description = styled.h2.attrs({className: `f5 mw5 fw4 gray mt3 mb0`})``;

const Card = ({
  avatarUrl,
  starsCount,
  openIssuesCount,
  forksCount,
  prCount,
  repoTitle,
  repoDescription,
  ally,
}) => {
  return (
    <article className="mw8 mb3 flex items-end bg-white br3 pa3-ns ba b--black-10">
      <ImageContainer>
        <Image src={avatarUrl} />
        <Title>{repoTitle}</Title>
        <Description>{repoDescription}</Description>
      </ImageContainer>
      <div className="h-100 flex flex-column justify-between">
        <h1
          className={
            ally
              ? 'mb4 br2 pv1 ph1 f4 white mw4 bg-dark-green'
              : 'mb4 br2 pv1 ph1 f4 white mw4 bg-dark-red'
          }
        >
          {ally ? '#ALLY' : '#ENEMY'}
        </h1>
        <a
          className="f4 mb4 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"
          href={repoTitle.split('/')[1]}
        >
          Users who have forked this repo
        </a>

        <div className="cf">
          <Stat title="Stars" value={starsCount} />
          <Stat title="Open Issues" value={openIssuesCount} />
          <Stat title="Forks" value={forksCount} />
          <Stat title="Pull Requests" value={prCount} />
        </div>
      </div>
    </article>
  );
};

// Card.propTypes = {};

export default Card;
