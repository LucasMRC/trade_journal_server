import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
    to(decimal: number): string {
        return decimal.toFixed(2);
    }

    from(decimal: string): number | null {
        return decimal ? parseFloat(decimal) : null;
    }
}

export class DateTransformer implements ValueTransformer {
    to(date: string): Date | null {
        return date ? new Date(date) : null;
    }

    from(date: Date): string {
        if (date instanceof Date)
            return date.toISOString().split('T')[0];
        return date;
    }
}