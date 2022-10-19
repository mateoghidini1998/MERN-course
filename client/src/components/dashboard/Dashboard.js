import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({
   getCurrentProfile,
   deleteAccount,
   auth: { user },
   profile: { profile, loading } 
  }) => {

  useEffect(()=>{
    getCurrentProfile();
  }, [getCurrentProfile])

  return loading && profile == null ? <Spinner/> : <Fragment>
    <div className="container">
    <h1 className="large text-primary">
      Dashboard
    </h1>
    <p className="lead"><i className="fas fa-user" aria-hidden="true">Welcome {user && user.name} </i></p>    
    </div>
    {profile !== null ? 
    <Fragment>
      <div className="container">
        <DashboardActions/>
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        <div className="my-2">
          <button className="btn btn-danger" onClick={()=>deleteAccount()}>
            <i className="fas fa-user-minus"></i>Delete My Account
          </button>
        </div>
      </div>
    </Fragment> : 
    <Fragment>
      <div className="container">
        <p>You have not yet set up a profile - Please add some info</p>
        <Link to="/create-profile" className='btn btn-primay my-1'>Create Profile</Link>
        
      </div>
    </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mappedStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mappedStateToProps, { getCurrentProfile, deleteAccount }) (Dashboard);