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
          {repo.full_name}
          <input
            type='checkbox'
            checked='checked'
            value={index}
            onClick={unWatchRepository}
          />
        </li>
      ))
    }

    return (
      <div className='watch-container'>
        <button className='btn btn-primary' onClick={getWathedRepositories}>
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
