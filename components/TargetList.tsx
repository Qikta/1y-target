import { createContext, useState } from "react";
import useTarget, { ITarget } from "../hooks/useTarget";
import { definitions } from "../types/entities/supabase";
import Target from "./Target";

export const Context = createContext<ITarget>({
  id: '',
  name: '',
  user_name: '',
  description: '',
  value: 0,
  is_complete: false,
  favorite_count: 0,
  avater_url: '',
  created_date: ''
})

export default function TargetList() {
  const { targetList, loading } = useTarget()
  const [stateProp, setStateProp] = useState<ITarget>()

if (loading) return <div>loading...</div>
if (!targetList.length) return <div>missing data...</div>
  return (
    <div className="container my-12 mx-auto px-4 md:px-12 max-w-screen-md">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              {
                targetList.map((target, index) => (
                  <Context.Provider value={target} key={index} >
                    <Target />
                  </Context.Provider>
                ))
              }
        </div>
    </div>
  )
}