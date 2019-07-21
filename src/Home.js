/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import Card from './Card';

//Insert your own github access token below

const githubToken = '';
const GITHUB_BASE_URL = 'https://api.github.com';
const REACT = 'facebook/react';
const VUE = 'vuejs/vue';
const ANGULAR = 'angular/angular';
// https://api.github.com/search/issues?q=type:pr+repo:facebook/react+is:open

const getData = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response && response.status === 200) {
          resolve(response);
        } else {
          reject(new Error('Data not found'));
        }
      })
      .catch((error) => reject(error.message));
  });
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
  }

  getPRData = (url) => {
    const repo = url.split('/').pop();
    getData(url)
      .then((response) => {
        const { total_count } = response.data;
        switch (repo) {
          case 'react':
            this.setState({ reactPR: total_count });
            break;
          case 'angular':
            this.setState({ angularPR: total_count });
            break;
          case 'vue':
            this.setState({ vuePR: total_count });
            break;
          default:
            this.setState({ PR: total_count });
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  getRepoData = (url) => {
    const repo = url.split('/').pop();
    getData(url)
      .then((response) => {
        const {
          forks_count,
          open_issues_count,
          stargazers_count,
          full_name,
          description,
        } = response.data;
        const { avatar_url } = response.data.owner;

        const data = {
          forks_count,
          open_issues_count,
          stargazers_count,
          full_name,
          description,
          avatar_url,
        };

        const { repos } = this.state;

        switch (repo) {
          case 'react':
            repos.push({ react: { ...data, ally: true } });
            this.setState({ repos: repos });
            break;
          case 'angular':
            repos.push({ angular: { ...data, ally: false } });
            this.setState({ repos: repos });
            break;
          case 'vue':
            repos.push({ vue: { ...data, ally: false } });
            this.setState({ repos: repos });
            break;
          default:
            repos.push({ repo: { ...data, ally: true } });
            this.setState({ repos: repos });
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getRepoData(`${GITHUB_BASE_URL}/repos/${REACT}`);
    this.getRepoData(`${GITHUB_BASE_URL}/repos/${ANGULAR}`);
    this.getRepoData(`${GITHUB_BASE_URL}/repos/${VUE}`);

    this.getPRData(`${GITHUB_BASE_URL}/search/issues?q=type:pr+repo:${REACT}`);
    this.getPRData(
      `${GITHUB_BASE_URL}/search/issues?q=type:pr+repo:${ANGULAR}`
    );
    this.getPRData(`${GITHUB_BASE_URL}/search/issues?q=type:pr+repo:${VUE}`);
  }

  render() {
    const { repos, reactPR, angularPR, vuePR } = this.state;
    return (
      <div className="App mh4">
        <header className="App-header tj mt0">
          <h1>React War Room </h1>
        </header>

        {repos.length === 3 &&
          _.map(repos, (repo, index) => {
            const {
              forks_count,
              open_issues_count,
              stargazers_count,
              full_name,
              description,
              avatar_url,
              ally,
            } = Object.values(repo)[0];
            const name = full_name.split('/').pop();

            return (
              <Card
                ally={ally}
                key={index}
                avatarUrl={avatar_url}
                repoTitle={full_name}
                starsCount={stargazers_count}
                repoDescription={description}
                openIssuesCount={open_issues_count}
                forksCount={forks_count}
                prCount={
                  name === 'react'
                    ? reactPR
                    : name === 'angular'
                    ? angularPR
                    : vuePR
                }
              />
            );
          })}
      </div>
    );
  }
}
