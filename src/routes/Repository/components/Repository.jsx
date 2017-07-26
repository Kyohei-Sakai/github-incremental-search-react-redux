import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Repository.scss'
import Searcher from './Searcher.jsx'
import Watcher from './Watcher.jsx'

export class Repository extends Component {

  render() {
    const { repository } = this.props
    const { searchReposWithKeyword, watchRepo, selectSortParam } = this.props
    const { getWathedRepos, unWatchRepo, filterWatchedRepos } = this.props

    return (
      <div className='wrapper'>
        <Searcher
          repos={repository.searchedRepos}
          searchReposWithKeyword={searchReposWithKeyword}
          limit={repository.reqLimit}
          watchRepo={watchRepo}
          selectSortParam={selectSortParam}
        />
        <Watcher
          repos={repository.filteredRepos}
          getWathedRepos={getWathedRepos}
          unWatchRepo={unWatchRepo}
          filterWatchedRepos={filterWatchedRepos}
        />
      </div>
    );
  }
}

Repository.propTypes = {
  repository: PropTypes.object.isRequired,
  searchReposWithKeyword: PropTypes.func.isRequired,
  getWathedRepos: PropTypes.func.isRequired,
  watchRepo: PropTypes.func.isRequired,
  unWatchRepo: PropTypes.func.isRequired,
  selectSortParam: PropTypes.func.isRequired,
  filterWatchedRepos: PropTypes.func.isRequired,
}

export default Repository
