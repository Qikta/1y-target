import { useEffect, useState } from "react"
import Target from "../components/Target";
import { definitions } from "../types/entities/supabase"
import { supabase } from "../utils/supabaseClient"
import axios from 'axios'
import { useRouter } from "next/router";
import useUser from "./useUser";

export interface ITarget  {
  id: string
  title: string
  user_name: string
  description: string
  value: number
  is_complete: boolean
  favorite_count?: number
  avater_url: string
  created_date: string
  ogp_url?: string
  user_self_description?: string
  user_twitter_url?: string
  user_instagram_url?: string
  user_website_url?: string
}

export interface ITargetForm {
  user_name: string
  avatar_url?: string
  targetDetail: ITargetFormDetail
}

export interface ITargetFormDetail {
  id?: number
  title: string
  description?: string
  value: number
  user_id?: string
  ogp_url?: string
  is_complete: boolean
}

export interface IFavorite {
  id: number,
  user_id: string,
  target_id: string
}

export default function useTarget() {
  const[targetList, setTargetList] = useState<ITarget[]>([])
  const [favoriteList, setfavoriteList] = useState<Array<IFavorite>>([])
  const [loading, setLoading] = useState(false);
  const [targetForm, setTargetForm] = useState<ITargetForm>()
  const router = useRouter()

  useEffect(() => {
    const setupTargetList = async () => {
      try {
        setLoading(true);
        setTargetList([])
        const { data, error } = await supabase
          .from<definitions['user_target_view']>('user_target_view')
          .select('*')
        
        if (error) {
            throw error
        }
        let tempolaryTargetList: Array<ITarget> = []
        
        if (data) {
          for (const target of data) {
            const optionalCreateTiem = target.created_at !== undefined ? new Date(target.created_at) : undefined
            // const target_favorite_list = favoriteList.filter(item => item.target_id === String(target.id))

            tempolaryTargetList.push({
                id: String(target.id),
                title: target.title || '',
                user_name: target.user_name || '',
                description: target.description || '',
                value: target.value || 0,
                is_complete: target.is_complete || false,
                // favorite_count: target_favorite_list.length || 0,
                avater_url: target.avatar_url || '',
                created_date: optionalCreateTiem?.toLocaleDateString() || '',
                ogp_url: target.ogp_url,
                user_self_description: target.self_description,
                user_twitter_url: target.twitter_url,
                user_instagram_url: target.instagram_url,
                user_website_url: target.website
                
            })
          }
          setTargetList(tempolaryTargetList)
        }
      } catch (err) {
          alert (err)
      } finally {
          setLoading(false)
      }
    }
    setupTargetList()
  }, [])

  useEffect(() => {
    setupFavoriteList()
  }, [])

  const setupFavoriteList = async () => {
    try {
      const { data, error } = await supabase
        .from<definitions['likes']>('likes')
        .select('id, user_id, target_id')

      if (error) { throw error }

      let tempolaryFavoriteList: Array<IFavorite> = []

      if (data) {
        for (const favorite of data){
          tempolaryFavoriteList.push({
            id: favorite.id,
            user_id: favorite.user_id,
            target_id: String(favorite.target_id)
          })
        }
        setfavoriteList(tempolaryFavoriteList)
      }
    } catch (err) {
      alert(err)
    }
  }

  const createTarget = async (request: ITargetForm) => {
    const user = supabase.auth.user()
    if (user !== null) {
      try {
        setLoading(true);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

        await axios.post('/api/ogp', {
          title: request.targetDetail.title,
          user_name: request.user_name,
          avatar_url: request.avatar_url
        }).then((res) => {
          request.targetDetail.ogp_url = res.data.ogp_url
        }).catch((err) => alert(err))
        
        const { error } = await supabase.from('targets').insert([request.targetDetail])

        if (error) { throw error}

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

  const editTarget = async (request: ITargetForm) => {
    const user = supabase.auth.user()
    if (user !== null) {
      try {
        setLoading(true);
        if (request.targetDetail.id) {
          const { error } = await supabase.from('targets').update([request.targetDetail]).match({id: request.targetDetail.id})
          if (error) { throw error}
        }

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

  const deleteTarget = async (request: number) => {
    const user = supabase.auth.user()
    if (user) {
      try {
        setLoading(true);
        const { error } = await supabase.from('targets').delete().match({id: request})
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


  return {
      targetList,
      loading,
      createTarget,
      editTarget,
      deleteTarget,
      favoriteList
  }
}