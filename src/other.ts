import moment from "moment";

export const getDayMetrics = (isoDay: string = ""): any => {
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    const mom = moment(isoDay);
    return {
        day: mom.format(isoDayFormat),
        dayIndex: mom.isoWeekday(),
        dayNameShort: mom.format('ddd'),
        dayBefore: getCalendarRelative(isoDay, -1, "days"),
        dayAfter: getCalendarRelative(isoDay, 1, "days"),
        dayOfYear: mom.dayOfYear(),
        dayWeekBefore: getCalendarRelative(isoDay, -1, "weeks"),
        dayWeekAfter: getCalendarRelative(isoDay, 1, "weeks"),
    };
}

export const getCalendarMetrics = (isoDay: string = ""): any => {
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    const mom = moment(isoDay);
    return {
        day: mom.format(isoDayFormat),

        week: mom.isoWeek(),
        weekStartDay: getCalendarBoundary(isoDay, true, "week"),
        weekEndDay: getCalendarBoundary(isoDay, false, "week"),
        weeksInYear: mom.isoWeeksInYear(),

        month: mom.month() + 1,
        monthDays: mom.daysInMonth(),
        monthStartDay: getCalendarBoundary(isoDay, true, "month"),
        monthEndDay: getCalendarBoundary(isoDay, false, "month"),

        quarter: mom.quarter(),
        quarterStartDay: getCalendarBoundary(isoDay, true, "quarter"),
        quarterEndDay: getCalendarBoundary(isoDay, false, "quarter"),

        year: mom.year(),
        yearStartDay: getCalendarBoundary(isoDay, true, "year"),
        yearEndDay: getCalendarBoundary(isoDay, false, "year"),
        isoDayFormat: isoDayFormat,
    };
}

export const getDayInWeek = (isoDay: string = "", isoDayIndex: number = 7): string => {
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    VerifyIsoDayIndex(isoDayIndex);
    return moment(isoDay).isoWeekday(isoDayIndex).format(isoDayFormat);
}

export const getCalendarRelative = (isoDay: string, offset: number, unit: any): string => {
    VerifyUnit(unit, ["days", "weeks", "months", "years"]);
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    return moment(isoDay).add(offset, unit).format(isoDayFormat);
}

export const getCalendarBoundary = (isoDay: string = "", startOrEnd: boolean = true, unit: any = ""): string => {
    VerifyUnit(unit, ["week", "month", "quarter", "year"]);
    if (!isoDay) {
        isoDay = currentIsoDay;
    }

    // Special case for weeks because Moment counts from sunday, but iso format counts from monday.
    if (unit === "week") {
        return startOrEnd
            ? getDayInWeek(isoDay, 1)
            : getDayInWeek(isoDay, 7);
    }

    const mom = startOrEnd
        ? moment(isoDay).startOf(unit)
        : moment(isoDay).endOf(unit);

    return mom.format(isoDayFormat)
}

export const getMomentRelative = (mom: moment.Moment, offset: number, unit: any): moment.Moment => {
    return mom.add(offset, unit);
}

export const VerifyIsoDayIndex = (isoDayIndex: number) => {
    if (isoDayIndex < 1 || isoDayIndex > 7) {
        throw new Error("Invalid index. Valid ones are 1-7, which means Mon-Sun.");
    }
}

export const VerifyUnit = (unit: string, validOptions: any) => {
    if (!validOptions.includes(unit)) {
        throw new Error(`Invalid Unit. Valid options are: '${validOptions.join("|")}'.`);
    }
}

export const isoDayFormat = "YYYY-MM-DD";
export const currentYearStartDay = moment().startOf("year");
export const currentYearEndDay = moment().endOf("year");
export const currentIsoDay = moment().format(isoDayFormat);




