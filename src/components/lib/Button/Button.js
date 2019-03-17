import styled from "styled-components";

const Button = styled.button`
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1px;
  text-decoration: none;
  white-space: nowrap;
  font-size: 1rem;
  appearance: none;
  padding: 1em 2em;
  background: #2970ff;
  color: white;
  outline: 0;
  transition: transform 100ms ease-out, box-shadow 100ms ease-out;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 1px 2px 7px #8997a5;
  }
`;

export default Button;
