import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteOne = object => {
  const url = `${baseUrl}/${object.id}`
  return axios.delete(url)
}

const updateOne = object => {
  const url = `${baseUrl}/${object.id}`
  return axios.put(url, object)
}

export default { getAll, create, deleteOne, updateOne }
