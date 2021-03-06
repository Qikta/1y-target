import { Router, useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useTarget, { ITarget } from "../../../../hooks/useTarget";
import { definitions } from "../../../../types/entities/supabase";
import { supabase } from "../../../../utils/supabaseClient";
import dynamic from "next/dynamic";
import { HeatMapValue } from "@uiw/react-heat-map";
import { TwitterShareButton, FacebookShareButton, LineShareButton, HatenaShareButton, TwitterIcon, FacebookIcon, LineIcon, HatenaIcon } from "react-share";
import Seo from "../../../../components/SeoHeader"
import Link from "next/link";
import useUser from "../../../../hooks/useUser";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { GlobalContext } from "../../../../context/global-state-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
// @ts-ignore
import Modal from 'react-modal'
import Auth from "../../../../components/Auth"

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// @ts-ignore
const HeatMap = dynamic(() => import("@uiw/react-heat-map").then((mod) => mod.default),{ ssr: false });

// @ts-ignore
const Main = () => {
  const {targetList, profile, favoriteList, loginUser} = useContext(GlobalContext)
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const {user, target_id} = router.query
  const target = targetList.find(item => item.id === target_id)
  const { width, height } = useWindowSize()

  const [targetFavorite, setTargetFavorite] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const target_favorite_list = favoriteList.filter(item => item.target_id === target?.id)
  const userFavoriteTarget = target_favorite_list.find(targetFavorite => targetFavorite.user_id === loginUser?.id)

  useEffect(() => {
    setTargetFavorite(target_favorite_list.length)
    userFavoriteTarget ? setIsFavorited(true) : setIsFavorited(false)
  }, [])

  const handleLike = async () => {
    if (loginUser) {
      if (!isFavorited) {
        try {
          setLoading(true);
          setTargetFavorite(targetFavorite + 1)
          const requestData = {
            user_id: loginUser.id,
            target_id: target?.id
          }
          const { error } = await supabase.from('likes').insert(requestData)
  
          if (error) { throw error}
          setIsFavorited(true)
        } catch(err) {
          setTargetFavorite(targetFavorite - 1)
          setIsFavorited(false)
          alert(err)
        } finally {
          setLoading(false)
        }
      } else {
        deleteLike()
      }
    }else {
      openModal()
    }
  }

  const deleteLike = async () => {
    if(loginUser) {
      try {
        setLoading(true);
        setTargetFavorite(targetFavorite - 1)
        const { error } = await supabase.from('likes').delete().match({id: userFavoriteTarget?.id})

        if (error) { throw error}
        setIsFavorited(false)
      } catch(err) {
        setTargetFavorite(targetFavorite + 1)
        setIsFavorited(true)
        alert(err)
      } finally {
        setLoading(false)
      }
    }
  }

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
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

  const editButton = () => {
    router.push(`${router.asPath}/edit`)
  }

  if (!target) return (
    <div className="flex justify-center py-16 ">
      <div className="animate-spin h-10 w-10 border-4 border-amber-500 rounded-full border-t-transparent"></div>
    </div>
  )
  
  return (
    <>
      <Seo 
        pageTitle={ target.title }
        pageDescription={ target.description }
        pagePath={`${baseUrl}${router.asPath}`}
        pageImg={ target.ogp_url}
        pageImgWidth={1280}
        pageImgHeight={960}
      />
      { target.is_complete &&
        <Confetti
          width={width}
          height={height}
          recycle={true}
        />
      }
      <div className="container px-5 pt-5 pb-10 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="overflow-hidden">
            { target.ogp_url &&
              <img alt="content" className="object-cover object-center h-full w-full" src={target.ogp_url} />
            }
          </div>
          <div className="flex justify-end py-5">
            
                { isFavorited ?
                  <button className="rounded-full bg-red-200 p-2" onClick={handleLike}>
                    <div className="w-4 h-4">
                      {/* @ts-ignore */}
                      <FontAwesomeIcon icon={faHeartSolid} />
                    </div>
                  </button>
                  :
                  <button className="rounded-full bg-gray-200 p-2" onClick={handleLike}>
                    <div className="w-4 h-4">
                      {/* @ts-ignore */}
                      <FontAwesomeIcon icon={faHeartRegular} />
                    </div>
                  </button>
                }
            <p className="px-2 pt-1 text-gray-500">{targetFavorite}</p>
            <TwitterShareButton url={`${baseUrl}${router.asPath}`} title={ target.title }>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <p className="px-1"></p>
            <FacebookShareButton url={`${baseUrl}${router.asPath}`} title={ target.title }>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
          
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <Link href={{pathname: '/[user]', query: { user: target.user_name }}} passHref>
                { target.avater_url
                  ? <img alt="content" className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400" src={target.avater_url} />
                  : 
                  <button className="rounded-full bg-gray-200">
                    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-gray-500 m-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                  </button>
                }
              </Link>
              <div className="flex flex-col items-center text-center justify-center">
                <Link href={{pathname: '/[user]', query: { user: target.user_name }}} passHref>
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{ target.user_name }</h2>
                </Link>
                <div className="w-12 h-1 bg-amber-400 rounded mt-2 mb-4"></div>
                <p className="text-sm text-gray-900">{target.user_self_description}</p>
                <div className='mt-3'>
                  <a className="inline-flex justify-center w-5 h-5 mr-3 text-gray-400 items-center" href={target.user_twitter_url}>
                    {/* @ts-ignore */}
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a className="inline-flex justify-center w-5 h-5 mr-3 text-gray-400 items-center" href={target.user_instagram_url}>
                    {/* @ts-ignore */}
                    <FontAwesomeIcon icon={faInstagram}  />
                  </a>
                  <a className="inline-flex justify-center w-5 h-5 mr-3 text-gray-400 items-center" href={target.user_website_url}>
                    {/* @ts-ignore */}
                    <FontAwesomeIcon icon={faLink}  />
                  </a>
                </div>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="leading-relaxed text-center text-2xl mb-4">{ target.title }</h1>
              <div className="is-style-bg_stripe h-5/6 rounded-lg">
                <p className="leading-relaxed text-base pl-2 py-2">
                  { target.description }
                </p>
              </div>
            </div>
          </div>

          { target.is_complete ?
          <div className="relative pt-1">
            <div className="flex my-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Successed
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-600">
                  100%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-400">
              <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
          </div>
          :
          <div className="relative pt-1">
            <div className="flex my-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-200">
                  in progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-amber-600">
                  { target.value }%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{ width: `${target.value}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"></div>
            </div>
          </div>
        }

          { profile?.user_name === target.user_name &&
            <div className="flex justify-end">
              <button onClick={editButton} className="
                text-sm bg-transparent hover:bg-amber-300 text-amber-300  hover:text-white py-1 px-5 border border-amber-300 hover:border-transparent rounded-full"
              >
                Edit Target
              </button>
            </div>
          }
          
          
          {/* <div className="flex items-end justify-center xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm sm:py-8  overflow-hidden relative"> */}
            {/* @ts-ignore */}
            {/* <HeatMap value={ heatmapValue }
              style={{ color: '#a3a3a3'}}
              width={722}
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
          </div> */}

          {/* <div className="flex justify-center mx-auto">
            <TwitterShareButton url={`${baseUrl}${router.asPath}`} title={ target.title }>
              <TwitterIcon size={30} round={true} />
            </TwitterShareButton>
          </div> */}
        </div>
      </div>
      <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="auth Modal"
        >
          <div id="overlay">
            <div id="modalContent">
              <Auth />
            </div>
          </div>
        </Modal>
    </>
    
  )
}

export default Main
