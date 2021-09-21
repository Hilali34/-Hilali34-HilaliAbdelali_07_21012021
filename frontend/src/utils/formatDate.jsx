import moment from "moment";


export const newFormatDate = (date) => {
    return "Posté le : " + moment(date).format('DD-MMM-Y à h:mm');
    ;
}