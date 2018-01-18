const express = require('express');
const wechat = require('wechat');
const config = {
    token:'weixin',
    appid:'wx2ac27087aa8058f0',
    encondingAESKey:'VpJjvDbL3p8zIvq5J9Qx8qA7YOYRkJRP11cxDN8rXDT'
};

let app = new express();

app.use(express.query());
app.use('/',wechat(config,(req,res,next)=>{

}));

// app.get('/',(req,res)=>{
//     res.end('server is running......');
// });

app.listen(3000);

