# WordLines

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Partite e classifica

Per abilitare i risultati, applicare [supabase/battle.sql](supabase/battle.sql)
nel SQL editor del progetto Supabase. La migrazione presuppone che la tabella
`public.score` esista già e abbia `id`, `username`, `language` e `score`; le
normali autorizzazioni di lettura della classifica devono restare abilitate.
Le funzioni richiedono l'accesso RPC ai ruoli `anon` e `authenticated`.

Nel gioco classico l'ospite inserisce il nome al termine; per un utente
autenticato si usa il nome del profilo (oppure il nome del provider o
«Giocatore»). Il punteggio viene salvato nella classifica della lingua
selezionata e l'utente autenticato vede la posizione della propria partita.
A parità di punti l'ordinamento è per ID crescente.

La battle abbina due giocatori della stessa lingua, anche ospiti, che giocano
in parallelo la stessa sequenza e con le stesse regole del classico. Ogni
giocatore termina autonomamente; quando entrambi hanno finito vengono mostrati
punteggi, vincitore o pareggio. Le battle non alimentano la classifica
classica. Una lobby senza avversario scade dopo dieci minuti; usare il pulsante
home per abbandonare una battle e avvisare l'avversario. Aggiornare o chiudere
la pagina interrompe la sessione locale: non è previsto il recupero della
partita, e l'avversario dovrà abbandonarla.

I punteggi e le parole sono elaborati dal browser: le funzioni Supabase non
costituiscono una protezione anti-cheat. Per una classifica competitiva
attendibile occorre validare server-side le partite e le risposte.

Il pulsante sole/luna nella barra della home cambia il tema dell'app. Il tema
iniziale è scuro; la scelta viene conservata nel browser e vale per tutte le pagine.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Deploy the app through github page.\
See the section [https://blog.logrocket.com/deploying-react-apps-github-pages/] (https://blog.logrocket.com/deploying-react-apps-github-pages/) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
