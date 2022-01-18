import moment from "moment";

export const getFormattedDateTime = () => {
    return moment().format('YYYY-MM-DD hh:mm:ss')
}