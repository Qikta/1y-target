import { Session } from "@supabase/supabase-js";
import React, { Children, useState, createContext, useEffect, } from "react";
import useTarget, { ITarget } from "../hooks/useTarget";
import useUser, { IProfile } from "../hooks/useUser";

export interface GlobalState {
  targetList: Array<ITarget>
  profile?: IProfile
  session?: Session
}

export const GlobalContext = createContext<GlobalState>({
  targetList: [],
  profile: {
    id: '',
    user_name: '',
    avatar_url: '',
    self_description: '',
    twitter_url: '',
    instagram_url: '',
    website: ''
  },
  session: undefined
})

const GlobalStateProvider = ({children}: {children: React.ReactNode}) => {
//   const [state, setState] = useState<GlobalState>()
  const { targetList } = useTarget()
  const { profile, session } = useUser()

  const global = {targetList, profile, session }

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  )
}

export default GlobalStateProvider