import { isoDayFormat, currentYearStartDay, currentYearEndDay } from "./other";
import moment from "moment";

export const determineRange = (
    isoFrom: string,
    isoTo: string): {
        start: moment.Moment,
        end: moment.Moment,
        validArgs: boolean
    } => {
    let hasErrors = false;

    let temp = currentYearStartDay;
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

    let end = currentYearEndDay;
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