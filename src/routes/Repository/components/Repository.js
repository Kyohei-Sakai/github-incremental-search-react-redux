import React from 'react'
import PropTypes from 'prop-types'

export const Searcher = ({ repository, searchReposWithText, getRepositories }) =>  {
  const list = (repos) => {
    return repos.map((repo) => (
      <li key={repo.full_name}>
        {repo.full_name}
      </li>
    ))
  }

  return (
    <div style={{ margin: '0 auto' }} >
      <h2>Repositories</h2>
      <div>
        <input
          typeof='text'
          style={{ margin: '30px auto'}}
          placeholder="Search..."
          onChange={searchReposWithText}></input>
        <button className='btn btn-primary' onClick={getRepositories}>
          GET Repos
        </button>
        <h3>{repository.word}</h3>
        <ul>
          {list(repository.searchRepos)}
        </ul>
      </div>
    </div>
  );
}
Searcher.propTypes = {
  repository: PropTypes.object.isRequired,
  searchReposWithText: PropTypes.func.isRequired,
  getRepositories: PropTypes.func.isRequired,
}

export default Searcher
