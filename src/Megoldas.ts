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

    getCarsOnGivenDay(day: number) {
        return this.#cars.filter(c => c.Day === day);
    }

    getNotArrivedCars() {
        const notArrivedCars = this.#cars.filter(c => !c.IsLeave).length;
        const ArrivedCars = this.#cars.filter(c => c.IsLeave).length;
        return ArrivedCars- notArrivedCars;
    }

    getLastCarOut() {
        const lastCarOut = this.#cars
            .filter(c => c.IsLeave)
            .sort((a, b) => a.Day - b.Day)
            .pop();
        return lastCarOut;
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
        return(`A legtöbb távolságot megtette: ${maxos[0]} km, távolság: ${maxos[1]} személy\n`);
        

    }

    FileWrite(rendszám: string){
        const fileName = `${rendszám}_menetlevel.txt`;
        const filteredRecords = this.#cars.filter(record => record.RegNumber === rendszám);

    if (filteredRecords.length === 0) {
        console.log('Nincs adat a megadott rendszámhoz.');

        return;
    }

    // A fájl neve

    // Az adatok feldolgozása és fájlba írás
    const lines: string[] = [];

    filteredRecords.forEach((record, index) => {
        if (record.IsLeave == true) { // Kijárat
            const visszahozatal = filteredRecords.find((r, i) => i > index && r.IsLeave == false && r.MemberId === record.MemberId);
                lines.push([
                    record.MemberId,
                    `${record.Day}. ${record.Time}`,
                    `${record.Km} km`,
                    visszahozatal ? `${visszahozatal.Day}. ${visszahozatal.Time}`: "",
                    visszahozatal ?`${visszahozatal.Km} km`: ""
                ].join('\t'));          
        }
        
    });

    if (lines.length > 0) {
        // Írás a fájlba
        fs.writeFile(fileName, lines.join('\n'), (err) => {
            if (err) {
                console.error('Hiba történt a fájl írása során:', err);
            } else {
                console.log(`A menetlevél sikeresen létrejött: ${fileName}`);
            }
        });
    } else {
        console.log('Nincs elegendő adat a menetlevél elkészítéséhez.');
    }


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
