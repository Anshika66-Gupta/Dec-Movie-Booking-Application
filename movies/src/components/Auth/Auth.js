import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../API-Helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'

const Auth = () => {
  const dispatch = useDispatch();
  const onResReceived = (data) =>{
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem("userId", data.id)
  }
  const getData = (data) => {
    console.log("Calling to",data)
    sendUserAuthRequest(data.inputs, data.signup)
    .then(onResReceived)
    .catch((err) => {console.log(err)});
  }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}
 
export default Auth