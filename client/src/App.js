/* import './App.css'; */
import { Fragment, useEffect } from 'react'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile'
import AddExperience from './components/profile-form/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';

//Redux
import { Provider } from 'react-redux'
import store from './store';
import { loadUSer } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import AddEducation from './components/profile-form/AddEducation';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(()=>{
    store.dispatch(loadUSer());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Alert/>
          <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profiles' element={<Profiles />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route
                path='/dashboard'
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-profile"
                element={<PrivateRoute> <CreateProfile/> </PrivateRoute>}
              />
              <Route
                path="/edit-profile"
                element={<PrivateRoute> <EditProfile/> </PrivateRoute>}
              />
              <Route
                path="/add-experience"
                element={<PrivateRoute> <AddExperience/> </PrivateRoute>}
              />
              <Route
                path="/add-education"
                element={<PrivateRoute> <AddEducation/> </PrivateRoute>}
              />
              <Route
                path='/posts'
                element={
                  <PrivateRoute>
                    <Posts />
                  </PrivateRoute>
                }
              />
              <Route
                path='/post/:id'
                element={
                  <PrivateRoute>
                    <Post />
                  </PrivateRoute>
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
        </Fragment>
      </Router>
    </Provider>
    
  );
}

export default App;
