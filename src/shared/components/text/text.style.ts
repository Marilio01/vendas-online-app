import styled from 'styled-components/native';

interface ContainerTextProps {
  color?: string;
  customMargin?: string;
  fontSize: string;
  fontFamily: 'Poppins-Bold' | 'Poppins-Light' | 'Poppins-Regular' | 'Poppins-SemiBold';
}

export const ContainerText = styled.Text<ContainerTextProps>`
  color: ${(props: ContainerTextProps) => props.color || 'inherit'};
  ${(props:ContainerTextProps) => (props.customMargin ? `margin: ${props.customMargin};` : '')}

  padding-top: 3px;
  font-family: ${(props: ContainerTextProps) => props.fontFamily};
  font-size: ${(props: ContainerTextProps) => props.fontSize};
`;