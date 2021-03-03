import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './misc/ItemSeparator';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../theme';

const styles = StyleSheet.create({
  headerContainer: {
      flexDirection: 'row',
      padding: 5,
      paddingTop: 0,
      justifyContent: 'center',
      backgroundColor: 'white',
      alignItems: 'center',
      minHeight: 40,
      zIndex: 30
  },

  optionStyle: {
    justifyContent: 'center',
    margin: 5,
    flex: 0.15,
    fontSize: theme.fontSizes.body,
  },

  dropDownPickerStyle: {
    height: 30,
    flex: 0.85,
    margin: 5,
    zIndex: 30
  },

  flatList: {
    marginBottom: 150
  }
});

const Header = ({ items, updateOrderMethod, orderMethod }) => {

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.optionStyle}>Sort by:</Text>
        <DropDownPicker
            items={items}
            defaultValue={orderMethod["value"]}
            containerStyle={styles.dropDownPickerStyle}
            itemStyle={{
                justifyContent: 'flex-start',
                height: 30
            }}
            onChangeItem={item => updateOrderMethod(item)}
        />
  </View>
);
};

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return <FlatList
    style={styles.flatList}
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryItem item={item} />}
    onEndReached={onEndReach}
    onEndReachedThreshold={0.5}
  />;
};

const RepositoryList = () => {
  const sortItems = [
    {label: 'default', value: 'default', realValue: { }},
    {label: 'created at descending', value: 'createdDesc', realValue: { orderBy: "CREATED_AT", orderDirection: "DESC" }},
    {label: 'created at ascending', value: 'createdAsc', realValue: { orderBy: "CREATED_AT", orderDirection: "ASC" }},
    {label: 'rating average descending', value: 'ratingDesc', realValue: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }},
    {label: 'rating average ascending', value: 'ratingAsc', realValue: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" }},
  ];
  const [orderMethod, setOrderMethod] = useState(sortItems[0]);
  const updateOrderMethod = (value) => {
    const item = sortItems.find(entry => entry.value == value.value);
    setOrderMethod(item);
  };

  const { repositories, fetchMore } = useRepositories({ orderMethod, first: 4 });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View>
      <Header items={sortItems} updateOrderMethod={updateOrderMethod} orderMethod={orderMethod} />
      <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} />
    </View>
  );
};

export default RepositoryList;