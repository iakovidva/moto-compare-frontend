export interface IncorrectSpecReportModel  {
    motorcycleId: string,
    data: {
        field: string,
        oldValue: string,
        newValue: string}[]
}