import { Megoldas } from "../Megoldas";

describe("Megoldas osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("autok.txt");
    it("2. feladat ellenörzése",() => {
        expect(instance.getLastCarOut()?.RegNumber).toBe("CEG300");
    })
    
});