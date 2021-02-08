import patientData from '../../data/patients.json';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: String(Math.random() * 1000),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry
};