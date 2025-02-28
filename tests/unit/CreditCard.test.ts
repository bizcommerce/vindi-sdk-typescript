import { CreditCard } from '../../src/utils/CreditCard';

describe('CreditCard', () => {
    describe('getCardBrand', () => {
        it('should return Visa for a Visa card number', () => {
            expect(CreditCard.getCardBrand('4111111111111111')).toBe('Visa');
        });

        it('should return MasterCard for a MasterCard card number', () => {
            expect(CreditCard.getCardBrand('5111111111111111')).toBe('Mastercard');
        });

        it('should return American Express for an Amex card number', () => {
            expect(CreditCard.getCardBrand('371111111111111')).toBe('American Express');
        });

        it('should return Elo for an Elo card number', () => {
            expect(CreditCard.getCardBrand('5066991111111118')).toBe('Elo');
        });

        it('should return Hipercard for a Hipercard card number', () => {
            expect(CreditCard.getCardBrand('6062822381370120')).toBe('Hipercard');
        });

        it('should return Unknown for an unknown card number', () => {
            expect(CreditCard.getCardBrand('1234561111111111')).toBe('Unknown');
        });
    });

    describe('isValid', () => {
        it('should return true for a valid card number', () => {
            expect(CreditCard.isValid('4111111111111111')).toBe(true);
        });

        it('should return false for an invalid card number', () => {
            expect(CreditCard.isValid('4111111111111112')).toBe(false);
        });
    });

    describe('maskCardNumber', () => {
        it('should mask the card number correctly', () => {
            expect(CreditCard.maskCardNumber('4111111111111111')).toBe('4111********1111');
        });
    });
});