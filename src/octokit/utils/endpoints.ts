const getPullRequestEndpoint = 'GET /repos/{owner}/{repo}/pulls/{pull_number}';
const compareCommitsEndpoint = 'GET /repos/{owner}/{repo}/compare/{basehead}';
const getFileContentsEndpoint = 'GET /repos/{owner}/{repo}/contents/{path}';

export {
  getPullRequestEndpoint,
  compareCommitsEndpoint,
  getFileContentsEndpoint
}