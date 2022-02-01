import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { definitions } from "../../../../types/entities/supabase";
import { supabase } from "../../../../utils/supabaseClient";

interface PathParams {
  id: string
}

export const getStaticPaths = async () => {
  try {
    const {data, error} = await supabase.from<definitions['target_view']>('target_view').select('*') 
    if (error) {
      throw error
    }

    if (data) {
      const paths = data.map((post) => ({
        params: {
          username: String(post.username),
          target_id: String(post.id)
        },
      }))
      return { paths, fallback: false }
    }
  } catch (err) {
    alert (err)
  } 
}

// @ts-ignore
export const getStaticProps = async ({ params }) => { 
  // ${path.id}とすることで引数pathのidごとのデータを取得する 
  const {data, error} = await supabase
    .from<definitions['target_view']>('target_view')
    .select('*')
    .eq('id', Number(params.target_id))
  
  if (error) { 
    console.log(error);
    throw error }
  if (data) {
    console.log(data);
  }
  const post = JSON.stringify(data)

  // props: {}の形で返却する
  return {
    props: {
      post
    },
  }
}

// @ts-ignore
const Main = ({post}) => {
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div>
      <h1>{ post.id }</h1>
    </div>
  )

}

export default Main
