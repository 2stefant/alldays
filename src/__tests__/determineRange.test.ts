import { alldays, isoDayFormat, determineRange, firstDayCurrentYear, lastDayCurrentYear } from "../index";
import moment from "moment";

describe("determineRange", () => {

    test("empty args", () => {
        //Arrange
        let expectedStart = firstDayCurrentYear;
        let expectedEnd = lastDayCurrentYear;
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


