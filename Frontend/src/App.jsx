import { RouterProvider } from "react-router"
import { router } from './app.routes.jsx'
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/Interview.context.jsx"
  import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router}/>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </InterviewProvider>
      </AuthProvider>
    </>
  )
}

export default App