import axios from "axios";
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types'
import setAuthToken from "../utils/setAuthToken";

//Load user

export const loadUSer = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:5000/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//Register user

export const register = ( { name, email, password } ) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ name , email, password });

    try {
        const res = await axios.post('http://localhost:5000/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUSer());

    } catch (error) {

        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type:REGISTER_FAIL
        });
    }
}

//Login user

export const login = (email, password) => async (dispatch) => {
    const body = { email, password };
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth', body);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
  
      dispatch(loadUSer());
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // Verifica que err.response, err.response.data y err.response.data.errors estén definidos
        const errors = err.response.data.errors;
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      } else if (err.request) {
        // Error de red, el servidor no respondió
        console.error('Error de red: El servidor no respondió');
        dispatch({
          type: LOGIN_FAIL,
        });
      } else {
        // Otros errores
        console.error('Error inesperado:', err.message);
      }
    }
  };

 

  // Logout
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}
 

