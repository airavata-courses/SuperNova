

export class PublicApi {

  gatewayURL = 'http://localhost:8081';
  weatherServiceURL = 'http://localhost:4001';


  // weather service
  weatherPlot= '/weatherCache/plot';
  weatherPlotStatus = '/weatherCache/queryStatus';


  // user service
  userSessionInfoEndpoint = '/userApi/sessionInfo'
  userQueryEndpoint = '/userApi/userQuery'

}
