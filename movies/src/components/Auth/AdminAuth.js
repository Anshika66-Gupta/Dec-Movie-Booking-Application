import React from 'react'
import AuthForm from './AuthForm'

const AdminAuth = () => {
  const getData=(data)=>{
    console.log("admin",data)
  }
  return (
    <div>
      <AuthForm onSubmit={getData}/>
    </div>
  )
}

export default AdminAuth