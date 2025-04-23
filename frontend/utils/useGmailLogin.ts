import * as AuthSession from 'expo-auth-session';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useEffect } from 'react';
import { useAuth } from '../authContext';

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export function useGmailLogin() {
  const {
    gmailAccessToken,
    setGmailAccessToken,
    firebaseReady,
  } = useAuth();

  const redirectUri = makeRedirectUri(); // Generate redirect URI
  const clientId = process.env.WEB_CLIENT_ID!;

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
      redirectUri,
      usePKCE: false,
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  // ✅ Automatically trigger Gmail OAuth once Firebase is ready
  useEffect(() => {
    if (firebaseReady && !gmailAccessToken && request) {
      promptAsync();
    }
  }, [firebaseReady, gmailAccessToken, request]);

  // ✅ Save token if user finishes Gmail OAuth flow
  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setGmailAccessToken(access_token);
    }
  }, [response]);

  return { request, promptAsync };
}
