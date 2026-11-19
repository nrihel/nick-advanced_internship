import { collection, doc, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore();

const docRef = await addDoc(
  collection(
    db,
    "customers",
    currentUser.uid,
    "checkout_sessions"
  ),
  {
    mode: "payment",
    price: "price_1GqIC8HYgolSBA35zoTTN2Zl", // One-time price created in Stripe
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  }
);