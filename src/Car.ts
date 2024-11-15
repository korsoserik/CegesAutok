export default class Car {
    #day: number;
    #time: string;
    #RegNumber: string;
    #MemberId: number;
    #KM: number;
    #IsLeave: boolean;

    public get Day(): number {
        return this.#day;
    }

    public get IsLeave(): boolean {
        return this.#IsLeave;
    }

    public get RegNumber(): string {
        return this.#RegNumber;
    }

    public get MemberId(): number {
        return this.#MemberId;
    }

    public get Km(): number {
        return this.#KM;
    }

    public get Time(): string {
        return this.#time;
    }

    constructor(day: number, time: string, RegNumber: string, MemberId: number, KM: number, In: number) {
        this.#day = day;
        this.#time = time;
        this.#RegNumber = RegNumber;
        this.#MemberId = MemberId;
        this.#KM = KM;
        if (In == 0) {
            this.#IsLeave = true;
        } else {
            this.#IsLeave = false;
        }
    }
}
