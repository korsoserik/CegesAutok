import fs from "fs";
import Car from "./Car";

export default class Megoldas {
    #cars: Car[] = [];

    getCarsOnGivenDay(day: number) {
        return this.#cars.filter(c => c.Day === day);
    }



    getLastCarOut() {
        const lastCarOut = this.#cars
            .filter(c => c.IsLeave)
            .sort((a, b) => a.Day - b.Day)
            .pop();
        return lastCarOut;
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
