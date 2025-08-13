import { useState, useEffect } from 'react'
import { supabase } from '../utils/SupabaseClient'
import Avatar from '../components/Avatar'
import { useNavigate } from 'react-router-dom'
import MainPageNavbar from '../components/MainPageNavbar'
import WrapperStepper from '../components/Stepper'

function Profile({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const navigate = useNavigate();
  const style = {
    "backgroundColor": "#282c34"
  }

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])


  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  const logout = () => {
    supabase.auth.signOut();
    navigate("/")
  }

  return (
    <>
      <MainPageNavbar />
      <div className="h-screen flex items-center justify-center" style={style}>
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold text-center text-white">
            Profile
          </h1>
          <br></br>
          <WrapperStepper session={session}/>
        </div>
      </div>
    </>
  )
}

export default Profile;