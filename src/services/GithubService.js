/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import axios from 'axios';
import {map} from 'lodash';

class GithubService {
  getRepoData(url) {
    return new Promise((resolve, reject) => {
      axios
          .get(url)
          .then((response) => {
            if (response && response.status === 200) {
              const {
                forks_count,
                open_issues_count,
                stargazers_count,
                full_name,
                description,
              } = response.data;
              const {avatar_url} = response.data.owner;
              resolve({
                forks_count,
                open_issues_count,
                stargazers_count,
                full_name,
                description,
                avatar_url,
              });
            } else {
              reject(new Error('Data not found'));
            }
          })
          .catch((error) => reject(error.message));
    });
  }

  getStargazersData(url) {
    return new Promise((resolve, reject) => {
      axios
          .get(url)
          .then((response) => {
            if (response && response.status === 200) {
              resolve(
                  map(response.data, (user) => {
                    const {login, avatar_url, html_url} = user;
                    return {login, avatar_url, html_url};
                  })
              );
            } else {
              reject(new Error('Data not found'));
            }
          })
          .catch((error) => reject(error.message));
    });
  }

  getPRData(url) {
    return new Promise((resolve, reject) => {
      axios
          .get(url)
          .then((response) => {
            if (response && response.status === 200) {
              const {total_count} = response.data;
              resolve(total_count);
            } else {
              reject(new Error('Data not found'));
            }
          })
          .catch((error) => reject(error.message));
    });
  }
}

export {GithubService};
