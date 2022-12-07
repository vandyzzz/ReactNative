import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailsScreen = ({navigation,route}) => {
  const plant = route.params;
  const [count, setCount] = React.useState(countValue);
  const countValue = 1
  console.log(plant);
  return (
   <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
    <View style={styles.header}>
      <Icon name='arrow-back' size={28} onPress={() => navigation.goBack()}/>
    </View>
    <View style={styles.imgContainer}>
      <Image source={plant.img} style={{resizeMode:'contain', flex:1}}>
      </Image>
    </View>
    <View style={styles.detailsContainer}>
      <View style={{marginLeft:20,flexDirection:'row',alignItems:'flex-end'}}>
      <View style={styles.line} />
        <Text style={{fontSize:20,fontWeight:'bold'}}>
          Best Choice
        </Text>
      </View>
      
      <View style={{marginLeft:20,marginTop:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{fontSize:22,fontWeight:'bold'}}>
          {plant.name}
        </Text>
        <View style={styles.priceTag}>
          <Text style={{marginLeft:15,color:COLORS.white,fontWeight:'bold',fontSize:16}}>
           $ {plant.price}
          </Text>
        </View>
        
      </View>
      <View style={{paddingHorizontal:20,marginTop:10}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>
            About
          </Text>
          <Text style={{color:"grey",fontSize:16,lineHeight:22,marginTop:10}}>
            {plant.about}
          </Text>
          <View style={{marginTop:40,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>
                  -
                </Text>
                
              </View>
              <Text style={{fontSize:20,marginHorizontal:10,fontWeight:'bold'}}>
                {countValue}
              </Text>
              <TouchableOpacity onPress={setCount}>
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>
                  +
                </Text>
                
              </View>
              </TouchableOpacity>
              
            </View>
            <View style={styles.buyBtn}>
              <Text style={{color:COLORS.white,fontSize:18,fontWeight:'bold'}}>
                Buy
              </Text>
            </View>
          </View>
        </View>
    </View>
   </SafeAreaView>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  header:{
    paddingHorizontal:20,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  imgContainer:{
    flex:0.45,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center'
  },
  detailsContainer:{
    flex:0.55,
    backgroundColor:COLORS.white,
    marginHorizontal:7,
    marginBottom:7,
    borderRadius:20,
    marginTop:30,
    paddingTop:30,
    borderWidth:2
  },
  line:{
    width:25,
    height:2,
    backgroundColor:COLORS.dark,
    marginBottom:5,
    marginRight:3,
    borderWidth:2
  },
  priceTag:{
    backgroundColor:COLORS.green,
    width:80,
    height:40,
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
    justifyContent:'center'
  },
  borderBtn:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:5,
    height:40,
    width:60,
    justifyContent:'center',
    alignItems:'center'
  },
  borderBtnText:{
    fontWeight:'bold',
    fontSize:28
  },
  buyBtn:{
    width:150,
    height:50,
    backgroundColor:COLORS.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30
  }
})