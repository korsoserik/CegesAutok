import fs from "fs";
import Car from "./Car";

export default class Megoldas {

    #cars: Car[] = [];
    #RegNumber: string[] = [];

    getUniqueRegNumbers() {   
        for (const car of this.#cars) {
            if (!this.#RegNumber.includes(car.RegNumber)) {
                this.#RegNumber.push(car.RegNumber);
            }
        }
    }

    getLastCarOut() {
        const lastCarOut = this.#cars.filter(c => c.IsLeave).sort((a, b) => a.Day - b.Day).pop();
        return lastCarOut;
    }

    getNotArrivedCars() {
        
        const notArrivedCars = this.#cars.filter(c => !c.IsLeave).length;
        const ArrivedCars = this.#cars.filter(c => c.IsLeave).length;
        return ArrivedCars- notArrivedCars;
    }

    getPersonWithMostRange() {
        const kivitelek = [];
        for (const rsz of this.#RegNumber) {
            const rszSorok = this.#cars.filter(s => s.RegNumber === rsz);
            for (let i = 1; i < rszSorok.length; i += 2) {
                kivitelek.push([
                    rszSorok[i].Km - rszSorok[i - 1].Km,
                    rszSorok[i].MemberId
                ]);
        }
        }

        const maxos = kivitelek.sort((a, b) => a[0] - b[0]).slice(-1)[0];
        return(`A legtöbb távolságot megtette: ${maxos[0]} személy, távolság: ${maxos[1]} km\n`);

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