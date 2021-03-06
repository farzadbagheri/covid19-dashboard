import styled from "styled-components";

import Colors from "./Colors";

interface TextLabelProps {
  softened?: boolean;
  padding?: boolean;
}

const TextLabel = styled.span<TextLabelProps>((props: TextLabelProps) => {
  return `
  ${props.softened ? "" : "text-transform: uppercase;"}
  font-size: ${props.softened ? "12px" : "10px"};
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  ${props.softened ? "" : "letter-spacing: 2px;"}
  color: ${Colors.darkForest};
  ${props.padding ? "padding-right: 5px;" : ""}
`;
});

TextLabel.defaultProps = {
  padding: true,
};

export default TextLabel;
