import Car from "../Car";

describe("Car class", () => {
    let car: Car;
    beforeEach(() => {
        car = new Car(1, "12:00", "ABC-123", 1, 100, 0);
    });

    it("should create a new car object", () => {
        expect(car).toBeInstanceOf(Car);
    });

    it("should have a day property", () => {
        expect(car.Day).toBe(1);
    });

    it("should have a time property", () => {
        expect(car.Time).toBe("12:00");
    });

    it("should have a RegNumber property", () => {
        expect(car.RegNumber).toBe("ABC-123");
    });

    it("should have a MemberId property", () => {
        expect(car.MemberId).toBe(1);
    });

    it("should have a KM property", () => {
        expect(car.Km).toBe(100);
    });

    it("should have a IsLeave property", () => {
        expect(car.IsLeave).toBe(true);
    });

    it("should have a IsLeave property", () => {
        const car2 = new Car(1, "12:00", "ABC-123", 1, 100, 1);
        expect(car2.IsLeave).toBe(false);
    });
});
