import './css/App.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { QueryClientProvider, QueryClient } from 'react-query'

import ItemsContext from './contexts/ItemsContext.js';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Tables from './components/Tables/Tables.js';
import TableView from './components/Tables/TableView.js';
import ItemsList from './components/Items/ItemsList.js';

import * as apiService from './services/apiService.js'

import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Messages from './pages/Messages';
import Chef from './pages/Chef/Chef.js';
import NavToggle from './components/NavToggle/NavToggle';
import NavSidebar from './components/NavToggle/NavSidebar';

const queryClient = new QueryClient()

function App() {

  const { user } = useAuthContext();

  const [tables, setTables] = useState(JSON.parse(window.localStorage.getItem('tables')));
  const [items, setItems] = useState(JSON.parse(window.localStorage.getItem('items')));

  const [toggle, setToggle] = useState(false)

  useEffect(() => {

    // if (items) {
    //   window.localStorage.setItem('items', JSON.stringify(items))
    // } else {
    //   apiService.fetchItems().then(data => {
    //     setItems(data)
    //   })
    // }

    apiService.fetchTables().then(data => {
      window.localStorage.setItem('tables', JSON.stringify(data))
    })

    apiService.fetchItems().then(data => {
      window.localStorage.setItem('items', JSON.stringify(data))
    })

  }, [])


  return (
    <QueryClientProvider client={queryClient}>
      <div className="body" >
        {/* <Navigation /> */}

        {!toggle && <NavToggle setToggle={setToggle} />}

        {toggle && <NavSidebar setToggle={setToggle} />}

        {!toggle &&
          <div className="main">
            <ItemsContext.Provider value={{ items, setItems }}>

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/items' element={<ItemsList />} />
                {user?.role !== 401 && <Route path='/tables' element={<Tables tables={tables} setTables={setTables} />} />}
                {user && user?.role !== 401 && <Route path='/tables/:number' element={<TableView tables={tables} setTables={setTables} />} />}

                {user && user?.role !== 401 && <Route path='/chef' element={<Chef />} />}
                {user && <Route path='/staff' element={user?.role === 1984 ? <Users /> : <Navigate to='/my-account' />} />}
                {user && user?.role !== 401 && <Route path='/messages' element={<Messages />} />}


                <Route path='/my-account' element={user && <Account />} />

                <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
                <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />

                <Route path='/*' element={!user ? <Login /> : <Navigate to='/' />} />


              </Routes>
            </ItemsContext.Provider>
          </div>}
      </div>
    </QueryClientProvider>
  );
}

export default App;
