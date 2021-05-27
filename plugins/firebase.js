import firebase from 'firebase'

if (!firebase.apps.langth) {
    firebase.initializeApp({
        piKey: "AIzaSyAZik29dkoFKh-IjBmvkeahO8p0nTASJrU",
        authDomain: "shop-review-site.firebaseapp.com",
        projectId: "shop-review-site",
        storageBucket: "shop-review-site.appspot.com",
        messagingSenderId: "188353036796",
        appId: "1:188353036796:web:53c483f278ce24eb12b279",
        measurementId: "G-8F1JH2J95D"
    })
}

export default firebase
