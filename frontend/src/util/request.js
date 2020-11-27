import axios from 'axios'

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
    const res = await axios.get(baseURL + path, { params, ...options })
    return res.data
  } catch (err) {
    console.error(err)
  }
}

const POST = async (path, data, contentType = 'application/json') => {
  try {
    const response = await axios.post(baseURL + path, data, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const DELETE = async (path, params = null) => {
  try {
    const response = await axios.delete(baseURL + path, {
      params,
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const PATCH = async (path, data, contentType = 'application/json') => {
  try {
    const response = await axios.patch(baseURL + path, data, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const PUT = async (path, data, contentType = 'application/json') => {
  try {
    const response = await axios.put(baseURL + path, data, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return response.data
  } catch (err) {
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
