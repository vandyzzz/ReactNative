import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import plants from '../../consts/plants';


const Cart =  ({navigation}) => {
    const [product, setProduct] = React.useState();
    const [total, setTotal] = React.useState(null);
   
    React.useEffect(() => {
       
          getDataFromDB();
      }, []);
      
      //get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
        plants.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      
    } else {
      setProduct(false);
     
    }
  };


      
  
  return (
    <SafeAreaView>
      <View style={styles.cartHeader}>
        <View>
            <Icon name='arrow-back' size={28} color={COLORS.dark} onPress={() => navigation.navigate("Home")}/>
        </View>
        <View style={styles.cartText}>
        <Text style={{fontSize:28,fontWeight:'bold',color:COLORS.green}}>Cart Items</Text>
        </View>
      <View style={styles.trashIcon}>
        <Icon name='delete' size={28} color={COLORS.dark}/>
      </View>
      </View>
      <View>
        <Text>
            {plants.name}
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
    cartHeader:{
        borderWidth:2,
        marginTop:20,
        height:80,
        flexDirection:'row',
        alignItems:'center',
        
    },
    cartText:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
        
    },
    trashIcon:{
        justifyContent:'flex-end',
        marginRight:10
       
    }
})