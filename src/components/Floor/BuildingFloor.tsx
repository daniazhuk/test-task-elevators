import { FC } from "react";

import floorLeftImage from "../../assets/floor-left.png";
import floorRightImage from "../../assets/floor-right.png";
import FloorPart from "../FloorPart/FloorPart";
import FloorElevatorDoors from "../FloorElevatorDoors";
import FloorControlPanel from "../FloorControlPanel/FloorControlPanel";
import { useElevatorsStore } from "../../stores/hooks/useElevatorsStore";
import styled from "styled-components";

const ElevatorWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

interface PropsType {
    floorNumber: number;
}

const BuildingFloor: FC<PropsType> = ({floorNumber}) => {
    const {elevatorsData} = useElevatorsStore();

    const elevators = elevatorsData.map((elevatorItem, index) => 
        <ElevatorWrapper key={elevatorItem.elevatorId}>
            <FloorElevatorDoors floorNumber={floorNumber} elevatorIndex={index} />
        </ElevatorWrapper>,
    );

    return (
        <>
            <FloorPart src={floorLeftImage} alt={"Floor Left"} />
            <FloorControlPanel floorNumber={floorNumber}/>
            {elevators}
            <FloorPart src={floorRightImage} alt={"Floor Right"} />
        </>
    );
};

export default BuildingFloor;