import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth,signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
const firebaseConfig = {
  //...

  apiKey: "AIzaSyCT7rCu7DH9GycXRQSHrKUY8mkkNskdTJg",
  authDomain: "shopido-b4134.firebaseapp.com",
  databaseURL: "https://shopido-b4134-default-rtdb.firebaseio.com",
  projectId: "shopido-b4134",
  storageBucket: "shopido-b4134.appspot.com",
  messagingSenderId: "901678716880",
  appId: "1:901678716880:web:a6b36e83ff8667c5244bd5",
  measurementId: "G-FT3D27GEJW"
};


// Get a list of cities from your database
async function getProducts(db) {
  const produtCol = collection(db, 'products');
  const productSnapshot = await getDocs(produtCol);
  const productList = productSnapshot.docs.map(doc => doc.data());
  return productList;
}

// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

const customerConverter = {
  toFirestore: (customer) => {
      return {
          name: customer.name,
          email: customer.email,
          image: customer.image,
          address: customer.image,
          mobileNo: customer.mobileNo,
          cart: customer.cart,
          orders: customer.orders,
          id: customer.id
          };
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Customer(data.id, data.name, data.mobileNo, data.name, data.image, data.address, data.cart, data.orders);
  }
};

function setCustomer(uid, email, mobile, name, image, address) {
  var customer = new Customer(uid, email, mobile, name, image, address, [], [])
  const ref = doc(db, "customer", uid).withConverter(customerConverter);
  // await setDoc(ref, customer);
}

// const querySnapshot = await getDocs(collection(db, "products"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data().pageDetails}`);
// });


function authWithGoogle() {
  firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
app.initializeApp

const db = getFirestore(app);
  console.log("Auth started");
  var googleAuthProvider = GoogleAuthProvider
  var googleAuth = getAuth();
   signInWithPopup(googleAuth, googleAuthProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var credential = GoogleAuthProvider.credentialFromResult(result);
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    setCustomer(user.uid, user.email, user.phoneNumber, user.displayName, user.photoURL, "")
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.customData.email;
    // The AuthCredential type that was used.
    var credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  
}

// authWithGoogle()
$(document).ready(function(){
  // $(".icon-bg").click(function () {
  //     $(".btn").toggleClass("active");
  //     $(".icon-bg").toggleClass("active");
  //     $(".container").toggleClass("active");
  //     $(".box-upload").toggleClass("active");
  //     $(".box-caption").toggleClass("active");
  //     $(".box-tags").toggleClass("active");
  //     $(".private").toggleClass("active");
  //     $(".set-time-limit").toggleClass("active");
  //     $(".button").toggleClass("active");
  // });

  // $(".button").click(function () {
  //     $(".button-overlay").toggleClass("active");
  // });

  // $(".iconmelon").click(function () {
  //     $(".box-upload-ing").toggleClass("active");
  //     $(".iconmelon-loaded").toggleClass("active");
  // });

  // $(".private").click(function () {
  //     $(".private-overlay").addClass("active");
  //     $(".private-overlay-wave").addClass("active");
  // });
  $("#google").click(function()  {
    authWithGoogle();
  })
});