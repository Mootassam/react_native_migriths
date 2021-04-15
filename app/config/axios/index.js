import axios from 'axios'
import Config from 'react-native-config'

export const request = axios.create({
  baseURL: Config.API_URL,
  timeout: parseInt(Config.REQUEST_TIMEOUT)
})