const express = require('express');
const wechat = require('wechat');
const mysql = require('mysql');
const https = require('https');

const config = {
    appid: 'wxd29115390c39d130',
    token: 'weixin',
    encodingAESKey: 'hh8RhwjpPxmWawdaprFgqDc7ciJbsyja8duqWTOlJrh'
};

let pool = mysql.createPool({
    user: 'root'
});
let app = new express();
app.use(express.query());
app.use('/', wechat(config, (req, res, next) => {
    let question = req.weixin.Content;
    console.log(question);

    if(question.includes('天气')){
        let city = question.replace('天气','').trim();
        console.log(`city:${city}`);

        const API = 'https://free-api.heweather.com/s6/weather?key=2651aa8766e640bfa6a9c4eee5a3d958&location=';
        let url = API + encodeURI(city);
        let response = res;

        //发送请求获取天气
        https.get(url,(req,res)=>{
            req.on('data',(data)=>{
                // console.log(data.toString().HeWeather6[0]);
                let weather = JSON.parse(data.toString()).HeWeather6[0];
                if(weather.status === 'ok'){
                    let answer = `${city} 当前天气：
                    ${weather.now.cond_txt},
                    温度${weather.now.tmp} 摄氏度
                    ${weather.now.wind_dir},
                    ${weather.now.wind_sc},
                    ${weather.lifestyle[0].txt},
                    ${weather.lifestyle[1].txt},
                    ${weather.lifestyle[2].txt},
                    ${weather.lifestyle[3].txt},
                    ${weather.lifestyle[4].txt},
                    ${weather.lifestyle[5].txt}
                    ${weather.lifestyle[6].txt}
                    
                    `;
                    response.reply(answer);
                }else{
                    response.reply(weather.status);
                    console.log(weather.status);
                }
            })
        });
    }else{
        res.reply('尚未开通其服务');
    }


    // let sql = 'SELECT answer FROM db.message WHERE question LIKE ?'
    // pool.query(sql, [`%${question}%`], (err, results, fields) => {
    //     console.log(results);
    //     if (results.length === 0) {
    //         res.reply('听不懂。。。');
    //     } else {
    //         res.reply(results[0].answer);
    //     }
    // });


    // if (weixin.Content === '你好') {
    //     res.reply('Hello!');
    // } else if (weixin.Content === '你是谁？') {
    //     res.reply([
    //         {
    //             title:'我是前端技术公众号',
    //             description:'HTML，CSS，Javascript 技术',
    //             picurl:'https://tse3-mm.cn.bing.net/th?id=OIP.VTL9qbfjtu8OnQxePYUDfAHaEo&p=0&o=5&pid=1.1',
    //             url:'https://github.com/thu'
    //         }
    //     ]);
    // } else if (weixin.Content === '放首歌') {
    //     res.reply({
    //         type: 'music',
    //         content: {
    //             title: '千里之外',
    //             description:'千里之外.mp3',
    //             musicUrl:'http://www.dobi.nu/mp3/billbale.mp3',
    //             hqMusicUrl:'http://www.dobi.nu/mp3/billbale.mp3'
    //         }
    //     });
    // }
}));
app.listen(3000);


