import styled from "styled-components";
import "./App.css";
import Building from "./components/Building";
import Form from "./components/Form/Form";
import { BuildingProvider } from "./stores";
import { ElevatorsProvider } from "./stores/context/EvevatorsContext";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: 10%;
  justify-content: space-between;
`;

function App() {
    return (
        <BuildingProvider>
            <ElevatorsProvider>
                <AppContainer>
                    <Building />
                    <Form/>
                </AppContainer>
            </ElevatorsProvider>
        </BuildingProvider>
    );
}

export default App;
