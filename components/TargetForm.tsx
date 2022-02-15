import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GlobalContext } from '../context/global-state-provider'
import useTarget, { ITargetForm } from "../hooks/useTarget"
import useUser from '../hooks/useUser'
import { supabase } from "../utils/supabaseClient"

export default function TargetForm (props: any) {
  const {profile} = useContext(GlobalContext)
  const { createTarget, editTarget } = useTarget()
  const { register, handleSubmit } = useForm<ITargetForm>()
  const [submitButtonText, setSubmitButtonText] = useState<string>()

  const onSubmit: SubmitHandler<ITargetForm> = (data) => {
    switch (props.mode) {
      case 'CREATE':
        data.targetDetail.user_id = supabase.auth.user()?.id
        data.user_name = profile?.user_name ? profile?.user_name : ''
        data.avatar_url = profile?.avatar_url ? profile?.avatar_url : ''
        createTarget(data)
        return
      case 'EDIT':
        if(props.target) {
          data.targetDetail.id = props?.target?.targetDetail.id
          data.user_name = props?.target?.user_name
          data.avatar_url = profile?.avatar_url ? profile?.avatar_url : ''
          editTarget(data)
          return
        }
        return
      default:
        return
    }
  }

  useEffect(() => {
    switch (props.mode) {
      case 'EDIT':
        setSubmitButtonText('Edit Target')
        break
      case 'CREATE':
        setSubmitButtonText('Create Target')
        break
      default:
        setSubmitButtonText('')
        break
    }
  }, [props.mode])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-lg p-8'>
      { props.mode == 'CREATE' &&
        <div className="flex justify-end p-2">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={props.onClick}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      }
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="title">
                Title
                <span className='text-red-500'>*</span>
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-500" 
            id="title" 
            type="text" 
            defaultValue={props?.target?.targetDetail.title}
            {...register('targetDetail.title', { required: true })}
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
            defaultValue={props?.target?.targetDetail.description}
            {...register('targetDetail.description')}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="achievementRate">
              achievement rate
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            id="achievementRate"
            type="range"
            className="
                appearance-none
                w-full
                h-6
                p-0
                mx-1
                bg-transparent
                focus:outline-none
                focus:ring-0
                focus:shadow-none"
            min="0"
            max="100"
            step="5"
            defaultValue={props?.target?.targetDetail.value}
            {...register('targetDetail.value')}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="form-check-label block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="is_complete">
              is Successd?
            </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="form-check-input appearance-none h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id='is_complete'
            type="checkbox"
            defaultValue={props?.target?.targetDetail.is_complete}
            {...register('targetDetail.is_complete')}  
          />
        </div>
      </div>
        
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
        <button 
          className="shadow bg-amber-400 hover:bg-amber-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type='submit'>
            { submitButtonText }
        </button>
        </div>
      </div>
    </form>
  )
}