import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Watcher.scss'

export class Watcher extends Component {

  render() {
    const { repos } = this.props
    const { getWathedRepositories, unWatchRepository, refineWatchedRepos } = this.props

    const list = (repos) => {
      return repos.map((repo, index) => (
        <li key={repo.full_name}>
          <div className='repo-info'>
            <span>
              <img
                className='avatar'
                src={repo.owner.avatar_url}
                alt='avatar'
                id={repo.owner.id}
              />
            </span>
            <span>{repo.full_name}</span>
          </div>
          <div className='switch-watch'>
            <button
              type='button'
              className='btn btn-outline-success btn-sm'
              value={index}
              onClick={unWatchRepository}
            >
              Unwatch
            </button>
          </div>
        </li>
      ))
    }

    return (
      <div className='watch-container'>
        <header>
          <h2>Watch</h2>
          <div className='search'>
            <input
              typeof='text'
              className='form-control'
              placeholder='Search...'
              onChange={refineWatchedRepos}
            />
            <button
              className='btn btn-watched-update'
              onClick={getWathedRepositories}
            >
              Update
            </button>
          </div>
        </header>
        <div className='list'>
          <ul>
            {list(repos)}
          </ul>
        </div>
      </div>
    );
  }
}

Watcher.propTypes = {
  repos: PropTypes.array.isRequired,
  getWathedRepositories: PropTypes.func.isRequired,
  unWatchRepository: PropTypes.func.isRequired,
}

export default Watcher
