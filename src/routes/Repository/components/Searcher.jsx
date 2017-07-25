import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Searcher.scss'

export class Searcher extends Component {

  render() {
    const { repos, limit } = this.props
    const { searchReposWithText, watchRepository, changeSortParam } = this.props

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
            <span className='watchers_count'>★ {repo.watchers_count}</span>
          </div>
          <div className='switch-watch'>
            <button
              type='button'
              className='btn btn-outline-success btn-sm'
              value={index}
              onClick={watchRepository}
            >
              watch
            </button>
          </div>
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
        <header>
          <h2>Search</h2>
          <input
            typeof='text'
            className='form-control'
            id="exampleInputEmail1"
            placeholder='Search... repositories'
            onChange={searchReposWithText}
          />
          {alert(limit)}
          <div className='params'>
            <div>
              <div className='sort-setting'>
                <span>sort:</span>
                <select className='sort-param' onChange={changeSortParam}>
                  <option value=''>best match</option>
                  <option value='stars'>stars</option>
                  <option value='forks'>forks</option>
                  <option value='updated'>updated</option>
                </select>
              </div>
            </div>
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

Searcher.propTypes = {
  repos: PropTypes.array.isRequired,
  searchReposWithText: PropTypes.func.isRequired,
  watchRepository: PropTypes.func.isRequired,
  changeSortParam: PropTypes.func.isRequired,
}

export default Searcher
