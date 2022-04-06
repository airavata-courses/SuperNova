

export class PublicApi {

  //gatewayURL = 'http://localhost:4300';
  //weatherApiURL = 'http://localhost:4600';
  //weatherCacheURL = 'http://localhost:4400';
  //userApiURL = 'http://localhost:4700';

  gatewayURL = 'http://weatherapp.twilightparadox.com:30004';
  weatherApiURL ='http://weatherapp.twilightparadox.com:30002';
  weatherCacheURL = 'http://weatherapp.twilightparadox.com:30003';
  userApiURL = 'http://weatherapp.twilightparadox.com:30001';


  // weather service
  weatherPlot= '/weatherApi/plot';
  weatherPlotStatus = '/weatherApi/queryStatus';

  // weather service
  merraPlot= '/merraApi/plot';


  // user service
  userSessionInfoEndpoint = '/userApi/sessionInfo'
  userQueryEndpoint = '/userApi/userQuery'

}
