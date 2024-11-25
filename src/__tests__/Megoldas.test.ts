import { Megoldas } from "../Megoldas";


describe("Megoldas osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("autok.txt");
    it("Should be CEG300",() => {       // 2. feladat
        expect(instance.getLastCarOut()?.RegNumber).toBe("CEG300");
    })
    it("Should be 4",() => {    // 4. feladat
        expect(instance.getNotArrivedCars()).toBe(4);
    })
    it("Should return the person with the most range", () => { // 6. feladat
        expect(instance.getPersonWithMostRange()).toBe("A legtöbb távolságot megtette: 1551 km, távolság: 506 személy\n");
    });
});