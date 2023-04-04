import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { API, graphqlOperation } from '@aws-amplify/api'
import config from './aws-exports'
import { subscribe } from './graphql/subscriptions'

API.configure(config)

const handleNotification = (notification) => {
  console.log('New notification:', notification);
};


function App() {
  useEffect(() => {
    const subscription = API.graphql({
        query: subscribe,
        variables: {
          name: "channelTwo"
        }}
    ).subscribe({
      error: (err) => {
        console.log("Subscription error", err)
        // setStatus("Disconnected :(")
      },
      next: (notificationData) => {
        handleNotification(notificationData.value.data.subscribe);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
