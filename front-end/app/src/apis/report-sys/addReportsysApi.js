import URL from '../../../url'
import asyncStorage from '@react-native-async-storage/async-storage'

const addReportsysApi = async ({ Title, List, Unit }) => {
  try {
    const res = await fetch(URL + '/api/reportsys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${await asyncStorage.getItem('roksrs-token')}`,
      },
      body: JSON.stringify({ Title, List }),
      user: JSON.stringify({ Unit }),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default addReportsysApi
