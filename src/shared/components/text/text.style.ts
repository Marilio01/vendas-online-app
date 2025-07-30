import styled from 'styled-components/native';

interface ContainerTextProps {
  color?: string;
  fontSize: string;
}

 export const ContainerText = styled.Text<ContainerTextProps>`
  color: ${(props: ContainerTextProps) => props.color || 'inherit'};
  font-size: ${(props: ContainerTextProps) => props.fontSize};
`;