import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { definitions } from '../types/entities/supabase';
import { generateOgpPath } from '../utils/generateOgpPath';
import { supabase } from '../utils/supabaseClient'
import { removeBucketPath } from '../utils/supabaseStorage';

export interface IProfile {
  id: string
  username?: string
  avatar_url?: string
  self_description?: string
  twitter_url?: string
  instagram_url?: string
  website?: string
}

export interface IProfileForm {
  id: string
  username: string
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

  useEffect(() => {
    const setupUser = async () => {
      // @ts-ignore
      if (session?.user.id) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          // @ts-ignore
          .eq("id", session.user.id)
          .single();
        if (error) {
          throw error
        }
        setUser(user);
      }
    };
    setupUser();
  }, [user]);

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
            router.push('/onboarding')
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
    }
    setUpProfile();
  }, [profile])

  const insertProfile =async (request: IProfileForm) => {
    const user = supabase.auth.user()
    try {
      setLoading(true);
      if (user !== null) {
        const formatRequest: IProfile = {
          id: request.id,
          username: request.username,
          self_description: request.self_description || undefined,
          twitter_url: request.twitter_url || undefined,
          instagram_url: request.instagram_url || undefined,
          website: request.website || undefined
        } 

        if (request.avatar) {
          const file = request.avatar
          // const fileExt = file.name.split('.').pop()
          // const fileName = `${Math.random()}.${fileExt}`
          // const filePath = `${fileName}.png`
          const filePath = generateOgpPath();
  
          let {data: inputData ,error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(`${filePath}.png`, request.avatar, {
              contentType: 'image/png',
              cacheControl: '3600',
              upsert: false
            })
  
          if (uploadError) {
            throw uploadError
          }
          
          const key = inputData?.Key
          if (!key) { throw new Error('storage key is undefined')}

          const { data, error: err } = await supabase.storage.from('avatars').getPublicUrl(removeBucketPath(key, "avatars"))
          if (err) { throw err }

          formatRequest.avatar_url = data?.publicURL
        }
  
        const { error } = await supabase.from('profiles').upsert([formatRequest])
  
        if (error) { throw error}
  
        router.push('/')
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
    insertProfile
  };
}