import { SetStateAction, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'

export default function useUser() {
  const [session, setSession] = useState()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // @ts-ignore
        setSession(session)
      }
    );

    return () => {
      // @ts-ignore
      authListener.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const setupUser = async () => {
      // @ts-ignore
      if (session?.user.id) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          // @ts-ignore
          .eq("id", session.user.id)
          .single();
        setUser(user);
      }
    };
    setupUser();
  }, [session]);

  function signInWithGoogle() {
    supabase.auth.signIn({ provider: "google" });
  }

  function signOut() {
    supabase.auth.signOut();
  }

  return {
    session,
    user,
    signInWithGoogle,
    signOut,
  };
}