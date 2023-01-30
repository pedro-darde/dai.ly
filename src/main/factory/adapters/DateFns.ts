import DateFnsAdapter from "../../../infra/date/DateFnsAdapter";

export const makeDateFNSAdapter = (): DateFnsAdapter => {
    return new DateFnsAdapter()
}