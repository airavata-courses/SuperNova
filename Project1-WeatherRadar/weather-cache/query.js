class QueryResponse {
    constructor(id, userID, radStation, sessionTime, date, dataType, plotStatus) {
        this.id = id
        this.userID = userID
        this.radStation = radStation
        this.sessionTime = sessionTime
        this.date = date
        this.dataType = dataType
        this.plotStatus = plotStatus
    }
}

module.exports = QueryResponse;