interface ExerciseScore {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (days: Array<number>, target: number) : ExerciseScore => {

    const ratingString = ["BAD", "NOT BAD", "NOT BAD AT ALL"];

    const ratio = days.reduce((previousValue: number, currentValue: number): number => previousValue + currentValue) / days.length;
    const getRatingString = () : string => {
        const diff = ratio - target;
        if (diff < 0) {
            return ratingString[0];
        } else if (diff < 0.5) {
            return ratingString[1];
        } else {
            return ratingString[2];
        }
    };

    return {
        periodLength: days.length,
        trainingDays: days.filter(day => day > 0).length,
        success: ratio > target,
        rating: ratio,
        ratingDescription: getRatingString(),
        target: target,
        average: ratio
    };
};