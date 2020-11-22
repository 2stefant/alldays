import { isoDayFormat, getMomentRelative } from "./other";
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

    let current = range.start.clone();

    while (current.isSameOrBefore(range.end)) {

        let info = null;
        const infoBefore = current.format(isoDayFormat);

        if (current.isoWeekday() <= isoDayIndex) {
            info = "  Day is LT/EQ wanted weekday, position on it.";
            current = current.isoWeekday(isoDayIndex);
        } else {
            info = "  Day is GT wanted weekday, position on next weeks requested day.";
            current = getMomentRelative(current, 1, "weeks").isoWeekday(isoDayIndex);
        }

        const isoDay = current.format(isoDayFormat);
        info += `
        before: '${infoBefore}', after: '${isoDay}'`;

        if (current.isSameOrBefore(range.end)) {
            foundDays.push(isoDay);
            current = getMomentRelative(current, 1, "days");
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
