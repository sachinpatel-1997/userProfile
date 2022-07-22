import {  getUsers, deleteUser, updateUser, getUser, addUser  } from './actions';

import api from "../services/api";


/// add a new user
export const addUserAction = (user, history) => {
    return (dispatch) => {
        api.post('/v1/users', user)
            .then(response => {
                console.log(response);
                dispatch(addUser(response.data))
                history.push("/dashboard");
            })
            .catch(error => {
                console.log("eror", error);
            });
    }
}

export const getUserAction = (id) => {
    return (dispatch) => {
        api.get(`/v1/users/${id}`)
            .then(response => {
                console.log(response);
                dispatch(getUser(response.data)
                );
            })
            .catch(error => {
                console.log(error);
            });
    }
}
 
export const getUsersAction = () => {
    return (dispatch) => {
        api.get('v1/users')
            .then(response => {
                console.log(response);
                /// dispatch function dispatches an action which triggers state changes in the store
                dispatch(getUsers(response.data))
                
            })
            .catch(error => {
                console.log(error);
            });
    }
}


export const deleteUserAction = (id, history) => {
    return (dispatch) => {
        api.delete(`/v1/users/${id}`)
            .then(response => {
                console.log(response);
                dispatch(deleteUser());
                dispatch(getUsersAction());
                history.push("/create")
            })
            .catch(error => {
                console.log(error);
            });
    }
}


export const updateUserAction = (data, id ) => {
    return (dispatch) => {
        api.patch(`/v1/users/${id}`,{
            
            name: data.name,
            email: data.email,
          
        })
            .then(response => {
                // history.push("/dashboard", data);
                console.log(response);
                dispatch(updateUser(response.data));
                dispatch(getUsersAction());
            //    history.push("/dashboard")
                
            })
            .catch(error => {
                console.log(error);
            });
    }
}