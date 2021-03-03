import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import theme from '../theme';
import MainPart from './RepositoryItemComponents/MainPart';
import BottomPart from './RepositoryItemComponents/BottomPart';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundContainer,
        marginBottom: 10,
        padding: 5,
        zIndex: 0
    },
});

export const RepositoryItemContainer = ({ item, showButton }) => {

    if (item === undefined) {
        return <View></View>;
    }

    return (
    <View>
        <View style={styles.container}>
            <MainPart item={item} />
            <BottomPart item={item} showButton={showButton} />
        </View>
    </View>
    );
};

const RepositoryItem = ({ item }) => {
    const history = useHistory();

    const onPressHandler = () => {
        history.push(`/details/${item['id']}`);
    };

    return (
        <TouchableOpacity onPress={onPressHandler}>
            <RepositoryItemContainer item={item} />
        </TouchableOpacity>
    );
};

export default RepositoryItem;