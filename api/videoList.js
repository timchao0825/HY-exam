import axios from 'axios'

export const followingList = () => axios.get('http://localhost:3000/following_list')

export const forYouList = () => axios.get('http://localhost:3000/for_you_list')
