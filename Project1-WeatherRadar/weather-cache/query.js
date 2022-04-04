class QueryResponse {
    constructor(id,userID,radStation, sessionTime, date, plotStatus, dataType) {
        this.id = id
        this.userID = userID
        this.radStation = radStation
        this.sessionTime = sessionTime
        this.date = date
        this.plotStatus = plotStatus
        this.dataType = dataType
    }
}

module.exports = QueryResponse;