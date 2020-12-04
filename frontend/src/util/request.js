import axios from 'axios'
import { toast } from 'react-toastify'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const options = {
  withCredentials: true,
  baseURL,
}

const GET = async (path, params = null) => {
  try {
    const { data, status } = await axios.get(baseURL + path, {
      params,
      ...options,
    })
    return { data, status }
  } catch (err) {
    toast.error(err)
    console.error(err)
  }
}

const POST = async (path, params, contentType = 'application/json') => {
  try {
    const { data, status } = await axios.post(baseURL + path, params, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return { data, status }
  } catch (err) {
    toast.error(err)
    console.error(err)
  }
}

const DELETE = async (path, params = null) => {
  try {
    const { data, status } = await axios.delete(baseURL + path, {
      params,
      ...options,
    })
    return { data, status }
  } catch (err) {
    toast.error(err)
    console.error(err)
  }
}

const PATCH = async (path, params, contentType = 'application/json') => {
  try {
    const { data, status } = await axios.patch(baseURL + path, params, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return { data, status }
  } catch (err) {
    toast.error(err)
    console.error(err)
  }
}

const PUT = async (path, params, contentType = 'application/json') => {
  try {
    const { data, status } = await axios.put(baseURL + path, params, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return { data, status }
  } catch (err) {
    toast.error(err)
    console.error(err)
  }
}

const request = {
  GET,
  POST,
  DELETE,
  PATCH,
  PUT,
}

export default request
