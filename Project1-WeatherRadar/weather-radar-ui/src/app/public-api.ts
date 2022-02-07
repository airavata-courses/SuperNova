

export class PublicApi {

  gatewayURL = 'http://localhost:4300';
  weatherApiURL = 'http://localhost:4600';
  weatherCacheURL = 'http://localhost:4400';


  // weather service
  weatherPlot= '/weatherApi/plot';
  weatherPlotStatus = '/weatherApi/queryStatus';


  // user service
  userSessionInfoEndpoint = '/userApi/sessionInfo'
  userQueryEndpoint = '/userApi/userQuery'

}
