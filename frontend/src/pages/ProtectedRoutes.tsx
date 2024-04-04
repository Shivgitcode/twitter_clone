import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

export default function ProtectedRoutes({children}:{children:React.JSX.Element}) {
    // console.log(Component)
    const navigate=useNavigate()
    const {isLoggedIn}=useAppContext()
    useEffect(()=>{
    


        if(!isLoggedIn){
            navigate("/login")
            
        }
    })
  return <div>
  {children}


  </div>
}
