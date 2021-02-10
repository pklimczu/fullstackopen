import express from 'express';
import patientsService from '../services/patientService';
import { PatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    const id: string = req.params.id;
    const entry: PatientEntry | undefined = patientsService.getPatientById(id);
    if (!entry)
        res.send("No patient found");
    res.send(entry);
});

export default router;