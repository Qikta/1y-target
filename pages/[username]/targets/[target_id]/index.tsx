import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ITarget } from "../../../../hooks/useTarget";
import { definitions } from "../../../../types/entities/supabase";
import { supabase } from "../../../../utils/supabaseClient";
import dynamic from "next/dynamic";
import { HeatMapValue } from "@uiw/react-heat-map";
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from "react-share";
import Seo from "../../../../components/SeoHeader"

// @ts-ignore
const HeatMap = dynamic(() => import("@uiw/react-heat-map").then((mod) => mod.default),{ ssr: false });
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
const Main = ({ post}) => {
  const seriarisePost = JSON.parse(post)
  const router = useRouter()
  const optionalCreateTiem = seriarisePost.created_at !== undefined ? new Date(seriarisePost.created_at) : undefined

  const target: ITarget = {
    id: String(seriarisePost.id),
    name: seriarisePost?.name || '',
    user_name: seriarisePost.username || '',
    description: seriarisePost.description || '',
    value: seriarisePost.value || 0,
    is_complete: seriarisePost.is_complete || false,
    favorite_count: seriarisePost.favorite_count || 0,
    avater_url: seriarisePost.avatar_url || '',
    created_date: optionalCreateTiem?.toLocaleDateString() || '',
    ogp_url: seriarisePost.ogp_url
  }

  const heatmapValue: Array<HeatMapValue> = [
    { date: '2022/01/11', count:2, content: '' },
    { date: '2022/04/12', count:2, content: '' },
    { date: '2022/05/01', count:5, content: '' },
    { date: '2022/05/02', count:5, content: '' },
    { date: '2022/05/03', count:1, content: '' },
    { date: '2022/05/04', count:11, content: '' },
    { date: '2022/05/08', count:32, content: '' }
  ];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  
  return (
    <>
      <Seo 
        pageTitle={ target.name }
        pageDescription={ target.description }
        pagePath={`${baseUrl}${router.asPath}`}
        pageImg={ target.ogp_url}
        pageImgWidth={1280}
        pageImgHeight={960}
      />
      <div className="container px-5 py-5 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="overflow-hidden">
            { target.ogp_url &&
              <img alt="content" className="object-cover object-center h-full w-full" src={target.ogp_url} />
            }
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <img alt="content" className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400" src={target.avater_url} />
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{ target.user_name }</h2>
                <div className="w-12 h-1 bg-amber-400 rounded mt-2 mb-4"></div>
                <p className="text-base">Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.</p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                { target.description }
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-auto sm:w-full md:w-full lg:w-4/6">
          {/* @ts-ignore */}
          <HeatMap value={ heatmapValue }
            style={{ color: '#a3a3a3', width: '100%' }}
            panelColors={{
              0: '#f3f4f6',
              2: '#fef3c7',
              4: '#fde68a',
              10: '#fbbf24',
              20: '#d97706',
              30: '#78350f',
            }}
            weekLabels={[,'Mon',,'Wed',,'Fri',]}
            startDate={new Date('2022/01/01')}
          />
        </div>
        <div className="lg:w-4/6 mx-auto">
        <TwitterShareButton url={`${baseUrl}${router.asPath}`} title={ target.name }>
          <TwitterIcon size={30} round={true} />
        </TwitterShareButton>
        </div>
      </div>
    </>
    
  )
}

export default Main
