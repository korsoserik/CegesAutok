import fs from "fs";
import Car from "./Car";

export default class Megoldas {

    #cars: Car[] = [];

    getLastCarOut() {
        const lastCarOut = this.#cars.filter(c => c.IsLeave).sort((a, b) => a.Day - b.Day).pop();
        return lastCarOut;
    }

    getNotArrivedCars() {
        const notArrivedCars = this.#cars.filter(c => !c.IsLeave).length;
        const ArrivedCars = this.#cars.filter(c => c.IsLeave).length;
        return ArrivedCars- notArrivedCars;
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