import { SubmitHandler, useForm } from 'react-hook-form'
import useTarget, { ITargetForm } from "../hooks/useTarget"
import { supabase } from "../utils/supabaseClient"

export default function TargetForm (props: any) {
    const { createTarget } = useTarget()
    const { register, handleSubmit } = useForm<ITargetForm>()

    const onSubmit: SubmitHandler<ITargetForm> = (data) => {
        data.user_id = supabase.auth.user()?.id
        createTarget(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:px-20 pt-8">
                <div className=" bg-white rounded-lg px-6 py-10 max-w-2xl mx-auto">
                    <div className="flex justify-end p-2">
                        <button 
                        type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            onClick={props.onClick}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">NEW OneYearTarget</h1>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="text-lx">Title:</label>
                            <input type="text" placeholder="title" id="title" className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" 
                              {...register('name', { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-lg">Description:</label>
                            <textarea
                            id="description"
                            cols={30}
                            rows={10}
                            placeholder="whrite here.."
                            className="w-full p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                            {...register('description')}
                            />
                        </div>
                        <div>
                            <label htmlFor="value" className="form-label">Achievement rate</label>
                            <input
                            id="value"
                            type="range"
                            className="form-range appearance-none w-full h-6 p-0 mx-1 bg-gray-500 focus:outline-none focus:ring-0 focus:shadow-none"
                            min="0"
                            max="100"
                            step="5"
                            {...register('value')}
                            />
                        </div>
                    </div>
                    <button type='submit' className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
                        Create OYT!
                    </button>
                </div>
            </div>
        </form>
    )
}