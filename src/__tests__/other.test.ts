import { isoDayFormat, getDayWeeksRelative, getDayRelative, getDayMetrics } from "../other";
import moment from "moment";

describe("other", () => {

    test("getDayMetrics - day", () => {
        //Act
        let metrics = getDayMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.day).toEqual(7);
        expect(metrics.dayNameShort).toEqual("Sun");
        expect(metrics.dayBefore).toEqual("2019-12-07");
        expect(metrics.dayAfter).toEqual("2019-12-09");
        expect(metrics.dayOfYear).toEqual(342);
        expect(metrics.dayWeekBefore).toEqual("2019-12-01");
        expect(metrics.dayWeekAfter).toEqual("2019-12-15");
        expect(metrics.daysInMonth).toEqual(31);
    });

    test("getDayMetrics - week", () => {
        //Act
        let metrics = getDayMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.week).toEqual(49);
        expect(metrics.weekStartDay).toEqual("2019-12-02");
        expect(metrics.weekEndDay).toEqual("2019-12-08");
        expect(metrics.weeksInYear).toEqual(52);
        //expect(metrics.weekdaysShort).toEqual(["Mon"...]);
    });

    test("getDayMetrics - month", () => {
        //Act
        let metrics = getDayMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.month).toEqual(12);
        expect(metrics.monthStartDay).toEqual("2019-12-01");
        expect(metrics.monthEndDay).toEqual("2019-12-31");
        //expect(metrics.monthsShort).toEqual(["Jan"...]);
    });

    test("getDayMetrics - quarter", () => {
        //Act
        let metrics = getDayMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.quarter).toEqual(4);
        expect(metrics.quarterStartDay).toEqual("2019-10-01");
        expect(metrics.quarterEndDay).toEqual("2019-12-31");
    });

    test("getDayMetrics - year", () => {
        //Act
        let metrics = getDayMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.year).toEqual(2019);
        expect(metrics.yearStartDay).toEqual("2019-01-01");
        expect(metrics.yearEndDay).toEqual("2019-12-31");
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
