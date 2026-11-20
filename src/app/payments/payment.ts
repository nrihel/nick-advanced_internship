import { getApp } from "@firebase/app";
import { getStripePayments } from "@invertase/firestore-stripe-payments";

const app = getApp();
const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});