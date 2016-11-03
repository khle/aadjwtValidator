var rx = require('rx'),
    axios = require('axios'),
    jwtaadUtils = require('./jwtaadUtils');

function get(url) {
    return rx.Observable.create(observer => {
      axios.get(url, {
        params: {}
      })
      .then(function (response) {
        console.log('response ==> ', response);
        observer.onNext(response.data);
        observer.onCompleted();
      })
      .catch(function (error) {
        observer.onError(error);
      });        
    });
}

function requestOpenIdConfig(tenantId, jwt) {
    const tenantOpenIdconfig = 'https://login.windows.net/' + tenantId + '/.well-known/openid-configuration';

    return get(tenantOpenIdconfig)
        .map(result => result.jwks_uri)
        .flatMap(jwtSigningKeysLocation => get(jwtSigningKeysLocation))
        .map(result => result.keys)
        .flatMap(publicKeys => rx.Observable.from(publicKeys))
        .flatMap(keys => rx.Observable.from(keys.x5c))
        .map(certificate => jwtaadUtils.convertCertificateToBeOpenSSLCompatible(certificate))
        .map(compatCertificate => jwtaadUtils.verify(jwt, compatCertificate));
};

module.exports.validate = function(jwt) {  
  const tenant = jwtaadUtils.getTenantId(jwt);
  return requestOpenIdConfig(tenant, jwt);
}