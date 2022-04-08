interface PlatformPayload {
    name: string;
    initialAmount?: number;
    currentAmount?: number;
}

export class PlatformDTO {
    constructor({ name, initialAmount, currentAmount }: PlatformPayload) {
        this.name = name;
        if (initialAmount) this.initialAmount = initialAmount;
        if (currentAmount) this.currentAmount = currentAmount;
    }

    name: string;
    initialAmount = 0;
    currentAmount = 0;
}