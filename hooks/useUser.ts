import { SetStateAction, useEffect, useState } from 'react';
import { definitions } from '../types/entities/supabase';
import { supabase } from '../utils/supabaseClient'

export interface IProfile {
  id: string
  username?: string
  avatar_url?: string
  self_description?: string
  twitter_url?: string
  instagram_url?: string
  website?: string
}

export default function useUser() {
  const [session, setSession] = useState()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile>();

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
  }, [session])

  // useEffect(() => {
  //   const setupUser = async () => {
  //     // @ts-ignore
  //     if (session?.user.id) {
  //       const { data: user, error } = await supabase
  //         .from("users")
  //         .select("*")
  //         // @ts-ignore
  //         .eq("id", session.user.id)
  //         .single();
  //       if (error) {throw error}
  //       setUser(user);
  //     }
  //   };
  //   setupUser();
  // }, [session]);

  useEffect(() => {
    const setUpProfile = async () => {
      const user = supabase.auth.user()
      if (user) {
        try {
          setLoading(true);
          let { data, error, status } = await supabase
            .from<definitions['profiles']>('profiles')
            .select('*')
            .eq('id', user?.id)
            .single()
  
          if (error && status !== 406) {
            throw error
          }
  
          if (data) {
            const profile: IProfile = {
              id: user?.id || '',
              username: data.username,
              avatar_url: data.avatar_url,
              self_description: '',
              twitter_url: data.twitter_url,
              instagram_url: data.instaegram_url,
              website: data.website
            }
            setProfile(profile)
          }
        } catch(err) {
          alert(err)
        } finally {
          setLoading(false)
        }
      }
      setUpProfile()
    }
  }, [])

  const insertProfile =async (request: IProfile) => {
    const user = supabase.auth.user()

    if (user !== null) {
      setLoading(true);

      const { error } = await supabase.from('profiles').insert([request])

      if (error) { throw error}

        location.reload()
    }
  }

  function signInWithGoogle() {
    supabase.auth.signIn({ provider: "google" });
  }

  function signInWithGithub() {
    supabase.auth.signIn({ provider: "github" });
  }

  function signOut() {
    supabase.auth.signOut();
    location.reload()
  }

  return {
    session,
    // user,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    profile,
    insertProfile
  };
}