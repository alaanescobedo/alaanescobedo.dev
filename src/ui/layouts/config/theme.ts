import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  variants: {
    link: {
      _active: {
        color: "purple.400",
      },
    },
  },
});

export const tabsTheme = defineStyleConfig({
  baseStyle: {
    tab: {
      _selected: {
        color: "purple.400",
      },
      _active: {
        backgroundColor: "transparent",
      },
    },
  },
});

export const linkTheme = defineStyleConfig({
  baseStyle: {
    _hover: {
      textDecoration: "none",
      color: "blue.400",
    },
  },
  variants: {
    disabled: {
      color: "gray.500",
      _hover: {
        color: "gray.500",
      },
      _active: {
        color: "gray.500",
      },
      cursor: "default",
    },
  },
});
