import React, {useState} from 'react';
import {Form, Input, Button, Grid, GridRow, GridColumn, Container} from 'semantic-ui-react';
import axios from "axios"
import Result from "./Result";

const AllocationForm = () => {
    const newInvestor = {name: '', requested_amount: '', average_amount: ''};
    const [investorState, setInvestorState] = useState([{...newInvestor}]);
    const [allocationState, setAllocationState] = useState([{allocation: ''}])
    const [submitting, setSubmitting] = useState(false)
    const [resultState, setResultState] = useState([])

    const addInvestor = () => {
        setInvestorState([...investorState, {...newInvestor}])
    };

    const handleAllocationChange = (e) => {
        if (e.target.value) {
            if (isNaN(e.target.value)) {
                setAllocationState({...allocationState, [e.target.name]: e.target.value})
            } else {
                setAllocationState({...allocationState, [e.target.name]: parseInt(e.target.value)})
            }
        } else {
            setAllocationState({...allocationState, [e.target.name]: e.target.value})
        }
    }

    const handleInvestorChange = (e) => {
        const updatedInvestors = [...investorState];
        if (e.target.value) {
            if (isNaN(e.target.value)) {
                updatedInvestors[e.target.attributes.id.value][e.target.attributes.type.value] = e.target.value;
            } else {
                updatedInvestors[e.target.attributes.id.value][e.target.attributes.type.value] = parseInt(e.target.value);
            }
            setInvestorState(updatedInvestors)
        } else {
            updatedInvestors[e.target.attributes.id.value][e.target.attributes.type.value] = e.target.value;
            setInvestorState(updatedInvestors)
        }
    }


    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        let data = {
            "allocation_amount": allocationState.allocation,
            "investor_amounts": [...investorState]
        }

        axios.post("http://localhost:3001/calculator", data)
            .then(handleCalculateResponse)
            .catch(handleCalculateFailure)
    }

    const handleCalculateResponse = (response) => {
        setSubmitting(false);
        setResultState([response.data])
    }
    const handleCalculateFailure = (error) => {
        console.log(error)
        setSubmitting(false);
    }

    return (
        <GridRow>
            <GridColumn computer={10}>
                <h3>Inputs</h3>
                <div className="inputs">
                    <Form>
                        <div className="allocation">
                            <h4>Total Available Allocation</h4>
                            <Input icon='dollar' iconPosition="left" name="allocation" type="allocation"
                                   placeholder={"Allocation"}
                                   onChange={handleAllocationChange}/>
                        </div>


                        <div className="investor-breakdown">
                            <h4>Investor Breakdown</h4>
                            {
                                investorState.map((val, idx) => {
                                    const investorId = `name-${idx}`;
                                    const requestedAmountId = `requested-${idx}`;
                                    const averageAmountId = `average-${idx}`;

                                    return (
                                        <div key={`investor-${idx}`} className="investor">
                                            <Input icon='user' iconPosition="left" type="name" data-idx={investorId}
                                                   id={idx} className="name"
                                                   placeholder="name" onChange={handleInvestorChange}
                                                   value={investorState[idx].name}/>

                                            <Input icon='dollar' iconPosition="left" name={requestedAmountId}
                                                   type="requested_amount"
                                                   data-idx={idx} id={idx} className="requested_amount"
                                                   placeholder="Requested Amount"
                                                   onChange={handleInvestorChange}
                                                   value={investorState[idx].requested_amount}/>

                                            <Input icon='dollar' iconPosition="left" name={averageAmountId}
                                                   type="average_amount"
                                                   data-idx={idx} id={idx} className="average_amount"
                                                   placeholder="Average Amount"
                                                   onChange={handleInvestorChange}
                                                   value={investorState[idx].average_amount}/>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className="button-bar">
                            <Button content="Prorate" onClick={handleSubmit} secondary disabled={submitting}/>
                            <Button icon='plus' iconPosition='left' content="Add Investor" onClick={addInvestor}
                                    primary/>
                        </div>
                    </Form>
                </div>
            </GridColumn>
            <GridColumn computer={5}>
                <h3>Results</h3>
                <div className="results">
                    {
                        resultState.map((val, idx) => {
                            {
                                let keys = Object.keys(val)
                                return keys.map((key) => {
                                    return (
                                        <Result name={key} amount={val[key]}/>
                                    )
                                })

                            }
                        })
                    }
                </div>
            </GridColumn>
        </GridRow>
    );
};
export default AllocationForm;