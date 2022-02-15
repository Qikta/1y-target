import { useRouter } from "next/router"
import { useContext, useState } from "react"
import TargetForm from "../../../../components/TargetForm"
import { GlobalContext } from "../../../../context/global-state-provider"
import useTarget, { ITarget, ITargetForm } from "../../../../hooks/useTarget"
import useUser from "../../../../hooks/useUser"
import { definitions } from "../../../../types/entities/supabase"
import { supabase } from "../../../../utils/supabaseClient"
// @ts-ignore
import Modal from 'react-modal'

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
const Edit = () => {
  const {targetList, profile} = useContext(GlobalContext)
  const router = useRouter()
  const { deleteTarget } = useTarget()
  const [showModal, setShowModal] = useState(false);
  const {user, target_id} = router.query
  const targetData = targetList.find(item => item.id === target_id)

  if (!targetData) { return <div className="container my-8 mx-auto px-4 md:px-12">missing data...</div> }
  const target: ITargetForm = {
    user_name: profile?.user_name ? profile.user_name : '',
    targetDetail: {
      id: Number(targetData.id),
      title: targetData?.title || '',
      description: targetData.description,
      value: targetData.value || 0,
      user_id: profile?.id,
      ogp_url: targetData.ogp_url,
      is_complete: targetData.is_complete || false,
    }
  }

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const asyncDelete = () => {
    deleteTarget(Number(targetData.id))
  }

    return (
      <div className="container justify-center mx-auto p-10">
        <TargetForm target={target} mode='EDIT' />
        <a
          className="flex justify-end text-gray-500 underline text-sm hover:text-gray-700"
          onClick={openModal}>Delete your Target...</a>
        <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="delete Modal"
        >
          <div id="overlay">
            <div id="modalContent">
              <div className="text-center p-5 flex-auto justify-center">                
                <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete your target?
                  This process cannot be undone
                </p>    
              </div>
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button onClick={closeModal} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                  Cancel
                </button>
                <button onClick={asyncDelete} className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
}

export default Edit