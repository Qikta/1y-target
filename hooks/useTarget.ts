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

export default function useTarget() {
  const[targetList, setTargetList] = useState<ITarget[]>([])
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

        if (data) {
          for (const target of data) {
            const optionalCreateTiem = target.created_at !== undefined ? new Date(target.created_at) : undefined

            targetList.push({
                id: String(target.id),
                title: target.title || '',
                user_name: target.user_name || '',
                description: target.description || '',
                value: target.value || 0,
                is_complete: target.is_complete || false,
                avater_url: target.avatar_url || '',
                created_date: optionalCreateTiem?.toLocaleDateString() || '',
                ogp_url: target.ogp_url
            })
          }
          setTargetList(targetList)
        }
      } catch (err) {
          alert (err)
      } finally {
          setLoading(false)
      }
    }
    setupTargetList()
  }, [])


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
        router.reload()
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
      editTarget
  }
}