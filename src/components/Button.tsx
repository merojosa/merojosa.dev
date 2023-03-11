import * as React from "react";

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  const [counter, setCounter] = React.useState(0);

  return (
    <button onClick={() => setCounter(counter + 1)}>
      Example button {counter}
    </button>
  );
};

export default Button;
