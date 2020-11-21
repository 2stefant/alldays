import { isoDayFormat, getDayWeeksRelative, getDayRelative } from "../index";
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

    test("getDayWeeksRelative 1 after", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-15";
        //Act
        let day = getDayWeeksRelative(actual, 1);
        //Assert
        expect(day).toEqual(expected);
    });

    test("getDayWeeksRelative 1 before", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-01";
        //Act
        let day = getDayWeeksRelative(actual, -1);
        //Assert
        expect(day).toEqual(expected);
    });

    test("getDayRelative 1 after", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-09";
        //Act
        let day = getDayRelative(actual, 1);
        //Assert
        expect(day).toEqual(expected);
    });

    test("getDayRelative 1 before", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-07";
        //Act
        let day = getDayRelative(actual, -1);
        //Assert
        expect(day).toEqual(expected);
    });

});
