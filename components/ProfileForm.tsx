import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GlobalContext } from '../context/global-state-provider'
import useUser, { IProfile, IProfileForm } from "../hooks/useUser"
import { generateOgpPath } from '../utils/generateOgpPath'
import { supabase } from '../utils/supabaseClient'
import { removeBucketPath } from '../utils/supabaseStorage'

export default function ProfileForm (props: any) {
  const {profile} = useContext(GlobalContext)
  const { insertProfile } = useUser()
  const { register, handleSubmit } = useForm<IProfile>()
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [uploading, setUploading] = useState(false)
  const [buttonText, setButtonText] = useState<string>()

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    data.id = String(supabase.auth.user()?.id)
    data.avatar_url = avatarUrl
    insertProfile(data)
  }

  const upload = async (event: any) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
  
      const file = event.target.files[0]
      const filePath = generateOgpPath();
      let {data: inputData ,error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`${filePath}.png`, file, {
          contentType: 'image/png',
          cacheControl: '3600',
          upsert: false
        })
      
      if (uploadError) {
        throw uploadError
      }
      
      const key = inputData?.Key
      if (!key) { throw new Error('storage key is undefined')}
  
      const { data, error: err } = await supabase.storage.from('avatars').getPublicUrl(removeBucketPath(key, "avatars"))
      if (err) { throw err }
  
      setAvatarUrl(data?.publicURL)
    } catch (error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    switch (props.mode) {
      case 'EDIT':
        setButtonText('Edit Profile')
        break
      case 'CREATE':
        setButtonText('Create Profile')
        break
      default:
        setButtonText('')
        break
    }
  }, [props.mode])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            user image
          </label>
        </div>
        <div className="md:w-2/3 flex">
          
            { avatarUrl ?
              <img alt="content" className="sm:w-30 sm:h-30 h-20 w-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 p-1" src={avatarUrl} />
              :
              <img alt="content" className="sm:w-30 sm:h-30 h-20 w-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 p-1" src={profile?.avatar_url} />
            }
          <label className='pt-12' htmlFor="avatar_url">
            <span className='px-4 text-amber-400'>edit profile image</span>
          </label>
          <input
            className="hidden w-full" 
            id="avatar_url" 
            type="file"
            accept="image/*"
            onChange={upload}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="user-name">
                user Name
                <span className='text-red-500'>*</span>
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-500" 
            id="user-name" 
            type="text" 
            defaultValue={profile?.user_name}
            {...register('user_name', { required: true })}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label htmlFor="description" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Description:</label>
        </div>
        <div className="md:w-2/3">
          <textarea
            id="description"
            cols={30}
            rows={10}
            placeholder="write here.."
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-500"
            defaultValue={profile?.self_description}
            {...register('self_description')}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="twitter">
                twitter url
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-500" 
            id="twitter" 
            type="text" 
            defaultValue={profile?.twitter_url}
            {...register('twitter_url')}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="instagram">
                instagram url
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-500" 
            id="instagram" 
            type="text" 
            defaultValue={profile?.instagram_url}
            {...register('instagram_url')}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="website">
                website
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-500" 
            id="website" 
            type="text" 
            defaultValue={profile?.website}
            {...register('website')}
          />
        </div>
      </div>
        
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
        <button 
          className="shadow bg-amber-400 hover:bg-amber-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type='submit'>
            { buttonText }
        </button>
        </div>
      </div>
    </form>
  )
}