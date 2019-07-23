/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

const ListItemContainer = styled.article.attrs({
  className: `dt w-100 ba br3 b--black-10 mt3`,
})``;
const UserAvatarContainer = styled.div.attrs({
  className: `dtc w2 w3-ns v-mid`,
})``;
const UserAvatar = styled.img.attrs({
  className: `ba b--black-10 db br2 v-mid w2 w3-ns h2 h3-ns`,
})``;
const UserInfoContainer = styled.div.attrs({
  className: `dtc mw4 tj v-mid pl4`,
})``;
const UserName = styled.h1.attrs({
  className: `f6 f5-ns fw6 lh-title black mv0`,
})``;
const GithubContainer = styled.div.attrs({className: `dtc v-mid`})``;
const GithubForm = styled.form.attrs({className: `w-100 tr`})``;
const GithubIcon = styled.a.attrs({
  className: `link near-black hover-silver dib h2 w2 mr3`,
})``;

const ListItem = ({login, githubUrl, avatarUrl}) => {
  return (
    <ListItemContainer>
      <UserAvatarContainer>
        <UserAvatar src={avatarUrl} />
      </UserAvatarContainer>
      <UserInfoContainer>
        <UserName>{login}</UserName>
      </UserInfoContainer>
      <GithubContainer>
        <GithubForm GithubForm>
          <GithubIcon href={githubUrl}>
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="1.414"
            >
              <path d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.083-.202-.358-1.015.077-2.117 0 0 .672-.215 2.2.82.638-.178 1.323-.266 2.003-.27.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.437 1.102.163 1.915.08 2.117.513.56.823 1.274.823 2.147 0 3.073-1.87 3.75-3.653 3.947.287.246.543.735.543 1.48 0 1.07-.01 1.933-.01 2.195 0 .215.144.463.55.385C13.71 14.53 16 11.534 16 8c0-4.418-3.582-8-8-8" />
            </svg>
          </GithubIcon>
        </GithubForm>
      </GithubContainer>
    </ListItemContainer>
  );
};

export default ListItem;
