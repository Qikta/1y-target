import { NextPage } from "next";
import ProfileForm from "../components/ProfileForm";

const App: NextPage = () => {
  return (
    <div className="container justify-around mx-auto">
      <ProfileForm mdoe='CREATE' />
    </div>
  )
}

export default App;