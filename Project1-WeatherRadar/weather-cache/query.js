class QueryResponse {
    constructor(id,userID,radStation, sessionTime, date, plotStatus) {
        this.id = id
        this.userID = userID
        this.radStation = radStation
        this.sessionTime = sessionTime
        this.date = date
        this.plotStatus = plotStatus
    }
}

module.exports = QueryResponse;