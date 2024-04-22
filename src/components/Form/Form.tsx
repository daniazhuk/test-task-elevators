import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBuildingStore, useElevatorsStore } from "../../stores";

interface FormData {
  buildingFloors: string;
  elevatorsAmount: string;
}

const StyledForm = styled.form`
  width: 200px;
  align-items: center;
  margin-left: 100px;
  padding: 100px 10px;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-top: 10px;
  color: white;
`;

const FormInput = styled.input`
  padding: 8px;
  margin-top: 10px;
`;

const FormErrorContainer = styled.div`
  height: 45px;
`;

const FormError = styled.span`
  color: red;
  font-size: 12px;
`;

const FormButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const Form: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();


    const {setBuildingData} = useBuildingStore();

    const {updateElevatorsData} = useElevatorsStore();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const building = new Array(parseInt(data.buildingFloors)).fill(null).map((_item, index) => {
            return {
                id: index.toString().repeat(3) + "-fl",
                floorNumber: index};
        }).reverse();
        const elevators = new Array(parseInt(data.elevatorsAmount)).fill(null).map((_item, index) => {
            return {
                elevatorId: index.toString().repeat(3) + "-el",
                floorsCallQueue: [0]};
        }).reverse();
        updateElevatorsData(elevators);
        setBuildingData(building);

    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Text>Elevator Logic</Text>
            <FormLabel htmlFor="buildingFloors">Building Floors</FormLabel>
            <FormInput
                type="number"
                id="buildingFloors"
                {...register("buildingFloors", { required: true, min: 1 })}
            />
            <FormErrorContainer>
                {errors.buildingFloors && (
                    <FormError>This field is required and should be at least 1</FormError>
                )}
            </FormErrorContainer>

            <FormLabel htmlFor="elevatorsAmount">Elevators Amount</FormLabel>
            <FormInput
                type="number"
                id="elevatorsAmount"
                {...register("elevatorsAmount", { required: true, min: 1 })}
            />
            <FormErrorContainer>
                {errors.elevatorsAmount && (
                    <FormError>This field is required and should be at least 1</FormError>
                )}
            </FormErrorContainer>

            <FormButton type="submit">
                Update params
            </FormButton>
        </StyledForm>
    );
};

export default Form;
