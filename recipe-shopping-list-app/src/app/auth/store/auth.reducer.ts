import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import {
  authSucess,
  authFail,
  loginStart,
  logout,
  signupStart,
  clearError,
} from './auth.actions';

export interface AuthState {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(authSucess, (state: AuthState, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );
    return { ...state, user, loading: false };
  }),
  on(logout, (state: AuthState) => {
    return { ...state, user: null, authError: null };
  }),
  on(loginStart, (state: AuthState) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(signupStart, (state: AuthState) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authFail, (state: AuthState, action) => ({
    ...state,
    user: null,
    authError: action.errorMsg,
    loading: false,
  })),
  on(signupStart, (state: AuthState) => ({
    ...state,
  })),
  on(clearError, (state: AuthState) => ({
    ...state,
    authError: null,
  })),
  
);
