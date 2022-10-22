import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native'
//prettier-ignore
import { Colors, FAB, Provider, Modal, Portal, TextInput } from 'react-native-paper'
import { ReportGroup } from '../../components/ReportGroup'
import DATA from '../../data/procData'
import getReportsysApi from '../../apis/report-sys/getReportsysApi'
import addReportsysApi from '../../apis/report-sys/addReportsysApi'
import removeReportsysApi from '../../apis/report-sys/removeReportsysApi'
import searchUserApi from '../../apis/user/searchUserApi'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import { MyButton } from '../../components/MyButton'

const ItemSeparator = () => (
  <Image
    source={require('../../assets/images/arrow.png')}
    style={{
      width: 30,
      height: 20,
      marginHorizontal: 7,
    }}
  />
)

export function SysMgtScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)
  const [reportsys, setReportsys] = useState([])
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([
    { name: '김형민', position: '통신 분대장' },
    { name: '김형민', position: '통신 분대장' },
    { name: '김형민', position: '통신 분대장' },
    { name: '김형민', position: '통신 분대장' },
  ])
  const [Title, setTitle] = useState('')

  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  useEffect(() => {
    const getAllReportsysHandler = async () => {
      const res = await getReportsysApi()
      setReportsys(res)
    }
    getAllReportsysHandler()
  })

  const AddReportsysHandler = async ({ Title, List }) => {
    const res = await addReportsysApi({ Title, List, Unit: userMe.Unit })
    setReportsys(reportsys.concat(res))
  }

  const removeReportsysHandler = async ({ _id }) => {
    const res = await removeReportsysApi({ _id, Unit: userMe.Unit })
    setReportsys(reportsys.filter((item) => item._id != _id))
  }

  const searchUserHandler = async ({ query }) => {
    const res = await searchUserApi({ query })
    setUsers(users.concat(res))
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <TextInput
              label="보고체계 이름"
              dense={true}
              activeUnderlineColor={'#008275'}
              style={styles.title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              label="보고 인원 추가"
              dense={true}
              style={[styles.textInput]}
              onChangeText={(query) => setQuery(query)}
              right={
                <TextInput.Icon
                  icon="plus"
                  color={query ? '#009975' : Colors.grey500}
                  size={25}
                  style={{ marginTop: 15 }}
                  forceTextInputFocus={false}
                />
              }
              onSubmitEditing={() => {}}
              activeUnderlineColor="#008275"
            />
            <View style={{ width: '85%', alignSelf: 'center' }}>
              <ReportGroup List={users} Title={Title} />
            </View>
            <MyButton text="보고체계 추가" style={{ width: '75%' }} />
          </Modal>
        </Portal>
        <ScrollView>
          <ReportGroup List={DATA.onDuty} Title="당직근무 보고체계" />
          <ReportGroup List={DATA.headquarter} Title="본부중대 보고체계" />
        </ScrollView>
        <FAB
          icon="account-multiple-plus"
          style={styles.fab}
          onPress={showModal}
          color="white"
        />
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  textInput: {
    width: '85%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modal: {
    backgroundColor: Colors.white,
    padding: 20,
    paddingBottom: 15,
    paddingHorizontal: 5,
    margin: 10,
    borderRadius: 15,
  },
  fab: {
    borderRadius: 60,
    height: 56,
    width: 56,
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#009572',
  },
})
