import moment from 'moment';

export const localDate = (date = null, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!date) {
        return moment().format(format);
    }

    const stillUtc = moment.utc(date).toDate();

    return moment(stillUtc).local().format(format);
};

export const utcDate = (date, viewFormat, format = 'YYYY-MM-DD HH:mm:ss') =>
    moment(date, viewFormat).utc().format(format);

export const date = (dateString, viewFormat, format = 'YYYY-MM-DD') => moment(dateString, viewFormat).format(format);
