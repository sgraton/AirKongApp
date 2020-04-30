
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createReduxContainer } from 'react-navigation-redux-helpers';

import ExploreTab from '../components/MainScreen/ExploreTab';
import ProfileTab from '../components/MainScreen/ProfileTab';
import DetailScreen from '../components/DetailScreen';

import Icon from 'react-native-vector-icons/Ionicons';

const tabConfig = {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#FF5A60',
    inactiveTintColor: '#3A3A3A',
    labelStyle: {
      fontSize: 10,
      fontWeight: 'bold'
    },
    tabStyle: {
      paddingBottom: 0,
      borderTopWidth: 1,
      borderTopColor: 'lightgray',
      backgroundColor: 'white'
    },
    style: {
      backgroundColor: 'white',
    },
  },
}

export const MainScreen = createBottomTabNavigator({
  Explore: {
    screen: ExploreTab, 
    navigationOptions: { 
      tabBarLabel: 'EXPLORE', 
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-search'} size={30} color={tintColor}/>
    }
  },
  Profile: {
    screen: ProfileTab,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-person'} size={30} color={tintColor}/>
    },
  },
}, tabConfig);

export const AppNavigator = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: null,
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: 'Code4Startup',
    },
  },
});

class AppWithNavigationState extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    const WrappedInitialAuthRoute = connect(state => ({ state: nav }))(createReduxContainer(AppNavigator));
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#000"/>
        <WrappedInitialAuthRoute />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
