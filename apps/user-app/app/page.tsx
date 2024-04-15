"use client"
import {useSelector} from "react-redux";


export default function Page(): JSX.Element {

  const {user} = useSelector((state:any)=>state.userSlice);
  console.log(user)
  return (
        <div  className=" flex bg-black text-white">
            hi there
        </div>
  );
}
