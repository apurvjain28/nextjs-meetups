import "../styles/globals.css";
import Layout from "../components/layout/Layout";

// kind of root compnent: special component
// uses object destructing to hold info like Component, pageProps
// component: hold actualy page componentg
// pageProps: hold page props our page is getting
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
