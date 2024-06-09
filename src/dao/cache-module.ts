let tokenToUserDetailsMap = new Map();

export async function get(token: object) {
  if (token == null) {
    throw new Error("Invalid key, failed to retrieve data from cache");
  }
  return await tokenToUserDetailsMap.get(token);
}

export async function set(token: string, userData: object) {
  await tokenToUserDetailsMap.set(token, userData);
  console.log(tokenToUserDetailsMap, "toketouserDetails");
}

// This function should be in a separate module, because many resources will use it
export async function extractUserDataFromCache(request: any) {
  let authorizationString = request.headers["authorization"];
  // Removing the bearer prefix, leaving the clean token
  let token = await authorizationString.substring("Bearer ".length);
  console.log(token,'token');
  let userData = await tokenToUserDetailsMap.get(token);
  console.log(userData, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  return userData;
};