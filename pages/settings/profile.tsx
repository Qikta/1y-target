import { NextPage } from "next";
import ProfileForm from "../../components/ProfileForm";

const Profile: NextPage = () => {

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
      <ProfileForm mode='EDIT' />
    </div>
  )
}

export default Profile