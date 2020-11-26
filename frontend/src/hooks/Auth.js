import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Auth(Component, loginRequired) {
  const apiURL = 'http://localhost:5000'
  function Authentication(props) {
    const [loading, setloading] = useState(true)
    useEffect(() => {
      axios
        .get(apiURL + '/api/user/auth', { withCredentials: true })
        .then(res => {
          if (!res.data.verify) {
            // 로그인이 되어 있지 않을때
            if (loginRequired) {
              props.history.push('/login')
            }
          } else {
            if (!loginRequired) {
              // 로그인 유저가 접근하면 안되는 페이지
              props.history.push('/')
            }
          }
          setloading(false)
        })
    }, [])
    return !loading && <Component {...props} />
  }
  return Authentication
}
