/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import Card from './components/Card';
import {Redirect} from 'react-router-dom';
import * as constants from './constants/constants';
import {GithubService} from './services/GithubService';
import ListItem from './components/ListItem';

const githubService = new GithubService();

const Forks = (props) => {
  const {
    avatarUrl,
    starsCount,
    openIssuesCount,
    forksCount,
    prCount,
    repoTitle,
    repoDescription,
    ally,
  } = props.location.cardProps || {};

  let page = 1;

  const [redirect, setRedirect] = useState(false);

  const [users, setUsers] = useState(fetchInitialUsers);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchUsers);

  function fetchInitialUsers() {
    if (repoTitle) {
      const url = `${
        constants.GITHUB_REPO_URL
      }${repoTitle}/stargazers?page=${page}`;
      githubService
          .getStargazersData(url)
          .then((data) => {
            page += 1;
            setUsers(data);
          })
          .catch((error) => console.log(error));
    } else {
      setTimeout(() => setRedirect(true), 0);
    }
  }

  function fetchUsers() {
    if (repoTitle) {
      const url = `${
        constants.GITHUB_REPO_URL
      }${repoTitle}/stargazers?page=${page}`;
      githubService
          .getStargazersData(url)
          .then((data) => {
            page += 1;
            setUsers((prevState) => [...prevState, ...data]);
            setIsFetching(false);
          })
          .catch((error) => console.log(error));
    } else {
      setTimeout(() => setRedirect(true), 0);
    }
  }

  return (
    <div className="App mh4 mw8 center">
      <header className="App-header tj mt0">
        <h1>React War Room </h1>
      </header>
      {redirect ? <Redirect to="/" /> : null}
      <Card
        showForks={false}
        ally={ally}
        avatarUrl={avatarUrl}
        repoTitle={repoTitle}
        starsCount={starsCount}
        repoDescription={repoDescription}
        openIssuesCount={openIssuesCount}
        forksCount={forksCount}
        prCount={prCount}
      />
      {users &&
        users.map(({login, avatar_url, html_url}, index) => (
          <ListItem
            login={login}
            avatarUrl={avatar_url}
            githubUrl={html_url}
            key={index}
          />
        ))}
      {isFetching && 'Fetching more users...'}
    </div>
  );
};

export default Forks;
