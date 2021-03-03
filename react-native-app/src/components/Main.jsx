import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import CreateReview from './review/CreateReview';
import MyReviews from './review/MyReviews';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepositoryItem from './SingleRepositoryItem';

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
                <Route path="/signup" component={() => <SignUp />} />
                <Route path="/details/:id" component={({ match }) => <SingleRepositoryItem match={match} showButton={true} />} />
                <Route path="/createReview" component={() => <CreateReview />} />
                <Route path="/myReviews" component={() => <MyReviews />} />
                <Route path="/" component={() => <RepositoryList />} />
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;