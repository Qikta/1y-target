import { useRouter } from "next/router"
import { useContext } from "react"
import TargetForm from "../../../../components/TargetForm"
import { GlobalContext } from "../../../../context/global-state-provider"
import useTarget, { ITarget, ITargetForm } from "../../../../hooks/useTarget"
import useUser from "../../../../hooks/useUser"
import { definitions } from "../../../../types/entities/supabase"
import { supabase } from "../../../../utils/supabaseClient"

// @ts-ignore
const Edit = () => {
  const {targetList, profile} = useContext(GlobalContext)
  const router = useRouter()
  const {user, target_id} = router.query
  const targetData = targetList.find(item => item.id === target_id)

  if (!targetData) { return <div className="container my-8 mx-auto px-4 md:px-12">missing data...</div> }
  const target: ITargetForm = {
    id: Number(targetData.id),
    user_name: profile?.user_name ? profile.user_name : '',
    targetDetail: {
      title: targetData?.title || '',
      description: targetData.description,
      value: targetData.value || 0,
      user_id: profile?.id,
      ogp_url: targetData.ogp_url,
      is_complete: targetData.is_complete || false,
    }
  }
    return (
      <div className="container justify-center">
        <TargetForm target={target} mode='EDIT' />
      </div>
    )
}

export default Edit