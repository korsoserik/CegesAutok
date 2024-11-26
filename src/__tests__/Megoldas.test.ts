import { Megoldas } from "../Megoldas";
const instance: Megoldas = new Megoldas("autok.txt");

describe("Megoldas osztály unit tesztek", () => {
    // 2. Feladat
    it("Should be CEG300", () => {
        expect(instance.getLastCarOut()?.RegNumber).toBe("CEG300");
    });
    // 3. Feladat
    it("Sholud be 2 cars on day 4", () => {
        expect(instance.getCarsOnGivenDay(4).length).toBe(2);
    });
    // 4. Feladat
    it("Should be 4", () => {
        expect(instance.getNotArrivedCars()).toBe(4);
    });
});
