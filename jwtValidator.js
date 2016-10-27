rx = require('rx'),
    restler = require('restler'),
    jwtaadUtils = require('./jwtaadUtils');

function get(url) {
    return rx.Observable.create(observer => {
        restler.get(url).on('complete', (result) => {
            if (result instanceof Error) {
                observer.onError(result);
            } else {
                observer.onNext(result);
                observer.onCompleted();
            }
        });
    });
}

function requestOpenIdConfig(tenantId, jwt) {
    const tenantOpenIdconfig = 'https://login.windows.net/' + tenantId + '/.well-known/openid-configuration';

    const source = get(tenantOpenIdconfig)
        .map(result => result.jwks_uri)
        .flatMap(jwtSigningKeysLocation => get(jwtSigningKeysLocation))
        .map(result => result.keys)
        .flatMap(publicKeys => rx.Observable.from(publicKeys))
        .flatMap(keys => rx.Observable.from(keys.x5c))
        .map(certificate => jwtaadUtils.convertCertificateToBeOpenSSLCompatible(certificate))
        .map(compatCertificate => jwtaadUtils.verify(jwt, compatCertificate));
    source.subscribe(
        response => {
            console.log(response)
        }, 
        error => console.error(error), 
        () => console.log('done'));
};

module.exports.validate = function(jwt) {
  console.log(jwt);
  const tenant = jwtaadUtils.getTenantId(jwt);
  console.log(tenant);

  requestOpenIdConfig(tenant, jwt);
}