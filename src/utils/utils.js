export const getDatesBetween = (startDate, endDate) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let dates = [],
    currentDate = startDate,
    addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }

    return dates.map((date) => new Date(date).toISOString().slice(0,10)).slice(1);
};
