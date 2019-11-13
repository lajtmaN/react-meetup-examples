import * as React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
}
export const BigButton: React.FC<Props> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  width: 40vw;
  height: auto;
  font-size: 20vh;
`;
