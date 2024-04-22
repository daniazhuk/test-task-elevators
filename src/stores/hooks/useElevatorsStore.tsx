import { useContext } from "react";
import { ElevatorContextProps, ElevatorsContext } from "../context/EvevatorsContext";

export const useElevatorsStore = (): ElevatorContextProps => {
    const context = useContext(ElevatorsContext);

    if (!context) {
        throw new Error("useElevatorsStore must be used within an ElevatorsProvider");
    }

    return context;
};
