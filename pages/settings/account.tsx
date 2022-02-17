import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react";
// @ts-ignore
import Modal from 'react-modal'
import { GlobalContext } from "../../context/global-state-provider";
import useUser from "../../hooks/useUser";

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

const Account = () => {
  const {targetList, profile, user} = useContext(GlobalContext)
  const [showModal, setShowModal] = useState(false)
  const {deleteUser} = useUser()
  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const asyncDelete = () => {
    deleteUser()
  }

  return (
    <div className="container justify-around mx-auto p-10">
      <div className="border-b border-gray-200 dark:border-gray-400 mb-8">
        <div className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
          <a className="mr-2" role="presentation" href={'/settings/profile'}>
            <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
          </a>
          <a className="mr-2" role="presentation" href={'/settings/account'}>
            <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">
              Account
            </button>
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-lg">delete account</h3>
        <a onClick={openModal} className="underline text-sm text-gray-500">delete your account
          <a className="inline-flex w-3 h-3 ml-1">
            {/* @ts-ignore */}
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </a>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="delete account Modal"
        >
          <div id="overlay">
            <div id="modalContent">
              <div className="text-center p-5 flex-auto justify-center">                
                <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete your account?
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

export default Account