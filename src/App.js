import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Switch } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import productApi from './api/picturApi'
import { useEffect, useState } from 'react';
import {pictursFetch} from './features/pictur/picturSlice'
import {useDispatch} from 'react-redux'

function App() {
  const [params, setParams] = useState({
    _page: 1,
    _limit: 10
  })
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPicturList = async () => {
      try {
        
        const response = await productApi.getAll(params)
        console.log(response)
        setPagination(response.pagination)
        dispatch(pictursFetch(response.data))
      } catch (error) {
        console.log('Error', error)
      }
    } 

    fetchPicturList();
  }, [dispatch, params])

  const handleDeleteChange = async (pictur) => {
    try {
      const response = await productApi.remove(pictur.id)
      console.log(response)
       const newParams = {...params}
       setParams(newParams)
  } catch (error) {
      console.log('failed', error)
  }
  }

  const handlePageChange = (newPages) => {
    console.log('NewPages', newPages)
    setParams({
      ...params,
      _page: newPages,
    })
  }

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <div className='link1'>
          <Link to="/user">User</Link>
        </div>
        <div>
          <Home
           pagination={pagination}
           onPageChange={handlePageChange}
           onDeleteChange={handleDeleteChange}
          />
        </div>
        <div>
         <Switch>
           <Route exact path='/user' component={User}/>

           <Route exact path='/user/:picturId' component={User}/>
         </Switch>
        </div>
      </header>
    </div>
    </Router>
  );
}

export default App;
