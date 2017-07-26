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
            <IndexLink to='/' className='nav-link' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
          </li>
          <li className='nav-item'>
            <Link to='/counter' className='nav-link' activeClassName='page-layout__nav-item--active'>Counter</Link>
          </li>
          <li className='nav-item'>
            <Link to='/repository'　className='nav-link' activeClassName='page-layout__nav-item--active'>Repository</Link>
          </li>
        </ul>
      </div>
    </nav>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
