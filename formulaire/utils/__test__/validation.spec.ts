// utils/validation.test.ts
import { isNameValid, isEmailValid, areFieldsValid } from "../validation";

describe("Validation utils", () => {
    test("isNameValid returns true for valid names", () => {
        expect(isNameValid("Jean Dupont")).toBe(true);
        expect(isNameValid("Élise")).toBe(true);
        expect(isNameValid("O'Brien")).toBe(true);
    });

    test("isNameValid returns false for invalid names", () => {
        expect(isNameValid("Jean123")).toBe(false);
        expect(isNameValid("")).toBe(false);
        expect(isNameValid("!!!")).toBe(false);
    });

    test("isEmailValid returns true for valid emails", () => {
        expect(isEmailValid("test@example.com")).toBe(true);
        expect(isEmailValid("user.name@domain.co")).toBe(true);
    });

    test("isEmailValid returns false for invalid emails", () => {
        expect(isEmailValid("test@.com")).toBe(false);
        expect(isEmailValid("test@domain")).toBe(false);
        expect(isEmailValid("test@domain,com")).toBe(false);
    });

    test("areFieldsValid returns true for valid fields", () => {
        expect(
            areFieldsValid(
                "Jean",
                "10 rue de Paris",
                "75001",
                "Dupont",
                "jean.dupont@example.com",
                true,
                "2023-11-19"
            )
        ).toBe(true);
    });

    test("areFieldsValid returns false for invalid fields", () => {
        expect(
            areFieldsValid(
                "2", // Invalid name
                "10 rue de Paris",
                "75001",
                "Dupont",
                "jean.dupont@example.com",
                true,
                "2023-11-19"
            )
        ).toBe(false);

        expect(
            areFieldsValid(
                "Jean",
                "10 rue de Paris",
                "75001",
                "Dupont",
                "invalid-email", // Invalid email
                true,
                "2023-11-19"
            )
        ).toBe(false);
    });
});
