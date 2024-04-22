import { render, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form", () => {
    test("renders form inputs", () => {
        const { getByLabelText } = render(<Form />);
    
        const buildingFloorsInput = getByLabelText("Building Floors");
        expect(buildingFloorsInput).toBeInTheDocument();
    
        const elevatorsAmountInput = getByLabelText("Elevators Amount");
        expect(elevatorsAmountInput).toBeInTheDocument();
    });

    test("displays error message for empty building floors input", () => {
        const { getByLabelText, getByText } = render(<Form />);
    
        const buildingFloorsInput = getByLabelText("Building Floors");
        fireEvent.change(buildingFloorsInput, { target: { value: "" } });
    
        const errorMessage = getByText("This field is required and should be at least 1");
        expect(errorMessage).toBeInTheDocument();
    });

    test("displays error message for empty elevators amount input", () => {
        const { getByLabelText, getByText } = render(<Form />);
    
        const elevatorsAmountInput = getByLabelText("Elevators Amount");
        fireEvent.change(elevatorsAmountInput, { target: { value: "" } });
    
        const errorMessage = getByText("This field is required and should be at least 1");
        expect(errorMessage).toBeInTheDocument();
    });

    test("calls onSubmit function with correct form data", () => {
        const { getByLabelText, getByText } = render(<Form />);
    
        const buildingFloorsInput = getByLabelText("Building Floors");
        fireEvent.change(buildingFloorsInput, { target: { value: "5" } });
    
        const elevatorsAmountInput = getByLabelText("Elevators Amount");
        fireEvent.change(elevatorsAmountInput, { target: { value: "3" } });

        const submitButton = getByText("Update params");
        fireEvent.click(submitButton);
    });
});
