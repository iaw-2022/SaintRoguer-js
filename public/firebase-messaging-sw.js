importScripts("https://www.gstatic.com/firebasejs/9.9.2/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.9.2/firebase-messaging-compat.js")

const firebaseConfig = {
    apiKey: "AIzaSyCyIpOz7raGNBfQcEk9gpMzFY5J8tESD0o",
    authDomain: "trailerama-c7c90.firebaseapp.com",
    projectId: "trailerama-c7c90",
    storageBucket: "trailerama-c7c90.appspot.com",
    messagingSenderId: "305670494553",
    appId: "1:305670494553:web:255b64b5f903a05af39448",
    measurementId: "G-0PSW2VZWNY"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log("You have a new notification!");
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo.png"
    }

    return self.registration.showNotification(notificationTitle, notificationOptions);
})