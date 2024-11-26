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
        expect(instance.getPersonWithMostRange()).toBe("A legtöbb távolságot megtette: 1551 km, távolság: 506 személy\n");
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
});

