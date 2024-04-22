import styled from "styled-components";
import { floorParams } from "../../constants/elementParams";
import { FC } from "react";
import { useElevatorsStore } from "../../stores/hooks/useElevatorsStore";

const FloorControlPanelWrapper = styled.div`
    cursor: pointer;
    height: ${floorParams.height}px;
    background-color: #f0dfd6;
    box-sizing: border-box;
    border: 1px solid black; 
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
`;

const ButtonWrapper = styled.div`
    border-radius: 50%;
    padding: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-style: solid;
    border-width: 2px;
    border-color: blue;
`;

const ButtonBase = styled.div`
    margin: auto;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-width: 4px 4px 0 0;
    border-color: #000;
`;

const ButtonUp = styled(ButtonBase)`
    transform: rotate(-45deg);
`;

const ButtonDown = styled(ButtonBase)`
    transform: rotate(135deg);
`;

interface PropsType {
    floorNumber: number;
}

const FloorControlPanel: FC<PropsType> = ({floorNumber}) => {

    const {elevatorsData, addFloorToElevatorCallQueue} = useElevatorsStore();

    const callElevator = () => {
        // if any of elevators already has been called and moving to target floor, then skip
        if (!elevatorsData.some(elevator => (elevator.floorsCallQueue.length === 1 && elevator.floorsCallQueue[0] === floorNumber) || elevator.floorsCallQueue.slice(1).includes(floorNumber))) {
            console.log("added to queue", floorNumber);
            addFloorToElevatorCallQueue(floorNumber);
        } else {
            console.log("elevator is already at this floor or it'll array soon");
        }
    };

    return (
        <FloorControlPanelWrapper>
            <ButtonWrapper onClick={callElevator}>
                <ButtonUp />
            </ButtonWrapper>
            <ButtonWrapper onClick={callElevator}>
                <ButtonDown />
            </ButtonWrapper>
        </FloorControlPanelWrapper>
    );
};

export default FloorControlPanel;