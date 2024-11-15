import fs from "fs";
import Car from "./Car";

export default class Megoldas {

    #cars: Car[] = [];

    getLastCarOut() {
        const lastCarOut = this.#cars.filter(c => c.IsLeave).sort((a, b) => a.Day - b.Day).pop();
        return lastCarOut;
    }

    getNotArrivedCars() {
        //Nem jó
        const notArrivedCars = this.#cars.filter(c => !c.IsLeave).length;
        const ArrivedCars = this.#cars.filter(c => c.IsLeave).length;
        return ArrivedCars- notArrivedCars;
    }

    getPersonWithMostRange() {
        const carMap: Map<string, Car[]> = new Map();

    // Group cars by their registration number
    this.#cars.forEach(car => {
        if (!carMap.has(car.RegNumber)) {
            carMap.set(car.RegNumber, []);
        }
        carMap.get(car.RegNumber)!.push(car);
    });

    let maxKm = 0;
    let personWithMostRange: number | undefined = undefined;

    // Iterate through each group of cars
    carMap.forEach(cars => {
        // Sort cars by day
        cars.sort((a, b) => a.Day - b.Day);

        for (let i = 1; i < cars.length; i++) {
            // Check if the car was returned
            if (cars[i].IsLeave) {
                const distanceTraveled = cars[i].Km - cars[i - 1].Km;
                if (distanceTraveled > maxKm) {
                    maxKm = distanceTraveled;
                    personWithMostRange = cars[i].MemberId;
                }
            }
        }
    });

    return { memberId: personWithMostRange, range: maxKm };
    }

    constructor(source: string) {
        fs.readFileSync(source)
            .toString()
            .split("\n")
            .forEach(row => {
                const parts = row.split(" ");
                const day = parseInt(parts[0]);
                const time = parts[1];
                const regNumber = parts[2];
                const memberId = parseInt(parts[3]);
                const km = parseInt(parts[4]);
                const isLeave = parseInt(parts[5]);
                this.#cars.push(new Car(day, time, regNumber, memberId, km, isLeave));
            });
    }
    
}