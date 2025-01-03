import { Megoldas } from "../Megoldas";


describe("Megoldas osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("autok.txt");
    instance.getUniqueRegNumbers();
    it("Should be CEG300",() => {       // 2. feladat
        expect(instance.getLastCarOut()?.RegNumber).toBe("CEG300");
    })
    it("Should be 4",() => {    // 4. feladat
        expect(instance.getNotArrivedCars()).toBe(4);
    })
    it("Should return the person with the most range", () => { // 6. feladat
        expect(instance.getPersonWithMostRange()).toBe("Leghosszabb út: 1551 km, személy: 506\n");
    });
    it("Should return cars on given day", () => { // 3.Feladat
        const day = 3;
        const carsOnDay = instance.getCarsOnGivenDay(day);
        expect(carsOnDay.length).toBeGreaterThan(0);
        carsOnDay.forEach(car => {
            expect(car.Day).toBe(day);
        });
    });
        // 3. Feladat
    it("Sholud be 2 cars on day 4", () => {
        expect(instance.getCarsOnGivenDay(4).length).toBe(2);
    });
    const fs = require("fs");
    it("Files should be equal", () => {
        let res = fs.readFileSync("CEG304_menetlevel.txt").toString();
        let expected = fs.readFileSync("CEG304_menetlevel_OH_jo.txt").toString();
        expect(res).toEqual(expected);
    });
    it("Shoud return the cars", () => {
        let expected : [string, number][] = [
            ["CEG300", 6751],
            ["CEG301", 5441],
            ["CEG302", 5101],
            ["CEG303", 7465],
            ["CEG304", 6564],
            ["CEG305", 5232],
            ["CEG306", 7165],
            ["CEG307", 6489],
            ["CEG308", 6745],
            ["CEG309", 1252]
        ];
        expect(instance.getDistanceDrivenByEachCar()).toEqual(expected);
    });
});

