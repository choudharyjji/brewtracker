import React, {Component} from 'react'
import {
  View,
  Text,
} from 'react-native';
import { StackNavigator, navigationOptions } from 'react-navigation';

import NewScreen from '../Containers/NewScreen';
import ExistingScreen from '../Containers/ExistingScreen';
import FinishedScreen from '../Containers/FinishedScreen';
import FavouritesScreen  from '../Containers/FavouritesScreen';
import SampleScreen from '../Containers/SampleScreen';
import Community from '../Containers/CommunityScreen';
import RootContainer from '../Containers/RootContainer';

const AppNavigator = new StackNavigator({
    root: {
        screen: RootContainer,
    },
    newscreen: {
		screen: NewScreen,
	},
    existing: {
        screen: ExistingScreen,
    },
    finished: {
        screen: FinishedScreen,
    },
    favourites: {
        screen: FavouritesScreen,
    },
    sample: {
        screen: SampleScreen,
    },
    community: {
        screen: Community,
}
},{
  navigationOptions: ({ navigation }) => ({
    header: null,
    headerMode: "none"
  }),
});

export default AppNavigator;