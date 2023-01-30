import { Toaster } from "react-hot-toast";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import "../styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Script src="https://js.paystack.co/v1/inline.js" />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
