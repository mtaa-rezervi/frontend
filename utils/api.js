import { loadSecure } from "./secureStore";

import { SERVER_URL } from '../constants';
  
// Generate request headers
export async function getRequestHeaders() {
  const auth = (await loadSecure()).auth;

  let requestHeaders = new Headers();
  requestHeaders.append('Accept', 'application/json');
  requestHeaders.append('Authorization', auth);

  return requestHeaders;
}

// Fetch user profile picture
export async function getProfilePic(setProfilePicURL) {
  const userIdParam = (await loadSecure()).userID;
  const requestHeaders = await getRequestHeaders();

  const response = await fetch(`${SERVER_URL}/users/${userIdParam}`, {
    method: 'GET',
    headers: requestHeaders
  });

  const user = await response.json();
  let picURL = user.profile_pic ? { uri: user.profile_pic } : require('../assets/images/Avatar.png');

  setProfilePicURL({ pic: picURL });
}