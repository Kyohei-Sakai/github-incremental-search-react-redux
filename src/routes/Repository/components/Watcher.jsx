import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Watcher.scss'

export class Watcher extends Component {

  render() {
    const { repos } = this.props
    const { getWathedRepositories, unWatchRepository } = this.props

    const list = (repos) => {
      return repos.map((repo, index) => (
        <li key={repo.full_name}>
          <img
            className='avatar'
            src={repo.owner.avatar_url}
            alt='avatar'
            id={repo.owner.id}
          />
          {repo.full_name}
          <button
            type='button'
            className='btn btn-outline-success btn-sm'
            value={index}
            onClick={unWatchRepository}
          >
            Unwatch
          </button>
        </li>
      ))
    }

    return (
      <div className='watch-container'>
        <button className='btn btn-primary btn-watched' onClick={getWathedRepositories}>
          Show Watched Repos
        </button>
        <ul>
          {list(repos)}
        </ul>
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
