import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello world');
});

app.get('/bmi', (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        const response = calculateBmi(height, weight);
        res.send({
            weight: weight,
            height: height,
            bmi: response
        });
    } catch {
        res.send('Oops, something went wrong');
    }
});
  
app.get('/exercises', (req, res) => {

    interface RequestBody {
        daily_exercises: Array<number>
        target: number
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body : RequestBody = req.body;
        res.send(calculateExercises(body.daily_exercises, body.target));
    } catch {
        res.send("uuu");
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});