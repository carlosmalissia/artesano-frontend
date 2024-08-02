// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    editingReviewId: null,
    editedComment: "",
  },
  reducers: {
    getlogindata: (state) => {
      if (!state.user && !state.token) {
        const userDataString = localStorage.getItem('user');
        const token = localStorage.getItem('token');


        const userData = JSON.parse(userDataString);

        if (userData) {
          state.user = userData;
          state.token = token;
        }
      }
    },
    loginUser: (state, action) => {
      console.log(action.payload);
      console.log(action.payload.accessToken);
      // Almacena la información del usuario y el token en el estado
      state.user = action.payload; //ok
      state.token = action.payload.accessToken; //ok
      // Almacena también en el localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.accessToken);
    },
    logoutUser: (state) => {
      // Limpia la información del usuario y el token del estado
      state.user = null;
      state.token = null;
      // Limpia también el localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setEditingReviewId: (state, action) => {
      state.editingReviewId = action.payload;
    },
    setEditedComment: (state, action) => {
      state.editedComment = action.payload;
    },
  },
});

export const { loginUser, logoutUser, getlogindata, setEditingReviewId, setEditedComment } = authSlice.actions;

export default authSlice.reducer;

