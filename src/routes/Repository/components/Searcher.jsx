import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Searcher.scss'

export class Searcher extends Component {

  render() {
    const { repos } = this.props
    const { searchReposWithText, getRepositories } = this.props

    const list = (repos) => {
      return repos.map((repo) => (
        <li key={repo.full_name}>
          {repo.full_name}
          <span className='watchers_count'>{repo.watchers_count}</span>
        </li>
      ))
    }

    return (
      <div className='search-container'>
        <input
          typeof='text'
          style={{ margin: '30px auto'}}
          placeholder="Search..."
          onChange={searchReposWithText}></input>
        <button className='btn btn-primary' onClick={getRepositories}>
          GET Repos
        </button>
        <ul>
          {list(repos)}
        </ul>
      </div>
    );
  }
}

Searcher.propTypes = {
  repos: PropTypes.array.isRequired,
  searchReposWithText: PropTypes.func.isRequired,
  getRepositories: PropTypes.func.isRequired,
}

export default Searcher
