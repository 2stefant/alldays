import { alldays } from "../index";

test("alldays", () => {
    let days=alldays(0,"from", "to");
    expect(days).toBe("Hello: 0, from, to.");
});
