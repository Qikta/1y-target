import React, { Children, useState, createContext, } from "react";
import useTarget, { ITarget } from "../hooks/useTarget";

export interface GlobalState {
  targetList: Array<ITarget>
}

export const GlobalContext = createContext<GlobalState>({
  targetList: [],

})

const GlobalStateProvider = ({children}: {children: React.ReactNode}) => {
//   const [state, setState] = useState<GlobalState>()
  const { targetList } = useTarget()

  const global = {targetList}

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  )
}

export default GlobalStateProvider