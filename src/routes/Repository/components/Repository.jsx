import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Repository.scss'
import Searcher from './Searcher.jsx'
import Watcher from './Watcher.jsx'

export class Repository extends Component {

  render() {
    const { repository } = this.props
    const { searchReposWithText, getRepositories } = this.props
    const { getWathedRepositories, changeWatchStatus } = this.props

    return (
      <div className='wrapper'>
        <Searcher
          repos={repository.searchRepos}
          searchReposWithText={searchReposWithText}
          getRepositories={getRepositories}
          limit={repository.reqLimit}
        />
        <Watcher
          repos={repository.watchedRepos}
          getWathedRepositories={getWathedRepositories}
          changeWatchStatus={changeWatchStatus}
        />
      </div>
    );
  }
}

Repository.propTypes = {
  repository: PropTypes.object.isRequired,
  searchReposWithText: PropTypes.func.isRequired,
  getRepositories: PropTypes.func.isRequired,
  getWathedRepositories: PropTypes.func.isRequired,
  changeWatchStatus: PropTypes.func.isRequired,
}

export default Repository
