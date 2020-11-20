import { alldays, isFirstSevenDaysOfYear, isoDayFormat} from "../index";
import moment from "moment";


test("alldays - No args = 0 = sundays current whole year.", () => {
    //Arrange
    let expected = new Set(allSundays2020());
    //Act
    let days = new Set(alldays(0));
    //Assert
    expect(days).toEqual(expected);

});

const allSundays2020 = (): string[] => {
    return ["2020-01-05", "2020-01-12", "2020-01-19", "2020-01-26", "2020-02-02",
        "2020-02-09", "2020-02-16", "2020-02-23", "2020-03-01", "2020-03-08",
        "2020-03-15", "2020-03-22", "2020-03-29", "2020-04-05", "2020-04-12",
        "2020-04-19", "2020-04-26", "2020-05-03", "2020-05-10", "2020-05-17",
        "2020-05-24", "2020-05-31", "2020-06-07", "2020-06-14", "2020-06-21",
        "2020-06-28", "2020-07-05", "2020-07-12", "2020-07-19", "2020-07-26",
        "2020-08-02", "2020-08-09", "2020-08-16", "2020-08-23", "2020-08-30",
        "2020-09-06", "2020-09-13", "2020-09-20", "2020-09-27", "2020-10-04",
        "2020-10-11", "2020-10-18", "2020-10-25", "2020-11-01", "2020-11-08",
        "2020-11-15", "2020-11-22", "2020-11-29", "2020-12-06",
        "2020-12-13", "2020-12-20", "2020-12-27"];
}


test("isFirstSevenDaysOfYear", () => {
    const prefix = "2020-01-0";
    for (let ix = 1; ix <= 8; ix++) {
        //Arrange
        let expected = ix < 8;
        let mom = moment(`${prefix}${ix}`);
        //Act
        let result = isFirstSevenDaysOfYear(mom);
        //console.log(mom.day() + " - " + mom.format("YYYY-MM-DD"));
        //Assert
        expect(result).toEqual(expected);
    }
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