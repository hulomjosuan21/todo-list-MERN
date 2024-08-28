export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (value) => {
  return {
     type: LOGIN_USER,
     payload: value
  };
};

export const logoutUser = () => {
  return {
     type: LOGOUT_USER,
     payload: null
  };
};