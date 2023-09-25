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

import Navigation from './components/Navigation.js';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Messages from './pages/Messages';
import Chef from './pages/Chef/Chef.js';

const queryClient = new QueryClient()

function App() {

  const { user } = useAuthContext();

  const [tables, setTables] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let local_Tables = window.localStorage.getItem('tables');
    let local_Items = window.localStorage.getItem('items');

    if (local_Tables && local_Items) {

      setTables(JSON.parse(local_Tables));
      setItems(JSON.parse(local_Items));
    } else {
      apiService.fetchTables(setTables);
      apiService.fetchItems(setItems);
    }
  }, [])

  // useEffect(() => {
  //   apiService.fetchTables(setTables);
  //   apiService.fetchItems(setItems);
  // }, [])

  useEffect(() => {
    window.localStorage.setItem('tables', JSON.stringify(tables));
    window.localStorage.setItem('items', JSON.stringify(items));
  }, [tables, items])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navigation />
        <div className="main">
          <ItemsContext.Provider value={{ items, setItems }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/items' element={<ItemsList />} />
              <Route path='/tables' element={<Tables tables={tables} setTables={setTables} />} />
              <Route path='/tables/:number' element={<TableView tables={tables} setTables={setTables} />} />

              <Route path='/chef' element={user && <Chef />} />
              <Route path='/staff' element={user && <Users />} />
              <Route path='/messages' element={<Messages />} />


              <Route path='/my-account' element={user && <Account />} />

              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />

            </Routes>
          </ItemsContext.Provider>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
