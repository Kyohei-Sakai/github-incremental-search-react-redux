import React from 'react'
import PropTypes from 'prop-types'

export const Searcher = ({ repository, searchReposWithText }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Repositories</h2>
    <div>
      <input
        typeof='text'
        style={{ margin: '30px auto'}}
        placeholder="Search..."
        onChange={searchReposWithText}></input>
      <h3>{repository}</h3>
    </div>
  </div>
)
Searcher.propTypes = {
  repository: PropTypes.string.isRequired,
  searchReposWithText: PropTypes.func.isRequired,
}

export default Searcher
