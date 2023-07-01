import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: any) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  );
}
