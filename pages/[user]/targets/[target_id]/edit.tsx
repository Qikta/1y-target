import { useRouter } from "next/router"
import TargetForm from "../../../../components/TargetForm"
import useTarget, { ITarget, ITargetForm } from "../../../../hooks/useTarget"
import useUser from "../../../../hooks/useUser"
import { definitions } from "../../../../types/entities/supabase"
import { supabase } from "../../../../utils/supabaseClient"


// @ts-ignore
export const getServerSideProps = async ({ params }) => { 
    // ${path.id}とすることで引数pathのidごとのデータを取得する 
    const {data, error} = await supabase
      .from<definitions['user_target_view']>('user_target_view')
      .select('*')
      .eq('id', params.target_id)
      .single()
    
    if (error) { throw error }
    
    const post = JSON.stringify(data)
  
    // props: {}の形で返却する
    return {
      props: {
        post
      },
    }
  }

// @ts-ignore
const Edit = ({post}) => {
  const seriarisePost = JSON.parse(post)
  const router = useRouter()
  const {profile} = useUser()
  const target: ITargetForm = {
    id: seriarisePost.id,
    user_name: profile?.user_name ? profile.user_name : '',
    targetDetail: {
      title: seriarisePost?.title || '',
      description: seriarisePost.description,
      value: seriarisePost.value || 0,
      user_id: profile?.id,
      ogp_url: seriarisePost.ogp_url,
      is_complete: seriarisePost.is_complete || false,
    }
  }
    
    return (
        <div className="container justify-center">
            edit page
            <TargetForm target={target} mode='EDIT' />
        </div>
    )
}

export default Edit