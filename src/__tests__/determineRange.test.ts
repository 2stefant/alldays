import { currentYearEndDay, currentYearStartDay } from "../other";
import { determineRange } from "../determineRange";

describe("determineRange", () => {

    test("empty args", () => {
        //Arrange
        let expectedStart = currentYearStartDay;
        let expectedEnd = currentYearEndDay;
        //Act
        let range = determineRange("", "");
        //Assert
        expect(range.start).toEqual(expectedStart);
        expect(range.end).toEqual(expectedEnd);
        expect(range.validArgs).toEqual(true);
    });

    test("'from' arg is weird", () => {
        //Arrange
        //Act
        let range = determineRange("fromWeird", "");
        //Assert
        expect(range.validArgs).toEqual(false);
    });

    test("'to' arg is weird", () => {
        //Arrange
        //Act
        let range = determineRange("", "toWeird");
        //Assert
        expect(range.validArgs).toEqual(false);
    });

});


