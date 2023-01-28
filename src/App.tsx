import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Story } from "./containers/Story";
import { LandingPage } from "./pages/LandingPage";
import theme from "./theme";
import "./theme/styles.css";

export const App = () => {
  const [hashtag, setHashtag] = useState(window.location.hash);
  useEffect(() => {
    const handleHashChange = () => {
      window.scrollTo(0, 0);
      const hash = window.location.hash.split("?")[0];
      setHashtag(hash);
    };
    window.onhashchange = handleHashChange;
    return () => {
      window.onhashchange = null;
    };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      {(hashtag === "" || hashtag === "#") && <LandingPage />}
      {hashtag === "#story" && <Story />}
    </ChakraProvider>
  );
};
