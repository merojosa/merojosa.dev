import { anchorStyle, buttonStyle } from "./Button.css";

type Props = (
  | ({
      href: string;
    } & React.AnchorHTMLAttributes<HTMLElement>)
  | ({
      href?: undefined;
    } & React.ButtonHTMLAttributes<HTMLElement>)
) & {
  children: React.ReactNode;
};

const Button: React.FC<Props> = (props) => {
  return props.href !== undefined ? (
    <a {...props} className={`${anchorStyle} ${props.className}`}>
      {props.children}
    </a>
  ) : (
    <button {...props} className={`${buttonStyle}`}>
      {props.children}
    </button>
  );
};

export default Button;
