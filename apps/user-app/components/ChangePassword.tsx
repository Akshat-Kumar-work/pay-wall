"use client"

import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput"
import { useSelector } from "react-redux"
import { Button } from "@repo/ui/button"
import { changePassword } from "../app/lib/changePassAction"
import { useState } from "react"

const changePasswordComponent = () => {

  const user = useSelector( (state:any)=>state.user);
  console.log(user?.user);

      const [password , setPassword] = useState("");

  return (
    <div className=" w-full flex  flex-col">

      <Card title="DASHBOARD">

        <div className=" p-3">Name- {user.user?.name}</div>

        <div className=" p-3">Gmail- 
          {user.user?.email}</div>

        <div className=" p-3">
        <TextInput   placeholder="Password" label="Change Password" onChange={(password)=>{setPassword(password)}} />
        </div>

        <div className=" p-3">
        <Button  onClick={ async()=>{await changePassword(password); setPassword(""); window.location.reload()}} >Change Password</Button>
        </div>

      </Card>
    </div>
  )
}

export default changePasswordComponent;