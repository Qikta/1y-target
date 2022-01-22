import { useEffect, useState } from "react"
import Target from "../components/Target";
import { definitions } from "../types/entities/supabase"
import { supabase } from "../utils/supabaseClient"

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
  title: string
  description: string
  value: number
}

export default function useTarget() {
  const[targetList, setTargetList] = useState<ITarget[]>([])
  const [loading, setLoading] = useState(true);
//   const [target, setTarget] = useState()

  useEffect(() => {
      const setupTargetList = async () => {
          try {
            setLoading(true);
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

//   const createTarget = async () => {
//     try {
//         setLoading(true);
//         const { data, error } = await supabase.from('targets').insert({})

//         if (error) { throw error}

//     }
//   }
  return {
      targetList,
      loading
  }
}