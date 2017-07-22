import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'repository',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Repository = require('./containers/RepositoryContainer').default
      const reducer = require('./modules/repository').default

      /*  Add the reducer to the store on key 'searcher'  */
      injectReducer(store, { key: 'repository', reducer })

      /*  Return getComponent   */
      cb(null, Repository)

    /* Webpack named bundle   */
    }, 'repository')
  }
})
