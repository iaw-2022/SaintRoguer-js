import { Footer, Header, Catalogue, Imdb } from './containers';
import { Navbar } from './components';
import { getAuth, signInAnonymously } from "firebase/auth"
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from './firebase';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React from 'react';

function App() {

  const login = () => {
    signInAnonymously(getAuth()).then(user => console.log(user))
    activateMessages()
  }

  const activateMessages = async () => {

    const messagingResolve = await messaging;

    const token = await getToken(messagingResolve, {
      vapidKey: "BNi3xjbJKrRmuAKiaxovpTYtsQecnLGRScnaWmsjt3j2PSOLEXK88VkIPFZQCmJHAuSXdS2vg3t2k5vm_bqeq50"
    }).catch(err => console.log(err));

    if (token) console.log("Your token is: ", token);
    else console.log("Something went wrong with your token");
  }

  React.useEffect(() => {
    if (messaging) {
      login();
      onMessage(messaging, message => {
        console.log("Message received: ", message);
        toast(message.notification.title)
      })
    }
  }, [login])

  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        {messaging ? <ToastContainer /> : <></>}
        <Header />
      </div>
      <Catalogue />
      <Imdb />
      <Footer />
    </div>
  );
}

export default App;
