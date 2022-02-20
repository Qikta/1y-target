import { createContext, useContext, useState } from "react";
import { GlobalContext } from "../context/global-state-provider";
import useTarget, { ITarget } from "../hooks/useTarget";
import { definitions } from "../types/entities/supabase";
import Target from "./Target";

export const Context = createContext<ITarget>({
  id: '',
  title: '',
  user_name: '',
  description: '',
  value: 0,
  is_complete: false,
  avater_url: '',
  created_date: '',
  ogp_url: ''
})

export default function TargetList() {
  const { loading } = useTarget()
  const {targetList} = useContext(GlobalContext)

if (loading) return (
  <div className="flex justify-center py-16 ">
    <div className="animate-spin h-10 w-10 border-4 border-amber-500 rounded-full border-t-transparent"></div>
  </div>
)

if (!targetList.length) return <div className="container my-8 mx-auto px-4 md:px-12">missing data...</div>

return (
    <div className="container my-8 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
         <div className="w-full px-4">
            <div className="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
               <span className="font-semibold text-lg text-primary mb-2 block">
               Our Services
               </span>
               <h2
                  className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                  >
                  OYT for Everyone
               </h2>
            </div>
          </div>
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {
          targetList.map((item, index) => (
            <Target target={item} key={index} />
          ))
        }
      </div>
    </div>
  )
}