import { Session, User } from "@supabase/supabase-js";
import React, { Children, useState, createContext, useEffect, } from "react";
import useTarget, { IFavorite, ITarget } from "../hooks/useTarget";
import useUser, { IProfile } from "../hooks/useUser";
import { supabase } from "../utils/supabaseClient";

export interface GlobalState {
  targetList: Array<ITarget>
  profile?: IProfile
  session?: Session
  loginUser?: User
  favoriteList: Array<IFavorite>
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
  session: undefined,
  loginUser: undefined,
  favoriteList: []
})


const GlobalStateProvider = ({children}: {children: React.ReactNode}) => {
//   const [state, setState] = useState<GlobalState>()
  const { targetList, favoriteList } = useTarget()
  const { profile, session, user } = useUser()

  const global = {targetList, profile, session, user, favoriteList}

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  )
}

export default GlobalStateProvider