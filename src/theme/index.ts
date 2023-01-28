import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `Inter, ${base.fonts.body}`,
    body: `Actor, ${base.fonts.body}`,
  },
});

export default theme;
