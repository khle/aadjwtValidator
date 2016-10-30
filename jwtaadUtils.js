var jsonwebtoken = require('jsonwebtoken');

function getTenantId(jwtString) {
  var decodedToken = jsonwebtoken.decode(jwtString);
    if(decodedToken) {
        return decodedToken.tid;
    } else {
        return null;
    }
}

module.exports.getTenantId = function(jwtString) {
    return getTenantId(jwtString);
}

module.exports.convertCertificateToBeOpenSSLCompatible = function(cert) {
    //Certificate must be in this specific format or else the function won't accept it
    var beginCert = "-----BEGIN CERTIFICATE-----";
    var endCert = "-----END CERTIFICATE-----";

    cert = cert.replace("\n", "");
    cert = cert.replace(beginCert, "");
    cert = cert.replace(endCert, "");

    var result = beginCert;
    while (cert.length > 0) {

        if (cert.length > 64) {
            result += "\n" + cert.substring(0, 64);
            cert = cert.substring(64, cert.length);
        }
        else {
            result += "\n" + cert;
            cert = "";
        }
    }

    if (result[result.length ] != "\n")
        result += "\n";
    result += endCert + "\n";
    return result;
}

module.exports.verify = function(jwt, certificate) {
    var options = {};
    
    // set the correct algorithm
    options.algorithms = ['RS256'];

    // set the issuer we expect
    options.issuer = 'https://sts.windows.net/' + getTenantId(jwt) + '/';

    let isValid = true;
    // verify the token
    try {
        jsonwebtoken.verify(jwt, certificate, options);
    } catch(error) {
        isValid = false;
    }

    return {
        decoded: jsonwebtoken.decode(jwt, {complete: true}),
        valid: isValid
    };
}