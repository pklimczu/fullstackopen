import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row'
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/"><AppBarTab text="Repositories" /></Link>
      <Link to="/signin"><AppBarTab text="Sign in" /></Link>
      </ScrollView>
  </View>;
};

export default AppBar;