

export class PublicApi {

  gatewayURL = 'http://localhost:4300';
  //gatewayURL = 'http://weather-radar-gateway-app:4300';
  // weatherApiURL = 'http://localhost:4600';
  weatherApiURL ='http://weather-radar-api-app:4600';
  weatherCacheURL = 'http://localhost:4400';
  //weatherCacheURL = 'http://weather-cache-app:4400';
  userApiURL = 'http://localhost:4700';


  // weather service
  weatherPlot= '/weatherApi/plot';
  weatherPlotStatus = '/weatherApi/queryStatus';


  // user service
  userSessionInfoEndpoint = '/userApi/sessionInfo'
  userQueryEndpoint = '/userApi/userQuery'

}
