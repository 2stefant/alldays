import moment from "moment";
/**
 * @todo IMPORTANT: ONLY (0) IS IMPLEMENTED AS HARDCODED (0,"2020-01-01") FOR NOW. 
 * @description Calculates specific week days between a date range.
 * @summary All days in the params are formatted in iso8601 format "YYYY-MM-DD".
 * @param index default 0, 0-6, 10-16, 20-26.
 * @param isoFrom default "", from day, iso formatted.
 * @param isoTo default "", to day, iso formatted.
 * @returns string array with same week days, e.g. mondays, iso formatted.
 * @example let days = alldays(0, "2020-01-01", "2020-12-31"); 
 * @see iso8601 https://www.iso.org/iso-8601-date-and-time-format.html
 */
export const alldays = (
    index: number = 0,
    isoFrom: string = "",
    isoTo: string = ""): string[] => {

    /** @todo CALCULATE FLAGS, HARDCODED SUNDAY FOR NOW */
    const weekFlags = [true, false, false, false, false, false, false];

    const firstDayOfYear = (isoFrom) 
        ? moment(isoFrom).startOf("year") 
        : firstDayCurrentYear;
        
    let start = moment((isoFrom) 
        ? isoFrom
        : firstDayOfYear); 

    if(isFirstSevenDaysOfYear(start)){
        //...make sure we find first sunday further down.
        start=firstDayOfYear;
    }

    let end = moment((isoTo) 
        ? isoTo            
        : lastDayCurrentYear); 

    let foundDays: string[] = [];

    weekFlags.forEach((flag, ix) => {
        
        if (!flag) { return; } 

        let mom = start.clone();

        while (mom.isSameOrBefore(end)) {

            let prev=mom.clone();
            mom = mom.day(7 + ix)

            if(prev.year() === mom.year()){
                foundDays.push(mom.format(isoDayFormat));
            }
        }
    });

    return foundDays;
}

export const isoDayFormat = "YYYY-MM-DD";

export function isFirstSevenDaysOfYear(
    mom: moment.Moment): boolean {

    return mom.month() == 0 && mom.dayOfYear() <= 7;
}

export const firstDayCurrentYear = moment().startOf("year");
export const lastDayCurrentYear = moment().endOf("year");

