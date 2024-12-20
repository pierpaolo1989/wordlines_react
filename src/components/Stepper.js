import { useState } from 'react';
import { useEffect } from 'react'
import { supabase } from '../utils/SupabaseClient'
import Avatar from '../components/Avatar'
import ReCAPTCHA from "react-google-recaptcha";

function WrapperStepper({ session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [activeStep, setActiveStep] = useState(1);
    const [captchaVerified, setCaptchaVerified] = useState(false);
  const [walletType, setWalletType] = useState("eth");
  const [address, setAddress] = useState("");
  const [coins, setCoins] = useState(0);
  const [conversionRate] = useState(0.05);

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };


  const handleTransaction = async () => {
    if (!window.ethereum) {
      alert("MetaMask non è installato. Per favore installalo per continuare.");
      return;
    }

    if (!address) {
      alert("Inserisci un indirizzo valido.");
      return;
    }

    try {
      const tokenAmount = coins * conversionRate;
      const transactionParams = {
        to: address,
        value: walletType === "eth"
          ? (tokenAmount * 1e18).toString(16) // ETH value in Wei
          : undefined,
      };

      if (walletType === "btc") {
        alert("Le transazioni BTC non possono essere inviate direttamente con MetaMask.");
        return;
      }

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParams],
      });

      alert("Transazione inviata con successo!");
    } catch (error) {
      alert(`Errore durante la transazione: ${error.message}`);
    }
  };

    useEffect(() => {
        let ignore = false;
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

    return (
        <>

            <div className="flex justify-center space-x-4 mb-8">
                <button
                    className={`px-4 py-2 rounded-lg text-white font-medium ${activeStep === 1 ? "bg-blue-600" : "bg-gray-400"
                        }`}
                    onClick={() => setActiveStep(1)}
                >
                    User Data
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-white font-medium ${activeStep === 2 ? "bg-blue-600" : "bg-gray-400"
                        }`}
                    onClick={() => setActiveStep(2)}
                >
                    Withdraw
                </button>
            </div>

            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                {activeStep === 1 && (
                    <form className="flex flex-col" onSubmit={updateProfile}>

                        <Avatar
                            url={avatar_url}
                            size={150}
                            onUpload={(event, url) => {
                                updateProfile(event, url)
                            }}
                        />


                        <label htmlFor="email" className="text-gray-600 mb-2">
                            Email
                        </label>
                        <input
                            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
                            type="email"
                            value={session?.user.email}
                            disabled
                        />

                        <label htmlFor="website" className="mt-4 text-gray-600 mb-2">
                            Website
                        </label>
                        <input
                            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2"
                            type="url"
                            id="website"
                            placeholder="Enter website"
                            value={website || ''}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        <label htmlFor="username" className="mt-4 text-gray-600 mb-2">
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
                            className="mt-5 text-lg text-white font-semibold bg-blue-500 py-2 px-4 rounded-md focus:outline-none focus:ring-2"
                            type="submit"
                        >
                            {loading ? 'Loading ...' : 'Update'}
                        </button>
                    </form>
                )}

                {activeStep === 2 && (
                     <form>
                     <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="wallet-type">
                         Tipo di Wallet
                       </label>
                       <select
                         id="wallet-type"
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                         value={walletType}
                         onChange={(e) => setWalletType(e.target.value)}
                       >
                         <option value="eth">Ethereum</option>
                         <option value="btc">Bitcoin</option>
                       </select>
                     </div>
         
                     <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="address">
                         Indirizzo Wallet
                       </label>
                       <input
                         type="text"
                         id="address"
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                         placeholder="Inserisci l'indirizzo wallet"
                         value={address}
                         onChange={(e) => setAddress(e.target.value)}
                       />
                     </div>
         
                     <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="coins">
                         Coins da convertire
                       </label>
                       <input
                         type="number"
                         id="coins"
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                         placeholder="Inserisci il numero di coins"
                         value={coins}
                         onChange={(e) => setCoins(Number(e.target.value))}
                       />
                     </div>
                     <ReCAPTCHA
                     className='mb-4'
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaChange}
            />
                     <button
                       type="button"
                       className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                       onClick={handleTransaction}
                     >
                       Invia Coins
                     </button>
                   </form>
                )}
            </div>
        </>
    );
}

export default WrapperStepper;