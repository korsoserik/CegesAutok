export default class Car {
    #day:  number;
    #time: string;
    #RegNumber: string;
    #MemberId: number;
    #KM: number;
    #IsLeave: boolean;

    constructor(day: number, time: string, RegNumber: string, MemberId: number, KM: number, In: number) {
        this.#day = day;
        this.#time = time;
        this.#RegNumber = RegNumber;
        this.#MemberId = MemberId;
        this.#KM = KM;
        if(In == 0) {
            this.#IsLeave = true;
        } else {
            this.#IsLeave = false;
        }
    }
}