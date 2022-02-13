import { Session, User } from "@supabase/supabase-js";
import React, { Children, useState, createContext, useEffect, } from "react";
import useTarget, { ITarget } from "../hooks/useTarget";
import useUser, { IProfile } from "../hooks/useUser";
import { supabase } from "../utils/supabaseClient";

export interface GlobalState {
  targetList: Array<ITarget>
  profile?: IProfile
  session?: Session
  user?: User
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
  user: undefined
})

// @ts-ignore
// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req);
//   console.log(user);
  
//   if (!user) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
  
//   return { props: { user } };
// }

const GlobalStateProvider = ({children}: {children: React.ReactNode}) => {
//   const [state, setState] = useState<GlobalState>()
  const { targetList } = useTarget()
  const { profile, session, user } = useUser()

  const global = {targetList, profile, session, user }

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  )
}

export default GlobalStateProvider