import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';
import MainPart from './RepositoryItemComponents/MainPart';
import BottomPart from './RepositoryItemComponents/BottomPart';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundContainer,
        marginBottom: 10,
        padding: 5
    },
});

const RepositoryItem = ({ item }) => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <MainPart item={item} />
                <BottomPart item={item} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default RepositoryItem;