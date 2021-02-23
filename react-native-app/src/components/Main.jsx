import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background,
    },
});

const Main = () => {
    const [userLogged, setUserLogged] = useState(false);

    return (
        <View style={styles.container}>
            <AppBar userLogged={userLogged} setUserLogged={setUserLogged} />
            <Switch>
                <Route path="/signin" exact>
                    <SignIn setUserLogged={setUserLogged} />
                </Route>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;