import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Repository.scss'
import Searcher from './Searcher.jsx'
import Watcher from './Watcher.jsx'

export class Repository extends Component {

  render() {
    const { repository } = this.props
    const { searchReposWithText, watchRepository, changeSortParam } = this.props
    const { getWathedRepositories, unWatchRepository } = this.props

    return (
      <div className='wrapper'>
        <Searcher
          repos={repository.searchRepos}
          searchReposWithText={searchReposWithText}
          limit={repository.reqLimit}
          watchRepository={watchRepository}
          changeSortParam={changeSortParam}
        />
        <Watcher
          repos={repository.watchedRepos}
          getWathedRepositories={getWathedRepositories}
          unWatchRepository={unWatchRepository}
        />
      </div>
    );
  }
}

Repository.propTypes = {
  repository: PropTypes.object.isRequired,
  searchReposWithText: PropTypes.func.isRequired,
  getWathedRepositories: PropTypes.func.isRequired,
  watchRepository: PropTypes.func.isRequired,
  unWatchRepository: PropTypes.func.isRequired,
}

export default Repository
