import moment from "moment";
import { isoDayFormat, getMomentRelative, getDayMetrics, getCalendarMetrics, getCalendarBoundary, getDayInWeek } from "./other";
import { determineRange, buildSearchCriteria } from "./determineRange";

/**
 * @todo IMPORTANT: ONLY (1-7) IS IMPLEMENTED FOR NOW. 
 * @description Calculates specific week days between a date range.
 * @summary All days in the params are formatted in iso8601 format "YYYY-MM-DD".
 * @param isoDayIndex default 7, 1-7 (mon-sun), 10-17, 20-27. 
 * @param isoFrom default "", from day, iso formatted.
 * @param isoTo default "", to day, iso formatted.
 * @returns string array with same week days, e.g. mondays, iso formatted.
 * @example let days = alldays(7, "2020-01-01", "2020-12-31"); 
 * @see verbose call the alldaysVerbose() method instead.
 * @see iso8601 https://www.iso.org/iso-8601-date-and-time-format.html
 */
export const alldays = (
    isoDayIndex: number = 7,
    isoFrom: string = "",
    isoTo: string = ""): string[] => {

    return alldaysVerbose(isoDayIndex, isoFrom, isoTo).alldays;
}

export const alldaysVerbose = (
    isoDayIndex: number = 7,
    isoFrom: string = "",
    isoTo: string = ""): {
        searchCriteria: string,
        alldays: string[],
        logs: string,
    } => {

    if (isoDayIndex < 1 || isoDayIndex > 7) {
        throw new Error("Only 1-7 is implemented so far.");
    }

    const logs: string[] = [];
    const foundDays: string[] = [];

    const range = determineRange(isoFrom, isoTo);

    const searchCriteria = buildSearchCriteria(
        isoFrom, isoTo, isoDayIndex,
        range.start, range.end);

    if (!range.validArgs) {
        return {
            searchCriteria: searchCriteria,
            alldays: foundDays,
            logs: logs.join("\r\n"),
        };
    }

    let actual = range.start.clone();

    while (actual.isSameOrBefore(range.end)) {

        let info = null;
        const infoBefore = actual.format(isoDayFormat);

        if (actual.isoWeekday() <= isoDayIndex) {
            info = "  Day is LT/EQ wanted weekday, position on it.";
            actual = actual.isoWeekday(isoDayIndex);
        } else {
            info = "  Day is GT wanted weekday, position on next weeks requested day.";
            actual = getMomentRelative(actual, 1, "weeks").isoWeekday(isoDayIndex);
        }

        const isoDay = actual.format(isoDayFormat);
        info += `
        before: '${infoBefore}', after: '${isoDay}'`;

        if (actual.isSameOrBefore(range.end)) {
            foundDays.push(isoDay);
            actual = getMomentRelative(actual, 1, "days");
            logs.push(`${info}
            => Found: '${isoDay}', jump to next day.
            `);
        } else {
            logs.push(`${info}
            => Discarded candidate, later than End day'.
            `);
            break;
        }
    }

    return {
        searchCriteria: searchCriteria,
        alldays: foundDays,
        logs: logs.join("\r\n"),
    };
}

/**
 * Gets day metrics for the specified day.
 * @param isoDay YYYY-MM-DD, default is current day
 */
export const dayMetrics = (isoDay: string = "") =>
    getDayMetrics(isoDay);

/**
 * Gets week/month/quarter/midyear/year) metrics for the specified day.
 * @param isoDay YYYY-MM-DD, default is current day
 */
export const calendarMetrics = (isoDay: string = "") =>
    getCalendarMetrics(isoDay);

/**
 * Gets boundary for week/month/quarter/year) metrics for the specified day.
 * @param isoDay YYYY-MM-DD, default is current day
 * @param startOrEnd true if start, false if end
 * @param unit ["week","month", "quarter", "year"]
 */
export const calendarBoundary = (isoDay: string="", startOrEnd: boolean = true, unit: any = ""): string => 
    getCalendarBoundary(isoDay, startOrEnd, unit);

/**
 * Gets the day in the week specified by the index, e.g. 1 becomes monday.
 * @param isoDay YYYY-MM-DD, default is current day
 * @param isoDayIndex 1-7, default is sunday 7
 */
export const dayInWeek = (isoDay: string = "", isoDayIndex: number = 7) =>
    getDayInWeek(isoDay, isoDayIndex);

/**
 * Gets short week names, Mon...Sun.
 */
export const weekDaysShort = () =>
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Gets short month names, Jan...Dec.
 */
export const monthsShort = () =>
    moment.monthsShort();
