import moment from "moment";
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
    const result = alldaysVerbose(isoDayIndex, isoFrom, isoTo);
    return result.alldays;
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
            current = getMomentWeeksRelative(current, 1).isoWeekday(isoDayIndex);
        }

        const isoDay = current.format(isoDayFormat);
        info += `
        before: '${infoBefore}', after: '${isoDay}'`;

        if (current.isSameOrBefore(range.end)) {
            foundDays.push(isoDay);
            current = getMomentRelative(current, 1);
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

export const isoDayFormat = "YYYY-MM-DD";
export const firstDayCurrentYear = moment().startOf("year");
export const lastDayCurrentYear = moment().endOf("year");

export const determineRange = (
    isoFrom: string,
    isoTo: string): {
        start: moment.Moment,
        end: moment.Moment,
        validArgs: boolean
    } => {
    let hasErrors = false;

    let temp = firstDayCurrentYear;
    if (isoFrom) {
        temp = moment(isoFrom);
        if (!temp.isValid()) {
            hasErrors = true;
        }
    }

    let start = temp.clone();

    if (!hasErrors) {
        start = temp.startOf("year"); // firstDayOfYear
    }

    let end = lastDayCurrentYear;
    if (isoTo) {
        temp = moment(isoTo);
        if (!temp.isValid()) {
            hasErrors = true;
        } else {
            end = temp.clone();
        }
    }

    return {
        start: start,
        end: end,
        validArgs: !hasErrors
    };
}

export const buildSearchCriteria = (
    isoFrom: string,
    isoTo: string,
    isoDayIndex: number,
    start: moment.Moment,
    end: moment.Moment): string => {
    const dayName = moment(start).isoWeekday(isoDayIndex).format('ddd');

    return `ARGS: isoDayIndex='${isoDayIndex}', isoFrom='${isoFrom}', isoTo='${isoTo}'.
    => Search for '${dayName}days': Start='${start.format(isoDayFormat)}', End='${end.format(isoDayFormat)}'.
    `;
}

export const getDayWeeksRelative = (isoDay: string, weekOffset: number): string => {
    return getMomentWeeksRelative(moment(isoDay), weekOffset).format(isoDayFormat);
}

export const getDayRelative = (isoDay: string, dayOffset: number): string => {
    return getMomentRelative(moment(isoDay), dayOffset).format(isoDayFormat);
}

export const getMomentWeeksRelative = (mom: moment.Moment, weekOffset: number): moment.Moment => {
    return mom.add(weekOffset, "weeks");
}

export const getMomentRelative = (mom: moment.Moment, dayOffset: number): moment.Moment => {
    return mom.add(dayOffset, "days");
}

export const getWeekDayShortNames = (): string[] => {
    return moment.weekdaysShort();
}

