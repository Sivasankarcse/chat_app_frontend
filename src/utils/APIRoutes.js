import {API_HOST} from '@env';

export const registerRoute = `${API_HOST}/api/auth/register`;
export const loginRoute = `${API_HOST}/api/auth/login`;
export const setAvatarRoute = `${API_HOST}/api/auth/setAvatar`;
export const allUsersRoute = `${API_HOST}/api/auth/allUsers`;
export const logoutRoute = `${API_HOST}/api/auth/logout`;
export const sendMessageRoute = `${API_HOST}/api/message/addmsg`;
export const getAllMessagesRoute = `${API_HOST}/api/message/getmsg`;