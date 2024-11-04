import { useState, useEffect } from 'react'
import { supabase } from '../utils/SupabaseClient'
import Profile from '../pages/ProfilePage'

function Account() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      {!session ? <></> : <Profile key={session.user.id} session={session} />}
    </>
  )
}

export default Account;