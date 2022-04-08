import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
    to(decimal: number): string {
        return decimal.toFixed(2);
    }

    from(decimal: string): number | null {
        return decimal ? parseFloat(decimal) : null;
    }
}