import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import closedElevatorImage from "../../assets/elevator-closed.png";
import openedElevatorImage from "../../assets/elevator-opened.png";

import { floorParams } from "../../constants/elementParams";
import FloorPart from "../FloorPart/FloorPart";
import { useElevatorsStore } from "../../stores/hooks/useElevatorsStore";
import ElevatorRoom from "../ElevatorRoom/ElevatorRoom";

const FloorElevatorDoorsWrapper = styled.div`
    width: fit-content;
    height: ${floorParams.height}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface PropsType {
    floorNumber: number;
    elevatorIndex: number;
}

const FloorElevatorDoors: FC<PropsType> = ({floorNumber, elevatorIndex}) => {
    const [isOpened, toggleElevatorOpen] = useState(false);

    const {elevatorsData} = useElevatorsStore();
    const {floorsCallQueue} = elevatorsData[elevatorIndex];
    const isElevatorAtThisFloor = floorsCallQueue.length === 1 && floorsCallQueue[0] === floorNumber;

    useEffect(() => {
        toggleElevatorOpen(isElevatorAtThisFloor);
    }, [isElevatorAtThisFloor]);

    return (
        <FloorElevatorDoorsWrapper>
            <FloorPart src={isOpened ? openedElevatorImage : closedElevatorImage} alt="Floor Opened Elevator" />
            {floorNumber === 0 && <ElevatorRoom elevatorIndex={elevatorIndex}/>}
        </FloorElevatorDoorsWrapper>
    );
};

export default FloorElevatorDoors;
