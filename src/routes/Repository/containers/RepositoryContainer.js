import { connect } from 'react-redux'
import { actions } from '../modules/repository'
import Repository from '../components/Repository.jsx'

const mapDispatchToProps = {
  searchReposWithText   : actions.searchAndGetRepos,
  getWathedRepositories : actions.getWathedRepositories,
  unWatchRepository     : actions.unWatchRepository,
  watchRepository       : actions.watchRepository,
}

const mapStateToProps = (state) => ({
  repository : state.repository
})

export default connect(mapStateToProps, mapDispatchToProps)(Repository)
