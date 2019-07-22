// Insert your own github access token below
export const TOKEN = '';
export const GITHUB_BASE_URL = 'https://api.github.com';

export const REACT = 'facebook/react';
export const VUE = 'vuejs/vue';
export const ANGULAR = 'angular/angular';

export const GITHUB_REPO_URL = `${GITHUB_BASE_URL}/repos/`;
export const REACT_REPO = `${GITHUB_REPO_URL}${REACT}`;
export const ANGULAR_REPO = `${GITHUB_REPO_URL}${ANGULAR}`;
export const VUE_REPO = `${GITHUB_REPO_URL}${VUE}`;

export const GITHUB_PR_URL = `${GITHUB_BASE_URL}/search/issues?q=type:pr+repo:`;
export const REACT_PR = `${GITHUB_PR_URL}${REACT}`;
export const ANGULAR_PR = `${GITHUB_PR_URL}${ANGULAR}`;
export const VUE_PR = `${GITHUB_PR_URL}${VUE}`;
