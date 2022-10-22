import React, { useState, useEffect } from 'react'
import { FAB, Avatar, Colors } from 'react-native-paper'
//prettier-ignore
import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import searchUserApi from '../../apis/user/searchUserApi'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

const Item = ({ Name, Rank, pic, Position }) => (
  <View style={styles.item}>
    <Avatar.Image soruce={{ uri: pic }} size={30} style={styles.image} />
    <Text style={styles.text}>{Rank}</Text>
    <Text style={styles.text}>{Name}</Text>
    <Text style={styles.text}>{Position}</Text>
    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
      <Text style={styles.btnText}>Delete</Text>
    </TouchableOpacity>
  </View>
)

export function UserMgtScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchUserHandler = async () => {
      setData([...(await searchUserApi({ index: 1 }))])
    }
    fetchUserHandler()
  }, [])

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view}>
        {data &&
          data.map((user, idx) => (
            <Item
              Name={user.Name}
              Rank={user.Rank}
              pic={user.pic}
              Position={user.Position}
              key={idx}
            />
          ))}
      </ScrollView>
      <FAB
        icon="account-plus"
        style={styles.fab}
        color="white"
        onPress={() =>
          navigation.navigate('SettingNavigator', { screen: 'UserAddScreen' })
        }
      />
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  view: {
    width: '90%',
  },
  item: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#009572',
    borderRadius: 60,
    height: 55,
    width: 55,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  image: {
    backgroundColor: Colors.grey500,
    marginRight: 5,
  },
  text: {
    fontFamily: 'NunitoSans_400Regular',
    marginRight: 4,
  },
  posText: {
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.grey500,
  },
  btnText: {
    fontFamily: 'NunitoSans_400Regular',
    color: Colors.red400,
    marginRight: 5,
  },
})
