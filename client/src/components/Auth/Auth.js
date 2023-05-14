import React from 'react'
import AuthForm from './AuthForm'
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import { sendUserAuthRequest } from '../../Api-helpers/api-helpers';

const Auth = () => {
  const dispatch = useDispatch();
  const onResReceived = (data)=>{
     console.log(data);
     dispatch(userActions.login())
     localStorage.setItem("userId", data.id)
  }
  const getData = (data) => {
    console.log("Auth",data);
    sendUserAuthRequest(data.inputs, data.signup)
    .then(onResReceived)
    .catch((err) => console.log(err))
  }
  return (
    <div>
     <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth
