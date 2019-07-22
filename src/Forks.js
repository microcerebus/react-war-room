/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import useInfiniteScroll from './useInfiniteScroll';
import Card from './Card';
import ListItem from './ListItem';

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

  const [users, setUsers] = useState(
      Array.from(Array(30).keys(), (n) => n + 1)
  );

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchUsers);

  function fetchUsers() {
    setTimeout(() => {
      setUsers((prevState) => [
        ...prevState,
        ...Array.from(Array(20).keys(), (n) => n + prevState.length + 1),
      ]);
      setIsFetching(false);
    }, 2000);
  }

  return (
    <div className="App mh4 mw8 center">
      <header className="App-header tj mt0">
        <h1>React War Room </h1>
      </header>
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
      {users.map((user, index) => (
        <ListItem
          name={'John Doe'}
          login={user}
          avatarUrl={'http://mrmrs.github.io/photos/p/2.jpg'}
          key={index}
        />
      ))}
      {isFetching && 'Fetching more users...'}
    </div>
  );
};

export default Forks;
