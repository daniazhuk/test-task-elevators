import styled, { keyframes } from "styled-components";
import { floorParams } from "../../constants/elementParams";
import ElevatorRoomImage from "../../assets/elevator-room-box.png";
import { FC, useCallback } from "react";
import { useElevatorsStore } from "../../stores/hooks/useElevatorsStore";
import delay from "../../helpers/delay";

const slideAnimation = (currentFloor: number, floorsDistance: number) => keyframes`
    from {
        top: ${-1*currentFloor*100}%;
    }
    to {
        top: ${-1*floorsDistance*100}%;
    }
`;

const ElevatorRoomBase = styled.img<{ targetFloor: number, currentFloor: number}>`
    width: fit-content;
    position: absolute;
    height: ${floorParams.height}px;
    z-index: 2;
    opacity: 0.5;
    top: ${({currentFloor}) => -1*currentFloor*100}%;
    animation: ${({ currentFloor, targetFloor }) => 
        targetFloor - currentFloor && slideAnimation(currentFloor, targetFloor)} ${({currentFloor, targetFloor}) => Math.abs(currentFloor - targetFloor)*1}s linear forwards;
`;

interface PropsType {
    elevatorIndex: number;
}

const ElevatorRoom: FC<PropsType> = ({ elevatorIndex }) => {
    const {elevatorsData, removeFloorFromElevatorCallQueue} = useElevatorsStore();

    const handleAnimationEnd = useCallback(async () => {
        await delay(500);
        removeFloorFromElevatorCallQueue(elevatorIndex);
    }, [elevatorsData.length]);

    const {floorsCallQueue} = elevatorsData[elevatorIndex];

    return (
        <ElevatorRoomBase src={ElevatorRoomImage} 
            onAnimationEnd={handleAnimationEnd}
            alt="Elevator Room"
            currentFloor={floorsCallQueue[0]}
            targetFloor={floorsCallQueue?.[1] !== undefined ? floorsCallQueue[1] : floorsCallQueue[0]}/>
    );
};

export default ElevatorRoom;