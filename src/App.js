import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import AllocationForm from "./AllocationForm";
import {Container, Grid} from 'semantic-ui-react';

function App() {
    return (
        <Container>
            <h1>Pro Rate Calculator</h1>
            <Grid columns={3}>
                <AllocationForm/>
            </Grid>
        </Container>
    )
}

export default App;
