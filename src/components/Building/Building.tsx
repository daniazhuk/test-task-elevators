import { FC } from "react";

import styled from "styled-components";
import BuildingFloor from "../Floor/BuildingFloor";
import { useBuildingStore } from "../../stores/hooks/useBuildingStore";
import { useElevatorsStore } from "../../stores/hooks/useElevatorsStore";

const BuildingGrid = styled.div<{elevatorsAmount: number}>`
    display: grid;
    grid-template-columns: 1fr 0.5fr ${({elevatorsAmount}) => "auto ".repeat(elevatorsAmount)} 1fr;
    height: fit-content;
`;

const BuildingImageConstruction: FC = () => {
    const { buildingData } = useBuildingStore();
    const { elevatorsData } = useElevatorsStore();

    return (
        <BuildingGrid elevatorsAmount={elevatorsData.length}>
            {buildingData.map(({floorNumber, id}) => (
                <BuildingFloor key={id} floorNumber={floorNumber}/>
            ))}
        </BuildingGrid>
    );
};

export default BuildingImageConstruction;
