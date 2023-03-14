import { style } from "@vanilla-extract/css";

export const buttonStyle = style({
  all: "unset",
  backgroundColor: "blue",
  ":focus-visible": {
    outline: "1px solid red",
  },
});

export const anchorStyle = style({
  background: "var(--secondaryColor)",
  textDecoration: "none",
  padding: "0.5rem 3rem",
  height: "fit-content",
  textAlign: "center",
  borderRadius: "var(--borderRadius)",
  ":hover": {
    background: "var(--secondaryColorLighter)",
  },
});
