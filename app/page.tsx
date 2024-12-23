"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Cookies from 'js-cookie';

export default function Home() {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      // Save token to cookies
      Cookies.set('token', response.access_token);

      const token = Cookies.get('token');
      console.log("Token: " + token);
    },
    onError: () => console.error('Login Failed'),
  });

  // Logout function to clear the token
  const logout = () => {
    Cookies.remove('token'); // Remove the token from cookies
    console.log("User logged out");
  };

  return (
    <div>
      {/* <button onClick={() => login()}>Sign in with Google 🚀</button>
      <button onClick={() => logout()}>Logout</button> */}
    </div>
  );
}