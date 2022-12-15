import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image, TouchableOpacity, View, Text, Button, Linking, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { Book } from '../types';
import { getUsername } from '../components/userTokenManager';

import EditScreenInfo from '../components/EditScreenInfo';
// import {} from '../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { Card } from 'react-native-paper';
import MatchScreen from '../screens/MatchScreen';

interface Props {
    item: {
        thumbnail1:string,
        title1: string,
        author1: string,
        condition1: string,
        username1: string,
        email1: string,
        thumbnail2:string,
        title2: string,
        author2: string,
        condition2: string,
        username2: string,
        email2: string
    },
    setCurrentView: Function
}

const ConfirmExchange: React.FC<Props> = ({item, setCurrentView}) => {
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [matchedBooks, setMatchedBooks] = useState([]);
    
    useEffect(()=>{
        console.log(item)
    },[])


    //when 'confirm exchange' button is pressed
  const sendConfirm = async () => {
    try {
      //sends a request to make isAccepted = true
      const post = await axios.put(
        `https://binderapp-server.herokuapp.com/api/matches/exchange/user/${getUsername()}`, {item}
      );
    //   const data = await post.data;
    //   if(data.status === 200) {
    //     console.log("success!")
    //   }
    Alert.alert("exchange confirmed!")
    } catch (err) {
      console.log(err);
    }
  }
//after 'confirm exchange' is pressed, the pop up user rating window will show,
//
    const sendCancel = async () => {
        try {
        //sends a post request to cancel exchange
        const post = await axios.put(
            `https://binderapp-server.herokuapp.com/api/matches/deny/user/${getUsername()}`, {item}
        );
        const data = await post.data;
        // if(data.status === 200) {
        //     console.log("cancelled exchange")
        // }
        Alert.alert("exchange successfully cancelled")
        } catch (err) {
        console.log(err);
        }
    }

    return (
        <View style={styles.item}> 
        
            <TouchableOpacity>
                <Button 
                    title = 'back'
                    onPress={()=> 
                        setCurrentView("all matches")
                    }
                >back to matches</Button>
            </TouchableOpacity>
            <View style={styles.bookContainer}> 
               
                <Image
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    height: 100,
                    width: 100,
                }}
                source={{
                    uri: item.thumbnail1,
                    width: 50,
                    height: 50,
                }}
            />
                <Text style = {styles.bookTitle}>Title: {item.title1}</Text>
                <Text>Author: {item.author1}</Text>
                <Text>Condition: {item.condition1}</Text>
                <Text>User: {item.username1}</Text>
                <Text>Contact:</Text> 
                <Button onPress={() => Linking.openURL(item.email1) }
      title={item.email1} />
            </View>  
            <View style={styles.bookContainer}>
                <Image
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    height: 100,
                    width: 100,
                }}
                source={{
                    uri: item.thumbnail2,
                    width: 50,
                    height: 50,
                }}
                />
                <Text style = {styles.bookTitle}>Title:{item.title2}</Text>
                <Text>Author:{item.author2}</Text>
                <Text>Condition:{item.condition2}</Text>
                <Text>User:{item.username2}</Text>
                <Text>Contact:</Text>
                <Button onPress={() => Linking.openURL(item.email2) }
      title={item.email2} />
            </View>
            <View>
                <TouchableOpacity>
                    <Button 
                        title = 'confirm exchange' 
                        onPress={()=>{
                            setConfirmed(true)
                            sendConfirm();
                        }}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button 
                        title = 'cancel exchange'
                        onPress={()=>sendCancel(item)}
                        />
                </TouchableOpacity>
            </View>
        </View>
    );


}

export default ConfirmExchange;

const styles = StyleSheet.create({
    buttonContainer:{
      flexDirection: 'row'
    },
    root: {
      width: '100%',
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      backgroundColor:'green',
    },
    bookTitle:{
        fontWeight:'bold'
      },
    title: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      
    },
    matchContainer:{
      width:'100%',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      textAlign: 'center',
      //backgroundColor:'red',
    }, 
    bookContainer: {
      //backgroundColor: 'D9D9D9',
      borderRadius: 20,
      height: 300,
      width: '50%',
      justifyContent: 'center',
      // flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff5cf',
  
    },
     item: {
      width: '100%',
    //   flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 13,
      flexWrap: 'wrap',
      //backgroundColor:'blue',
     }, 
     text: {
      alignItems:'flex-start',
      justifyContent: 'center',
      fontSize: 20, 
      fontWeight: 'bold', 
      alignSelf: 'center'
     }
     
  });