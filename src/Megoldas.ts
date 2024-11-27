import fs from "fs";
import Car from "./Car";

export class Megoldas {
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
    // 4. feladat
    getNotArrivedCars() {
        let db = 0;
        this.#cars.forEach((car, index) => {
            if (car.IsLeave) {
                const visszahozatal = this.#cars.find((r, i) => i > index && r.IsLeave === false && r.MemberId === car.MemberId);
                if (!visszahozatal) {
                    db++;
                }
            }
        });

        return db;
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
                kivitelek.push([rszSorok[i].Km - rszSorok[i - 1].Km, rszSorok[i].MemberId]);
            }
        }

        const maxos = kivitelek.sort((a, b) => a[0] - b[0]).slice(-1)[0];
        return `Leghosszabb út: ${maxos[0]} km, személy: ${maxos[1]}\n`;
        
    }

    FileWrite(rendszám: string){
        const fileName = `${rendszám}_menetlevel.txt`;
        const filteredRecords = this.#cars.filter(record => record.RegNumber === rendszám);

    if (filteredRecords.length === 0) {
        console.log('Nincs adat a megadott rendszámhoz.');

        return;
    }
    const lines: string[] = [];

    filteredRecords.forEach((record, index) => {
        if (record.IsLeave == true) { // Kijárat
            const visszahozatal = filteredRecords.find((r, i) => i > index && r.IsLeave == false && r.MemberId === record.MemberId);
                lines.push([
                    record.MemberId,
                    `${record.Day}. ${record.Time}`,
                    `${record.Km} km`,
                    visszahozatal ? `${visszahozatal.Day}. ${visszahozatal.Time}`: null,
                    visszahozatal ?`${visszahozatal.Km} km`: null,
                ].filter(x => x !=null).join('\t'));          
        }
        
    });

    if (lines.length > 0) {
        fs.writeFile(fileName, lines.join('\r\n'), (err) => {
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

    getDistanceDrivenByEachCar() {
        const RegNumbers: string[] = this.#cars.map(c => c.RegNumber).filter((value, index, self) => self.indexOf(value) === index);
        const distances: [string, number][] = [];
        for (const regnumb of RegNumbers) {
            const regdata = this.#cars.filter(s => s.RegNumber === regnumb);
            let distance = 0;
            if (regdata.length % 2 === 0) {
                for (let i = 1; i < regdata.length; i += 2) {
                    distance += regdata[i].Km - regdata[i - 1].Km;
                }
            } else {
                for (let i = 1; i < regdata.length - 1; i += 2) {
                    distance += regdata[i].Km - regdata[i - 1].Km;
                }
            }

            distances.push([regnumb, distance]);
        }
        distances.pop();
        distances.sort((a, b) => a[0].localeCompare(b[0]));
        return distances;
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
