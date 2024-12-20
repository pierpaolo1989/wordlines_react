import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainPageNavbar from '../components/MainPageNavbar'
import WrapperStepper from '../components/Stepper'
import { supabase } from '../utils/SupabaseClient'

function Profile({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [ userData, setUserData ] = useState(null);
  const navigate = useNavigate();
  const style = {
    "backgroundColor": "#282c34"
  }

  return (
    <>
      <MainPageNavbar />
      <div className="h-screen flex items-center justify-center" style={style}>
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold text-center text-white">
            Profile
          </h1>
          <div className="flex flex-col p-6">
            <WrapperStepper session={session} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;