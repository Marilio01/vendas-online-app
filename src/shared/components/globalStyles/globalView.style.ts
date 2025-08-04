import styled from 'styled-components/native';

interface DisplayProps {
  customMargin?: string;
}

export const DisplayFlexColumn = styled.View<DisplayProps>`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: ${(props: DisplayProps) => (props.customMargin ? props.customMargin : '0px')};
`;