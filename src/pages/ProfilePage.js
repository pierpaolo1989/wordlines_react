import { useState, useEffect } from 'react'
import { supabase } from '../utils/SupabaseClient'
import Avatar from '../components/Avatar'
import { useNavigate } from 'react-router-dom'

function Profile({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    debugger;
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

    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
          Profile
        </h1>

        <div className="flex flex-col p-6">

          <form className="flex flex-col" onSubmit={updateProfile}>

            <Avatar
              url={avatar_url}
              size={150}
              onUpload={(event, url) => {
                updateProfile(event, url)
              }}
            />


            <label htmlFor="email" className="text-gray-200">
              Email
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="email"
              value={session?.user.email}
              disabled
            />

            <label htmlFor="website" className="mt-6 text-gray-200">
              Password
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="url"
              id="website"
              placeholder="Enter website"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <label htmlFor="username" className="mt-6 text-gray-200">
              Username
            </label>
            <input
              className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="text"
              id="username"
              placeholder="Enter username"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button
              className="mt-10 text-lg text-white font-semibold bg-blue-500 py-2 px-4 rounded-md focus:outline-none focus:ring-2"
              type="submit"
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
            <button className="mt-5 text-lg text-white font-semibold bg-blue-500 py-2 px-4 rounded-md focus:outline-none focus:ring-2" type="button" onClick={logout}>
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile;