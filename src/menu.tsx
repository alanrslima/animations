import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import * as Modules from './modules';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const Menu: React.FC = () => {
  const navigation = useNavigation();

  const getModulesArray = () => {
    const arrModules = [];
    for (let i in Modules) {
      arrModules.push({name: i, component: Modules[i]});
    }
    return arrModules;
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.name)}
        style={styles.containerItem}>
        <Text>{item.name}</Text>
        <Icon name="chevron-right" size={18} color="#CCC" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getModulesArray()}
        keyExtractor={(item) => `${item.name}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Menu;
