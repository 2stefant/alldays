import moment from "moment";

export const getDayMetrics = (isoDay: string = ""): any => {
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    return {
        day: moment(isoDay).format(isoDayFormat),
        dayIndex: moment(isoDay).isoWeekday(),
        dayNameShort: moment(isoDay).format('ddd'),
        dayBefore: getRelative(isoDay, -1, "days"),
        dayAfter: getRelative(isoDay, 1, "days"),
        dayOfYear: moment(isoDay).dayOfYear(),
        dayWeekBefore: getRelative(isoDay, -1, "weeks"),
        dayWeekAfter: getRelative(isoDay, 1, "weeks"),
        daysInMonth: moment(isoDay).daysInMonth(),

        week: moment(isoDay).isoWeek(),
        weekStartDay: getDayInWeek(isoDay, 1),
        weekEndDay: getDayInWeek(isoDay, 7),
        weeksInYear: moment(isoDay).isoWeeksInYear(),

        month: moment(isoDay).month() + 1,
        monthStartDay: getBoundary(isoDay, true, "month"),
        monthEndDay: getBoundary(isoDay, false, "month"),

        quarter: moment(isoDay).quarter(),
        quarterStartDay: getBoundary(isoDay, true, "quarter"),
        quarterEndDay: getBoundary(isoDay, false, "quarter"),

        year: moment(isoDay).year(),
        yearStartDay: getBoundary(isoDay, true, "year"),
        yearEndDay: getBoundary(isoDay, false, "year"),
    };
}

export const getDayCurrentMetrics = (): any => {
    return {
        currentDay: currentIsoDay,
        currentDayIndex: moment().isoWeekday(),
        currentDayNameShort: moment().format('ddd'),
        currentWeek: moment().isoWeek(),
        currentMonth: moment().month() + 1,
        currentQuarter: moment().quarter(),
        currentQuarterStartDay: getBoundary("", true, "quarter"),
        currentQuarterEndDay: getBoundary("", false, "quarter"),
        currentYear: moment().year(),
        currentYearStartDay: currentYearStartDay,
        currentYearEndDay: currentYearEndDay,
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

export const getRelative = (isoDay: string, offset: number, unit: any): string => {
    VerifyUnit(unit, ["days", "weeks", "months", "years"]);
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    return moment(isoDay).add(offset, unit).format(isoDayFormat);
}

export const getBoundary = (isoDay: string, startOrEnd: boolean = true, unit: any = ""): string => {
    VerifyUnit(unit, ["month", "quarter", "year"]);
    if (!isoDay) {
        isoDay = currentIsoDay;
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




