import Layout from "../components/Layout";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
        <Navbar />
      <Component {...pageProps} />
        <Footer />
    </Layout>
  );
}
