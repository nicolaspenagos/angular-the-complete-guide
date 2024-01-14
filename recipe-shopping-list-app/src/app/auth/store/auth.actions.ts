import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

const AUTH_SUCESS_ID = '[Auth] Login';
const LOGOUT_ID = '[Auth] Logout';
const LOGIN_START_ID = '[Auth] Login Start';
const AUTH_FAIL_ID = '[Auth] Login Fail';
const SIGNUP_START = '[Auth] Signup Start';
const CLEAR_ERROR_ID = '[Auth] Clear Error';
const AUTH_LOGIN_ID = '[Auth] Auto Login';

export const authSucess = createAction(
  AUTH_SUCESS_ID,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const logout = createAction(LOGOUT_ID);

export const loginStart = createAction(
  LOGIN_START_ID,
  props<{ email: string; password: string }>()
);

export const authFail = createAction(
  AUTH_FAIL_ID,
  props<{ errorMsg: string }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const clearError = createAction(CLEAR_ERROR_ID);

export const autoLogin = createAction(AUTH_LOGIN_ID);
