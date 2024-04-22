import { useContext } from "react";
import { BuildingFloorsContext, BuildingContextProps } from "../context/BuildingFloorsContext";

export const useBuildingStore = (): BuildingContextProps => {
    const context = useContext(BuildingFloorsContext);

    if (!context) {
        throw new Error("useBuildingStore must be used within an BuildingProvider");
    }

    return context;
};
