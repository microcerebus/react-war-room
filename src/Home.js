/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import {map} from 'lodash';
import React, {Component} from 'react';
import {GithubService} from './services/GithubService';
import * as constants from './constants/constants';
import Card from './components/Card';

const githubService = new GithubService();
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
  }

  getRepoData(url) {
    const repo = url.split('/').pop();
    githubService
        .getRepoData(url)
        .then((data) => {
          const {repos} = this.state;
          switch (repo) {
            case 'react':
              repos.push({react: {...data, ally: true}});
              this.setState({repos: repos});
              break;
            case 'angular':
              repos.push({angular: {...data, ally: false}});
              this.setState({repos: repos});
              break;
            case 'vue':
              repos.push({vue: {...data, ally: false}});
              this.setState({repos: repos});
              break;
            default:
              repos.push({repo: {...data, ally: true}});
              this.setState({repos: repos});
              break;
          }
        })
        .catch((error) => console.log(error));
  }

  getPRData(url) {
    const repo = url.split('/').pop();
    githubService
        .getPRData(url)
        .then((total_count) => {
          switch (repo) {
            case 'react':
              this.setState({reactPR: total_count});
              break;
            case 'angular':
              this.setState({angularPR: total_count});
              break;
            case 'vue':
              this.setState({vuePR: total_count});
              break;
            default:
              this.setState({PR: total_count});
              break;
          }
        })
        .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getRepoData(`${constants.REACT_REPO}`);
    this.getRepoData(`${constants.ANGULAR_REPO}`);
    this.getRepoData(`${constants.VUE_REPO}`);

    this.getPRData(`${constants.REACT_PR}`);
    this.getPRData(`${constants.ANGULAR_PR}`);
    this.getPRData(`${constants.VUE_PR}`);
  }

  render() {
    const {repos, reactPR, angularPR, vuePR} = this.state;
    return (
      repos.length === 3 &&
      map(repos, (repo, index) => {
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
            showForks={true}
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
      })
    );
  }
}
