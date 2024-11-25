import { Megoldas } from "../Megoldas";
const instance: Megoldas = new Megoldas("autok.txt");

describe("Megoldas osztály unit tesztek", () => {
    it("Should be CEG300",() => {
        expect(instance.getLastCarOut()?.RegNumber).toBe("CEG300");
    })
    it("Should be 4",() => {
        expect(instance.getNotArrivedCars()).toBe(4);
    })
});