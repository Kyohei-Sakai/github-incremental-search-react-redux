import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Searcher.scss'

export class Searcher extends Component {

  render() {
    const { repos, limit } = this.props
    const { searchReposWithText, watchRepository } = this.props

    const list = (repos) => {
      return repos.map((repo, index) => (
        <li key={repo.full_name}>
          <button
            type="button"
            className='btn btn-outline-success btn-sm'
            value={index}
            onClick={watchRepository}
          >
            watch
          </button>
          {repo.full_name}
          <span className='watchers_count'>{repo.watchers_count}</span>
        </li>
      ))
    }

    const alert = (limit) => {
      return (limit)
        ? <div className='alert alert-danger'>Wait a little!</div>
        : null
    }

    return (
      <div className='search-container'>
        {alert(limit)}
        <input
          typeof='text'
          placeholder="Search... repositories"
          onChange={searchReposWithText}
        />
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
  watchRepository: PropTypes.func.isRequired,
}

export default Searcher
