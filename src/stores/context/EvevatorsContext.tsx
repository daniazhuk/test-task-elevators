import { createContext, FC, useState, ReactNode, SetStateAction, Dispatch} from "react";


// floorsCallQueue - queue with floors on which exact elevator was called. 
// First number(index = 0) means last floor number on which elevator arrived lastest time. 
// All next numbers forms queue with floor on which elevator will arrive in order.
// if floorsCallQueue.length === 1 means elevator is not moving.
interface ElevatorParams {
    elevatorId: string;
    floorsCallQueue: number[];
}

type ElevatorsData = ElevatorParams[];

export interface ElevatorContextProps {
    elevatorsData: ElevatorsData;
    updateElevatorsData: Dispatch<SetStateAction<ElevatorsData>>;
    // eslint-disable-next-line no-unused-vars
    addFloorToElevatorCallQueue: (targetFloor: number) => void;
    // eslint-disable-next-line no-unused-vars
    removeFloorFromElevatorCallQueue: (elevatorIndex: number) => void;
}

export const ElevatorsContext = createContext<ElevatorContextProps | undefined>(undefined);

interface ElevatorsProviderProps {
    children: ReactNode;
}

export const ElevatorsProvider: FC<ElevatorsProviderProps> = ({ children }) => {
    const defaultPositions: ElevatorsData = [
        {
            elevatorId: "111-el",
            floorsCallQueue: [0],
        },

    ];
    
    const [elevatorsData, updateElevatorsData] = useState<ElevatorsData>(defaultPositions);

    const calcQueueDistance = (elevatorQueue: number[]) =>
        elevatorQueue.reduce((totalDistance, floorNum, floorIndexInQueue) => {
            const nextPosion = elevatorQueue[floorIndexInQueue + 1];
            if (nextPosion !== undefined) {
                const currentPosion = floorNum;
                totalDistance += Math.abs(currentPosion - nextPosion);
            }

            return totalDistance;
        }, 0);

    const findNearestElevator = (targetFloor: number) => {
        // 1. how many level need to pass = abs(currentPosion - destination)
        // 2. how many level need to return = abs(destination - myLevel)
        // 3. sum 1. + 2.

        return elevatorsData.reduce(
            (nearestElevator, elevator) => {
                const { elevatorId, floorsCallQueue } = elevator;
                const distance = calcQueueDistance([...floorsCallQueue, targetFloor]);
                // console.log("------");
                // console.log("elevatorId", elevatorId);
                // console.log("distance", distance);
                // console.log("floorsCallQueue", floorsCallQueue);
                // console.log("targetFloor", targetFloor);
                // console.log("------");

                if (distance < nearestElevator.minDistance) {
                    nearestElevator.id = elevatorId;
                    nearestElevator.minDistance = distance;
                }

                return nearestElevator;
            },
            {
                id: "",
                minDistance: Infinity,
            },
        );
    };

    const addFloorToElevatorCallQueue = (targetFloor: number) => {
        const nearestElevator = findNearestElevator(targetFloor);
        updateElevatorsData((prevElevatorsData) =>
            prevElevatorsData.map((elevator) =>
                elevator.elevatorId === nearestElevator.id
                    ? { ...elevator, floorsCallQueue: [...elevator.floorsCallQueue, targetFloor] }
                    : elevator,
            ),
        );
    };

    const removeFloorFromElevatorCallQueue = (elevatorIndex: number) => {
        updateElevatorsData((prevElevatorsData) =>
            prevElevatorsData.map((elevator, index) =>
                index === elevatorIndex
                    ? { ...elevator, floorsCallQueue: elevator.floorsCallQueue.slice(1)}
                    : elevator,
            ),
        );
    };

    return (
        <ElevatorsContext.Provider value={{ elevatorsData, updateElevatorsData, addFloorToElevatorCallQueue, removeFloorFromElevatorCallQueue }}>
            {children}
        </ElevatorsContext.Provider>
    );
};
