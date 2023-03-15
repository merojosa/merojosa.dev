import { style } from "@vanilla-extract/css";

const anchorStyle = style({
  textDecoration: "none",
  padding: "0.5rem 3rem",
  height: "fit-content",
  textAlign: "center",
  borderRadius: "var(--borderRadius)",
});

export const primaryAnchorStyle = style([anchorStyle, {
  background: "var(--secondaryColor)",
  ":hover": {
    background: "var(--secondaryColorLighter)",
  },
}])

export const secondaryAnchorStyle = style([anchorStyle, {
  background: "transparent",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "2px",
}])


