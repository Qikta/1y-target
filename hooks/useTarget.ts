import { useEffect, useState } from "react"
import Target from "../components/Target";
import { definitions } from "../types/entities/supabase"
import { supabase } from "../utils/supabaseClient"
import axios from 'axios'

export interface ITarget  {
  id: string
  name: string
  user_name: string
  description: string
  value: number
  is_complete: boolean
  favorite_count: number
  avater_url: string
  created_date: string
}

export interface ITargetForm {
  name: string
  description?: string
  value: number
  user_id?: string
  ogp_url?: string 
}

export default function useTarget() {
  const[targetList, setTargetList] = useState<ITarget[]>([])
  const [loading, setLoading] = useState(true);
  const [targetForm, setTargetForm] = useState<ITargetForm>()

  useEffect(() => {
      const setupTargetList = async () => {
          try {
            setLoading(true);
            setTargetList([])
            const { data, error } = await supabase
            .from<definitions['targets_info_view']>('targets_info_view')
            .select('*')
            
            if (error) {
                throw error
            }

            if (data) {
                for (const target of data) {
                    const optionalCreateTiem = target.created_at !== undefined ? new Date(target.created_at) : undefined

                    targetList.push({
                        id: String(target.id),
                        name: target.name || '',
                        user_name: target.username || '',
                        description: target.description || '',
                        value: target.value || 0,
                        is_complete: target.is_complete || false,
                        favorite_count: target.favorite_count || 0,
                        avater_url: target.avatar_url || '',
                        created_date: optionalCreateTiem?.toLocaleDateString() || ''
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

      await axios.post('api/ogp', {
          title: request.name,
          user_name: 'test'
        }).then((res) => {
          request.ogp_url = res.data.ogp_url
        }).catch((err) => alert(err))
        
        const { error } = await supabase.from('targets').insert([request])

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
  return {
      targetList,
      loading,
      createTarget
  }
}