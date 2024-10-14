import './App.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import LoginRegisterLayout from './LoginRegisterLayout.jsx'
import Home from './Pages/Home.jsx'
import Books from './Pages/Books.jsx'
import IssuedBooks from './Pages/IssuedBooks.jsx'
import UserIssuedBooks from './Pages/UserIssued.jsx'
import Users from './Pages/Users.jsx'
import Profile from './Pages/profile.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import AddUser from './Pages/AddUser.jsx'
import AddBook from './Pages/AddBook.jsx'
import AddIssue from './Pages/AddIssue.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='books' element={<Books />} />
        <Route path='issuedbooks' element={<IssuedBooks />} />
        <Route path='userissued' element={<UserIssuedBooks />} />
        <Route path='users' element={<Users />} />
        <Route path='profile' element={<Profile />} />
        <Route path='adduser' element={<AddUser />} />
        <Route path='addbook' element={<AddBook />} />
        <Route path='addissue' element={<AddIssue />} />
        <Route path='*' element={<h1>Not Found</h1>} /> 
      </Route>
      <Route path='' element={<LoginRegisterLayout />} >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
