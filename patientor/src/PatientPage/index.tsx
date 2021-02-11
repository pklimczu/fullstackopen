import axios from "axios";
import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Container, Table } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import { PatientWithEntries } from "../types";

const PatientPage: React.FC = () => {
    
    const [patient, setPatient] = useState<PatientWithEntries | undefined>(undefined);
    const [{ patients }, dispatch] = useStateValue();
    const match = useRouteMatch<{ id: string }>("/patients/:id");

    React.useEffect(() => {
        const id: string | undefined = match?.params.id;

        const possiblePatient = Object.values(patients).find(patient => patient.id === id);

        const fetchPatient = async () => {
            const { data: patient } = await axios.get<PatientWithEntries>(`${apiBaseUrl}/patients/${id}`);
            setPatient(patient);
            dispatch(addPatient(patient));
        };

        if (!possiblePatient) {
            fetchPatient();
        } else {
            setPatient(possiblePatient);
        }
        
    });

    return (
        <div>
            <Container>
                <h2>Name</h2>
                <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>date of birth</Table.Cell>
                        <Table.Cell>{patient?.dateOfBirth}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>ssn</Table.Cell>
                        <Table.Cell>{patient?.ssn}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>gender</Table.Cell>
                        <Table.Cell>{patient?.gender}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>occupation</Table.Cell>
                        <Table.Cell>{patient?.occupation}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            </Container>
        </div>
    );
};

export default PatientPage;