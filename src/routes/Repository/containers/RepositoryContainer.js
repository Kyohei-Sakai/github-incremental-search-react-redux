import { connect } from 'react-redux'
import { actions } from '../modules/repository'
import Repository from '../components/Repository.jsx'

const mapDispatchToProps = {
  searchReposWithKeyword  : actions.searchReposWithKeyword,
  getWathedRepos   : actions.getWathedRepos,
  unWatchRepo       : actions.unWatchRepo,
  watchRepo         : actions.watchRepo,
  selectSortParam         : actions.selectSortParam,
  filterWatchedRepos      : actions.filterWatchedRepos,
}

const mapStateToProps = (state) => ({
  repository : state.repository
})

export default connect(mapStateToProps, mapDispatchToProps)(Repository)
