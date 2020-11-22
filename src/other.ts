import moment from "moment";

export const getDayMetrics = (isoDay: string = ""): any => {
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    return {
        day: moment(isoDay).format(isoDayFormat),
        dayIndex: moment(isoDay).isoWeekday(),
        dayNameShort: moment(isoDay).format('ddd'),
        dayBefore: getDayRelative(isoDay, -1),
        dayAfter: getDayRelative(isoDay, 1),
        dayOfYear: moment(isoDay).dayOfYear(),
        dayWeekBefore: getDayWeeksRelative(isoDay, -1),
        dayWeekAfter: getDayWeeksRelative(isoDay, 1),
        daysInMonth: moment(isoDay).daysInMonth(),
        week: moment(isoDay).isoWeek(),
        weekStartDay: getDayInWeek(isoDay, 1),
        weekEndDay: getDayInWeek(isoDay, 7),
        weeksInYear: moment(isoDay).isoWeeksInYear(),
        weekdaysShort: getWeekDaysShort(),
        month: moment(isoDay).month() + 1,
        monthStartDay: moment(isoDay).startOf("month").format(isoDayFormat),
        monthEndDay: moment(isoDay).endOf("month").format(isoDayFormat),
        monthsShort: getMonthsShort(),
        quarter: moment(isoDay).quarter(),
        quarterStartDay: moment(isoDay).startOf("quarter").format(isoDayFormat),
        quarterEndDay: moment(isoDay).endOf("quarter").format(isoDayFormat),
        year: moment(isoDay).year(),
        yearStartDay: moment(isoDay).startOf("year").format(isoDayFormat),
        yearEndDay: moment(isoDay).endOf("year").format(isoDayFormat),
        currentDay: moment().isoWeekday(),
        currentIsoDay: currentIsoDay,
        currentDayNameShort: moment().format('ddd'),
        currentWeek: moment().isoWeek(),
        currentMonth: moment().month() + 1,
        currentQuarter: moment().quarter(),
        currentQuarterStartDay: moment().startOf("quarter").format(isoDayFormat),
        currentQuarterEndDay: moment().endOf("quarter").format(isoDayFormat),
        currentYear: moment().year(),
        currentYearStartDay: currentYearStartDay,
        currentYearEndDay: currentYearEndDay,
        isoDayFormat: isoDayFormat,
    };
}

export const isoDayFormat = "YYYY-MM-DD";
export const currentYearStartDay = moment().startOf("year");
export const currentYearEndDay = moment().endOf("year");
export const currentIsoDay = moment().format(isoDayFormat);
export const getMonthsShort = () => moment.monthsShort();
export const getWeekDaysShort = () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Total"];

export const getDayInWeek = (isoDay: string = "", isoDayIndex: number = 7): string => {
    if (!isoDay) {
        isoDay = currentIsoDay;
    }
    VerifyIsoDayIndex(isoDayIndex);
    return moment(isoDay).isoWeekday(isoDayIndex).format(isoDayFormat);
}

export const getDayRelative = (isoDay: string, dayOffset: number): string => {
    return getRelative(isoDay, dayOffset, "days");
}

export const getDayWeeksRelative = (isoDay: string, weekOffset: number): string => {
    return getRelative(isoDay, weekOffset, "weeks");
}

export const getDayMonthsRelative = (isoDay: string, monthOffset: number): string => {
    return getRelative(isoDay, monthOffset, "months");
}

export const getDayYearsRelative = (isoDay: string, yearOffset: number): string => {
    return getRelative(isoDay, yearOffset, "years");
}

export const getRelative = (isoDay: string, offset: number, unit: any): string => {
    return moment(isoDay).add(offset, unit).format(isoDayFormat);
}

export const getMomentRelative = (mom: moment.Moment, offset: number, unit: any): moment.Moment => {
    return mom.add(offset, unit);
}

export const VerifyIsoDayIndex = (isoDayIndex: number) => {
    if (isoDayIndex < 1 || isoDayIndex > 7) {
        throw new Error("Invalid index. Valid ones are 1-7, which means Mon-Sun.");
    }
}





