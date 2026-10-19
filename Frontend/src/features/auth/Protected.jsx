import { Navigate } from 'react-router'
import { useAuth } from './hooks/useAuth'
import Loading from './components/Loading'


const Protected = ({children}) => {
    const {loading, user} = useAuth()


    if(loading){
        return  <Loading/>
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
 
  return children
}

export default Protected