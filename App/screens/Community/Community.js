import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Text
} from 'react-native';
import PropTypes from 'prop-types'
import Gradient from '../../components/Gradient'
import SearchBar from '../../components/SearchBar'
import CommunityCard from '../../components/CommunityCard'
import FilterMenu from '../../assets/images/filter-menu.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import BinaryButton from '../../components/BinaryButton'
import { background, highlight1, highlight4, highlight3, highlight2, silver } from '../../styles/colors';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15
  },
  searchFilterHeader: {
    marginTop: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterMenuButton: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10
  },
  listView: {
    marginTop: 7,
  },
  createButton: {
    borderRadius: 60,
    borderColor: background,
    borderWidth: 1,
    height: 60,
    width: 60,
    backgroundColor: silver(0.8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableCreate: {
    position: 'absolute',
    bottom: 15,
    right: 17,
    zIndex: 1,
    elevation: 5,
  }
}

const PUBLIC_VIEW = 'PUBLIC'
const FRIENDS_VIEW = 'FRIENDS'
const INVITE_VIEW = 'INVITES'

const VIEWS = [
  PUBLIC_VIEW,
  FRIENDS_VIEW,
  INVITE_VIEW,
]

export default class Community extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
    onCreate: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func,
    loading: PropTypes.bool,
    onRefresh: PropTypes.func,
    filters: PropTypes.shape({
      view: PropTypes.oneOf(VIEWS).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    onFilterChange: () => true
  }

  searchText = ''

  handleSearch(searchString) {
    this.searchText = searchString
  }

  handleFilterToggle = (view) => {
    const { onFilterChange } = this.props
    onFilterChange('view', view)
  }

  _renderItem = ({item}) => {
    return (
      <CommunityCard event={item} />
    )
  }

  _keyExtractor = (item) => item.id;

  render() {
    const { events, onRefresh, loading, onCreate, filters } = this.props

    return (
      <Gradient style={styles.container}>
        <View style={styles.searchFilterHeader}>
          <SearchBar onChangeText={this.handleSearch} />
          {/* <TouchableOpacity>
            <Image style={styles.filterMenuButton} source={FilterMenu} />
          </TouchableOpacity> */}
        </View>
        <BinaryButton
          options={VIEWS}
          selected={filters.view}
          onTabChange={this.handleFilterToggle}
        />
        <FlatList
          style={styles.listView}
          data={events}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onRefresh={onRefresh}
          refreshing={loading}
        />
        <TouchableOpacity onPress={onCreate} style={styles.touchableCreate} >
          <View style={styles.createButton} >
            <Ionicons name='md-add' size={45} color={background} style={{margin: 0, padding: 0}}/>
          </View>
        </TouchableOpacity>
      </Gradient>
    )
  }
}

function shouldKeepEvent(event, query = '') {
  if (!query) return true
  let queryWords = query.split(' ')
  for (let word of queryWords) {
    if (event.title.toLowerCase().search(word.toLowerCase()) === -1 && event.description.toLowerCase().search(word.toLowerCase()) === -1) {
      return false;
    }
  }
  return true;
}
