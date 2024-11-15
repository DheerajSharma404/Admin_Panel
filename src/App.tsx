import { Toaster } from 'sonner';
import Routes from './Routes';
// import { useAuth } from '@clerk/clerk-react';
// import { useEffect } from 'react';

const App = () => {
   
// const {getToken} =  useAuth()

// const changeRole = async()=>{
//   const token = await getToken()
//   const response = await fetch('http://localhost:4000/api/v1/user/update-role/user_2onGhj3Co9SLucdL48k4O0pemb6',{
//     method:'POST',
//     headers:{
//       'Authorization':`Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       role:'ADMIN'
//     })
//   })
//   console.log(response,'response')
// }
// useEffect(()=>{
//   changeRole()
// },[])
  return (
    <div>
      <Toaster position='top-right' />
    <Routes />
    </div>
  )
}

export default App
