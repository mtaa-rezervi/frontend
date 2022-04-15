import { loadSecure } from "./secureStore";
  
// Generate request headers
export async function getRequestHeaders() {
  const auth = (await loadSecure()).auth;

  let requestHeaders = new Headers();
  requestHeaders.append('Accept', 'application/json');
  requestHeaders.append('Authorization', auth);

  return requestHeaders;
}