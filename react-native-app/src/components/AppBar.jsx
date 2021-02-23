import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row'
  },
});

const AppBar = ({ userLogged, setUserLogged }) => {
  const signOut = useSignOut({setUserLogged});

  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/"><AppBarTab text="Repositories" /></Link>
      {userLogged 
        ? <TouchableHighlight onPress={async () => await signOut()}><AppBarTab text="Sign out" /></TouchableHighlight> 
        : <Link to="/signin"><AppBarTab text="Sign in" /></Link>}
      </ScrollView>
  </View>;
};

export default AppBar;