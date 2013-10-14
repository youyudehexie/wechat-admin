var Buffer = require('buffer');

var mime = function(req){
    var str = req.headers['content-type'] || '';
    return str.split(';')[0];
}


var xmlBodyParser = function(req, res, next){
    if (req._body) return next();
    req.body = req.body || {};

    if('GET' === req.method || 'HEAD' == req.method) return next();

    if ('text/xml' != mime(req)) return next();

    req._body = true;
    req.bodyParserDisabled = true;

    var data = '';
    req.setEncoding('utf8');

    req.on('data', function(chunk){
        data += chunk; 
    });

    req.on('end', function(){
        req.rawBody = data;
        next(); 
    })

    //console.log('ok')
   // return next();
   /* 
    req.body = req.body || {};
    console.log(req.method);
    if('GET' === req.method || 'HEAD' === req.method) return next();

    if('application/xml' != mine(req)){
        console.log('otz')
        return next();
    }
    req._body = true;

    var size = 0;
    var chunks = [];

    res.on('data', function(chunk){
        console.log('what then hell');
        size += chunk.length;
        chunks.push(chunk);
    })

    res.on('end', function(){
        var data = Buffer.concat(chunks,size); 
        var xml = data.toString();
        
        parseString(xml, function(err, json){
            if(err) {
                err.status = 400;
                next(err);
            } else {
                req.body = json;
                next();
            } 
        })
    
    })
*/
   /*
    req.body = req.body || {};

    if('GET' === req.method || 'HEAD' === req.method) return next();

   // if('text/xml' != mime) return next();

    req._body = true;

    var buf = '';
    console.log('fuck');
    req.setEncoding('utf-8');

    req.on('data', function(chunk){
        console.log('data');
        console.log(chunk);
        buf += chunk;
    
    })
    return next();
    */


}


module.exports.express = {
  customMiddleware: function(app){
    app.use(xmlBodyParser) 
    /*
    app.use(function(req, res, next){
       console.log('start');
        req.bodyParserDisabled = true;
       var data = '';

       req.on('data', function(chunk){
        data += chunk; 
       });

       req.on('end', function(){
        console.log('fuck here');
        req.rawBody = data;
        next();
       
       })
    
    });*/ 
  
  }
}
