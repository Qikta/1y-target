import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile>();
  const router = useRouter()

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
    loading,
    insertProfile
  };
}