import { createContext, FC, useState, ReactNode, Dispatch } from "react";

interface FloorParams {
    id: string;
    floorNumber: number;
}

type BuildingData = FloorParams[];

export interface BuildingContextProps {
    buildingData: BuildingData;
    setBuildingData: Dispatch<FloorParams[]>;
}

export const BuildingFloorsContext = createContext<BuildingContextProps | undefined>(undefined);

interface BuildingProviderProps {
    children: ReactNode;
}

export const BuildingProvider: FC<BuildingProviderProps> = ({ children }) => {
    const defaultBuilding: BuildingData = [
        {
            id: "0000-fl",
            floorNumber: 0,
        },
        {
            id: "1111-fl",
            floorNumber: 1,
        },
        {
            id: "2222-fl",
            floorNumber: 2,
        },
        {
            id: "3333-fl",
            floorNumber: 3,
        },
        {
            id: "4444-fl",
            floorNumber: 4,
        },
        {
            id: "5555-fl",
            floorNumber: 5,
        },
        {
            id: "6666-fl",
            floorNumber: 6,
        },
        {
            id: "7777-fl",
            floorNumber: 7,
        },
    ].reverse();
    
    const [buildingData, setBuildingData] = useState<BuildingData>(defaultBuilding);

    return (
        <BuildingFloorsContext.Provider value={{ buildingData, setBuildingData }}>
            {children}
        </BuildingFloorsContext.Provider>
    );
};
