import { RouterProvider } from "react-router"
import { router } from "./App.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { useNavigate } from "react-router";

function App() {
  
  return (
    <>
    <AuthProvider>
     <RouterProvider router={router}/>
    </AuthProvider>
    </>
  )
}

export default App
