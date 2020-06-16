export function loggedIn() {
  const local = localStorage.getItem("user") || "";
  let signedIn = false;
  if (local !== "") {
    const parse = JSON.parse(local);
    if (typeof parse.accessToken !== "undefined" && parse.accessToken !== "") {
      signedIn = true;
    }
  }
  return signedIn;
}
