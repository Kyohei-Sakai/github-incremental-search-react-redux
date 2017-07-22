import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
      <a className='navbar-brand'>Github Search</a>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link'>
              <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home <span className='sr-only'>(current)</span></IndexLink>
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link'>
              <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link'>
              <Link to='/repository' activeClassName='page-layout__nav-item--active'>Repository</Link>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <h1>Github Search</h1>
    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
    {' · '}
    <Link to='/repository' activeClassName='page-layout__nav-item--active'>Repository</Link>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
