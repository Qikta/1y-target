import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useUser, { IProfile, IProfileForm } from "../hooks/useUser"
import { supabase } from '../utils/supabaseClient'

export default function ProfileForm () {
  const { insertProfile } = useUser()
  const { register, handleSubmit } = useForm<IProfileForm>()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  const onSubmit: SubmitHandler<IProfileForm> = (data) => {
    data.id = String(supabase.auth.user()?.id)
    insertProfile(data)
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // onUpload(filePath)
    } catch (err) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="avatar_url">
                user image
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            id="avatar_url" 
            type="file"
            accept="image/*"
            {...register('avatar')}
            onChange={uploadAvatar}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="user-name">
                user Name
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            id="user-name" 
            type="text" 
            {...register('username', { required: true })}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
            <label htmlFor="description" className="block mb-2 text-lg">Description:</label>
            </div>
            <div className="md:w-2/3">
            <textarea
            id="description"
            cols={30}
            rows={10}
            placeholder="whrite here.."
            className="w-full p-4 bg-gray-100 outline-none rounded-md"
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            id="twitter" 
            type="text" 
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            id="instagram" 
            type="text" 
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            id="website" 
            type="text" 
            {...register('website')}
          />
        </div>
      </div>
        
        <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
            <button 
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type='submit'>
                Sign Up
            </button>
            </div>
        </div>
    </form>
  )
}