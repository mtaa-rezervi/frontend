import * as SecureStore from "expo-secure-store";

export async function saveKeyValue(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    alert('token is not stored');
  }
}

// Load data stored in SecureStore 
export async function loadSecure() {
  const token = await getValueFor('bearer');
  const userID = await getValueFor('_id');
  let auth = ('Bearer ' + token).replace(/"/g, '');
  let userIdParam = userID.replace(/"/g, '');

  return { auth: auth, userID: userIdParam };
}
  
