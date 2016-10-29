rx = require('rx'),
    restler = require('restler'),
    axios = require('axios'),
    jwtaadUtils = require('./jwtaadUtils');

function get(url) {
  console.log('url ==> ', url);
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
        /*
        restler.get(url).on('complete', (result) => {
            if (result instanceof Error) {
                observer.onError(result);
            } else {
                observer.onNext(result);
                observer.onCompleted();
            }
        });
        */
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
  console.log(jwt);
  const tenant = jwtaadUtils.getTenantId(jwt);
  console.log(tenant);

  return requestOpenIdConfig(tenant, jwt);
}