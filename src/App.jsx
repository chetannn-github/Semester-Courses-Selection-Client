import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/homepage"
import ProfilePage from "./pages/ProfilePage"
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useEffect } from "react";


function App() {
  let handleUserInfo = useGetUserInfo();
  useEffect(() => { handleUserInfo() }, [])

  return (
  <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}> </Route>
      <Route path="/profile" element={<ProfilePage/>}></Route>
    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
