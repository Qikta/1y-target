import { User } from '@supabase/gotrue-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { definitions } from '../types/entities/supabase';
import { generateOgpPath } from '../utils/generateOgpPath';
import { supabase } from '../utils/supabaseClient'
import { removeBucketPath } from '../utils/supabaseStorage';

export interface IProfile {
  id: string
  user_name?: string
  avatar_url?: string
  self_description?: string
  twitter_url?: string
  instagram_url?: string
  website?: string
}

export interface IProfileForm {
  id: string
  user_name: string
  avatar?: File
  self_description?: string
  twitter_url?: string
  instagram_url?: string
  website?: string
}

export default function useUser() {
  const [session, setSession] = useState()
  const [loginUser, setLoginUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile>();
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // @ts-ignore
        setSession(session)
        // fetch("/api/auth", {
        //   method: "POST",
        //   headers: new Headers({ "Content-Type": "application/json" }),
        //   credentials: "same-origin",
        //   body: JSON.stringify({ event, session }),
        // }).then((res) => res.json());
      }
    );

    return () => {
      // @ts-ignore
      authListener.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // @ts-ignore
    setLoginUser(supabase.auth.user())
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
  //       if (error) {
  //         throw error
  //       }
  //       setUser(user);
  //     }
  //   };
  //   setupUser();
  // }, []);

  useEffect(() => {
    const setUpProfile = async () => {
      const user = supabase.auth.user()
      if (user) {
        try {
          setLoading(true);
          let { data, error} = await supabase
            .from<definitions['user_profile_view']>('user_profile_view')
            .select('*')
            .match({id: user?.id})
            .single()

          if (error) {
            throw error
          }

          if (!data?.user_name) {
            router.push('/onboarding')
          } else {
            if (data) {
              const profile: IProfile = {
                id: user?.id || '',
                user_name: data.user_name,
                avatar_url: data.avatar_url,
                self_description: data.self_description,
                twitter_url: data.twitter_url,
                instagram_url: data.instagram_url,
                website: data.website
              }
              setProfile(profile)
            }
          }
        } catch(err) {
          alert(err)
        } finally {
          setLoading(false)
        }
      }
    }
    setUpProfile()
  }, [session, setProfile])

  const insertProfile = async (request: IProfile) => {
    const user = supabase.auth.user()
    try {
      setLoading(true);
      if (user !== null) {
        const { error } = await supabase.from('profiles').upsert([request])
  
        if (error) { throw error}
        setProfile(request)
        router.reload()
      } else {
        alert('loginしてください。')
      }
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async () => {
    const user = supabase.auth.user()
    if (user) {
      try {
        setLoading(true);
        const { error } = await supabase.from('users').delete().match({id: user.id})
        if (error) { throw error}
        

        router.push('/')
        location.reload()
      } catch(err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    } else {
      alert('loginしてください')
    }
  }

  function signInWithTwitter() {
    supabase.auth.signIn({ provider: "twitter" });
  }

  function signInWithGoogle() {
    supabase.auth.signIn({ provider: "google" });
  }

  function signInWithGithub() {
    supabase.auth.signIn({ provider: "github" });
  }

  const signout = async () => {
    await supabase.auth.signOut()
    router.reload()
    // router.push('/')
  }

  return {
    session,
    loginUser,
    signInWithTwitter,
    signInWithGoogle,
    signInWithGithub,
    signout,
    profile,
    loading,
    insertProfile,
    deleteUser
  };
}