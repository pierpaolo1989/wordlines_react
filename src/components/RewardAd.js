import React, { useState } from 'react';

const RewardAd = () => {
  const [coins, setCoins] = useState(0);

  // Funzione per simulare il caricamento e la visualizzazione di un annuncio reward
  const handleShowRewardAd = () => {
    // Simula il tempo di caricamento dell'annuncio
    console.log("Loading ad...");

    setTimeout(() => {
      console.log("Ad finished.");
      const reward = Math.floor(Math.random() * 100) + 1; // Genera una ricompensa random tra 1 e 100
      setCoins(prevCoins => prevCoins + reward); // Aggiungi la ricompensa ai coins
    }, 3000); // Simula un ad di 3 secondi
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={handleShowRewardAd} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Show Reward Ad
      </button>

      {/* Spazio dove in futuro verrà caricato l'annuncio */}
      <div id="reward-ad" style={{ marginTop: '20px' }}>
        {/* Il codice per mostrare l'annuncio adsense può andare qui */}
      </div>
    </div>
  );
};

export default RewardAd;