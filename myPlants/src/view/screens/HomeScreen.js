import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import plants from '../../consts/plants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('screen').width / 2 - 30;
const HomeScreen = ({navigation}) => {
  const categories = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETIC'];
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
          
            activeOpacity={0.8}
            key={index}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                categoryIndex == index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const removeAll = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      Alert.alert("Removed all data")
    }
  catch(exception) {
      console.log(exception)
  }
  }

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() =>navigation.navigate("Details",item)} style={{borderWidth:0}}>
      <View style={style.card}>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: plants.like
                ? 'rgba(245,42,42,0.2)'
                : 'rgba(0,0,0,0.2)',
            }}>
            <Icon
              name="favorite"
              size={18}
              color={item.like ? COLORS.red : COLORS.dark}
            />
          </View>
        </View>
        <View style={{height: 100, alignItems: 'center'}}>
          <Image style={{flex: 1, resizeMode: 'contain'}} source={item.img} />
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{fontSize: 19, fontWeight: 'bold'}}>${item.price}</Text>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize:22,color:COLORS.white,fontWeight:'bold'}}>+</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
  )



 
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
            Welcome to
          </Text>
          <Text style={{fontSize: 38, fontWeight: 'bold', color: COLORS.green}}>
            Plant Shop
          </Text>
        </View>
        <Icon name="shopping-cart" size={28} color="black" onPress={() => navigation.navigate("Cart")} />
      </View>
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <View style={style.searchContainer}>
          <Icon
            name="search"
            size={25}
            color={'black'}
            style={{marginLeft: 20}}
          />
          <TextInput placeholder="search" size={25} style={style.input} />
        </View>
        <View style={style.sortBtn}>
          <Icon name="sort" size={30} color="white" onPress={removeAll} />
        </View>
      </View>
      <CategoryList />
      <FlatList
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        data={plants}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});
