import styled from 'styled-components/native';

interface ContainerTextProps {
  color?: string;
  fontSize: string;
  fontFamily: 'Poppins-Bold' | 'Poppins-Light' | 'Poppins-Regular';
}

export const ContainerText = styled.Text<ContainerTextProps>`
  color: ${(props: ContainerTextProps) => props.color || 'inherit'};
  padding-top: 3px;
  font-family: ${(props: ContainerTextProps) => props.fontFamily};
  font-size: ${(props: ContainerTextProps) => props.fontSize};
`;