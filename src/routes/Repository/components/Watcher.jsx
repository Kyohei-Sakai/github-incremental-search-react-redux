import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Watcher.scss'

export class Watcher extends Component {

  render() {
    const { repos } = this.props
    const { getWathedRepos, unWatchRepo, filterWatchedRepos } = this.props

    const list = (repos) => {
      return repos.map((repo, index) => {
        return (index >= 50)
          ? null
          : (
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
              <div className='watch-toggle'>
                <button
                  type='button'
                  className='btn btn-outline-danger btn-sm'
                  value={index}
                  onClick={unWatchRepo}
                >
                  Unwatch
                </button>
              </div>
            </li>
          )
      })
    }

    return (
      <div className='watch-container'>
        <header>
          <h2>Watched</h2>
          <div className='search'>
            <input
              typeof='text'
              className='form-control'
              placeholder='Filter keyword'
              onChange={filterWatchedRepos}
            />
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={getWathedRepos}
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
  getWathedRepos: PropTypes.func.isRequired,
  unWatchRepo: PropTypes.func.isRequired,
}

export default Watcher
