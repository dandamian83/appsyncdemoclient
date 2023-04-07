import logo from './logo.svg';
import './App.css';
import { useEffect, useRef } from 'react';
import { API } from '@aws-amplify/api'
import { Auth } from "aws-amplify";
import config from './aws-exports'
import { subscribe } from './graphql/subscriptions'

function App() {
  const cleanupRef = useRef(null);

  useEffect( () => {
    let initSubscription = async () => {
        Auth.configure({
          region: config.aws_appsync_region,
          userPoolId: config.aws_cognito_user_pool_id,
          userPoolWebClientId: config.aws_cognito_user_pool_client_id,
          mandatorySignIn: true,
          authenticationFlowType: 'USER_SRP_AUTH'
        })
        await Auth.signIn(config.aws_cognito_username, config.aws_cognito_pass);
        API.configure({
          ...config,
          Auth
        })
        const handleNotification = (notification) => {
          console.log('New notification:', notification);
        };

        const subscription = API.graphql({
          query: subscribe,
          variables: {
            name: "channelOne"
          }}
        ).subscribe({
          success: () => {

          },
          error: (err) => {
            console.log("Subscription error", JSON.stringify(err))
            // setStatus("Disconnected :(")
          },
          next: (notificationData) => {
            handleNotification(notificationData.value.data.subscribe);
          },
        });

        console.log("Successfully subscribed.");

        // Set the cleanup function to the ref
        cleanupRef.current = () => {
          console.log('Cleanup/unsubscribe');
          subscription.unsubscribe();
        };

      }

    initSubscription();

    // Return the cleanup function
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
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
