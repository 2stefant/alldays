import { isoDayFormat, determineRange, firstDayCurrentYear, lastDayCurrentYear } from "../index";
import moment from "moment";

describe("other", () => {

    //Learns about moment api.
    test("firstDayCurrentYear", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-01-01";
        //Act
        let day = moment(actual).startOf("year");
        //Assert
        expect(day.format(isoDayFormat)).toEqual(expected);
    });

    //Learns about moment api.
    test("lastDayCurrentYear", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-12-31";
        //Act
        let day = moment(actual).endOf("year");
        //Assert
        expect(day.format(isoDayFormat)).toEqual(expected);
    });
});
