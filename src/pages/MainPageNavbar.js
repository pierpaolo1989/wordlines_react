import { faCog, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LifeAnimation.css';
import { supabase } from "../utils/SupabaseClient";

function MainPageNavbar() {
  
  const navigate = useNavigate()
  const style = { "backgroundColor": "#282c34"}
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  
  const mute = () => {

  }

  const login = () => {
    navigate("/login");
  }

  const dropdown = () => {
    setOpen(oldValue => !oldValue);
  }

  const profile = () => {
    navigate("/profile");
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null)
    navigate("/");
  }

  const getProfile = async () => {
    const profile = await supabase.auth.getUser();
    if (profile.data.user) {
      setUser(profile.data.user);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <nav style={style}>
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
            </div>
            <div className="hidden sm:ml-6 sm:block">
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex space-x-4">
              <a onClick={login} className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" style={{ "cursor": "pointer" }}>
                <FontAwesomeIcon icon={faSignIn} className="text-white" />
              </a>
              <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                <FontAwesomeIcon icon={faCog} className="text-white" onClick={mute} />
              </a>
              {user ?
                <div>
                  <div className="relative inline-block text-left">
                    <div>
                      <button type="button" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" style={{ "cursor": "pointer" }} id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={dropdown}>
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <img src="%PUBLIC_URL%/avatar.png" />
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" 
                    aria-labelledby="menu-button" tabIndex="-1" style={{'display': open ? 'block' : 'none'}}>
                      <div className="py-1" role="none">
                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={profile}>Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                        <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-3" onClick={logout}>Log out</button>
                      </div>
                    </div>
                  </div>
                </div>
                : <span></span>}
            </div>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default MainPageNavbar;