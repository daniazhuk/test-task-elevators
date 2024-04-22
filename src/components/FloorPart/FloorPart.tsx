import { FC } from "react";

import styled from "styled-components";
import { floorParams } from "../../constants/elementParams";


const BuildingBlock = styled.img`
  width: 100%;
  height: ${floorParams.height}px;
  object-fit: fill;
`;

interface FloorPartProps {
    src: string;
    alt: string;
}

const FloorPart: FC<FloorPartProps> = ({ src, alt }) => (
    <BuildingBlock src={src} alt={alt} />
);

export default FloorPart;