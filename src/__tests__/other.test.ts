import { isoDayFormat, getCalendarRelative, getDayMetrics, getCalendarMetrics, getCalendarBoundary, getDayInWeek } from "../other";
import moment from "moment";

describe("other", () => {

    test("dayInWeek", () => {
        //Assert
        expect(getDayInWeek("2020-11-22", 1)).toEqual("2020-11-16"); // monday
        expect(getDayInWeek("2020-11-22", 5)).toEqual("2020-11-20"); // friday
    });

    test("getDayMetrics - day", () => {
        //Act
        let metrics = getDayMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.day).toEqual("2019-12-08");
        expect(metrics.dayIndex).toEqual(7);
        expect(metrics.dayNameShort).toEqual("Sun");
        expect(metrics.dayBefore).toEqual("2019-12-07");
        expect(metrics.dayAfter).toEqual("2019-12-09");
        expect(metrics.dayOfYear).toEqual(342);
        expect(metrics.dayWeekBefore).toEqual("2019-12-01");
        expect(metrics.dayWeekAfter).toEqual("2019-12-15");
    });

    test("getCalendarMetrics - week", () => {
        //Act
        let metrics = getCalendarMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.week).toEqual(49);
        expect(metrics.weekStartDay).toEqual("2019-12-02");
        expect(metrics.weekEndDay).toEqual("2019-12-08");
        expect(metrics.weeksInYear).toEqual(52);
        //expect(metrics.weekdaysShort).toEqual(["Mon"...]);
    });

    test("getCalendarMetrics - month", () => {
        //Act
        let metrics = getCalendarMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.month).toEqual(12);
        expect(metrics.monthStartDay).toEqual("2019-12-01");
        expect(metrics.monthEndDay).toEqual("2019-12-31");
        expect(metrics.monthDays).toEqual(31);

        //expect(metrics.monthsShort).toEqual(["Jan"...]);
    });

    test("getCalendarMetrics - quarter", () => {
        //Act
        let metrics = getCalendarMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.quarter).toEqual(4);
        expect(metrics.quarterStartDay).toEqual("2019-10-01");
        expect(metrics.quarterEndDay).toEqual("2019-12-31");
    });

    test("getCalendarMetrics - year", () => {
        //Act
        let metrics = getCalendarMetrics("2019-12-08"); //sunday, w49, day342
        //Assert
        expect(metrics.year).toEqual(2019);
        expect(metrics.yearStartDay).toEqual("2019-01-01");
        expect(metrics.yearEndDay).toEqual("2019-12-31");
    });

    test("getCalendarRelative 1 week after", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-15";
        //Act
        let day = getCalendarRelative(actual, 1, "weeks");
        //Assert
        expect(day).toEqual(expected);
    });

    test("getCalendarRelative 1 week before", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-01";
        //Act
        let day = getCalendarRelative(actual, -1, "weeks");
        //Assert
        expect(day).toEqual(expected);
    });

    test("getCalendarRelative 1 day after", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-09";
        //Act
        let day = getCalendarRelative(actual, 1, "days");
        //Assert
        expect(day).toEqual(expected);
    });

    test("getCalendarRelative 1 day before", () => {
        //Arrange
        let actual = "2020-08-08";
        let expected = "2020-08-07";
        //Act
        let day = getCalendarRelative(actual, -1, "days");
        //Assert
        expect(day).toEqual(expected);
    });

    test("getCalendarBoundary week start/end", () => {
        //Arrange
        let actual = "2020-12-10";
        let expectedStart = "2020-12-07";
        let expectedEnd = "2020-12-13";
        //Act
        let dayStart = getCalendarBoundary(actual, true, "week");
        let dayEnd = getCalendarBoundary(actual, false, "week");
        //Assert
        expect(dayStart).toEqual(expectedStart);
        expect(dayEnd).toEqual(expectedEnd);
    });

    test("getCalendarBoundary month start/end", () => {
        //Arrange
        let actual = "2020-11-15";
        let expectedStart = "2020-11-01";
        let expectedEnd = "2020-11-30";
        //Act
        let dayStart = getCalendarBoundary(actual, true, "month");
        let dayEnd = getCalendarBoundary(actual, false, "month");
        //Assert
        expect(dayStart).toEqual(expectedStart);
        expect(dayEnd).toEqual(expectedEnd);
    });

    test("getCalendarBoundary quarter start/end", () => {
        //Arrange
        let actual = "2020-08-12";
        let expectedStart = "2020-07-01";
        let expectedEnd = "2020-09-30";
        //Act
        let dayStart = getCalendarBoundary(actual, true, "quarter");
        let dayEnd = getCalendarBoundary(actual, false, "quarter");
        //Assert
        expect(dayStart).toEqual(expectedStart);
        expect(dayEnd).toEqual(expectedEnd);
    });

    test("getCalendarBoundary year start/end", () => {
        //Arrange
        let actual = "2020-12-10";
        let expectedStart = "2020-01-01";
        let expectedEnd = "2020-12-31";
        //Act
        let dayStart = getCalendarBoundary(actual, true, "year");
        let dayEnd = getCalendarBoundary(actual, false, "year");
        //Assert
        expect(dayStart).toEqual(expectedStart);
        expect(dayEnd).toEqual(expectedEnd);
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
