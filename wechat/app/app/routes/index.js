var request = require('request'),
    wchatValidateToken = require(process.cwd() + '/app/controllers/validateWXToken.js');

module.exports = function (app) {
  app.route('/')
      .get(function (req, res) {
        var url = "http://www.baidu.com";
        console.log('/:' + url);
        // res.send("Hello");
          var options = {
            url: url,
            host:'proxy.hkg.sap.corp',
            port:'8080',
            method: "GET"
          };
          request(options,function(error,response,data){
            if(data){
              res.send(data);
            }else {
              res.send("Jerry error: " + error);
            }
          });
        });

  app.route('/wechat').get(function(req,res){
    wchatValidateToken(req,res);
  });

  app.route('/wechat').post(function(req,res){

    var _da;
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });
    req.on("end",function(){
        var ToUserName = getXMLNodeValue('ToUserName',_da);
        var FromUserName = getXMLNodeValue('FromUserName',_da);
        var CreateTime = getXMLNodeValue('CreateTime',_da);
        var MsgType = getXMLNodeValue('MsgType',_da);
        var Content = getXMLNodeValue('Content',_da);
        var MsgId = getXMLNodeValue('MsgId',_da);
        var xml = '<xml><ToUserName>'+FromUserName+'</ToUserName><FromUserName>'+ToUserName+'</FromUserName><CreateTime>'+CreateTime+'</CreateTime><MsgType>'+MsgType+'</MsgType><Content>'+Content+'</Content></xml>';
        res.send(xml);
    });
  });

};