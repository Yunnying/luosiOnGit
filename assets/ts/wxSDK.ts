let wx = window["wx"];

export let userData={
  shareTime:0,
}

class wxSDKClass {
  
    type=10000;
    constructor(){
        if(wx) wx.onMessage(this.onMessage.bind(this));
        if(wx) {
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
              })
        }
        this.openid=localStorage.getItem("wx_openid")||"";
        userData=JSON.parse(localStorage.getItem("user_data_temp")||JSON.stringify(userData))
        this.wxInit();
      }

    public saveUser(){
      localStorage.setItem("user_data_temp",JSON.stringify(userData));
    }

    public checkDate(t1){
       let d1=new Date();
       let d2=new Date(t1);
       if(d1.getDate()!=d2.getDate()){
          return false;
       }
       return true;
    }


    public isGetUserInfo=false;
    /**
    * 设置用户的分数
    * @param value
    */
    public setScore(value: number) {
        if (!wx) return;
        console.log("setScore",value)
        wx.postMessage({
            event: 'setScore',
            score: value
        });
        console.log("setScore")


        /*
 let data={"nickName":"李逍遥","gender":0,"language":"zh_CN","city":"","province":"","country":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/hpvu3VyBvtvJbbebR8QxLiafb7lXXZS4lJ9G30bfV3ap4SHLTdHWewlBe4RLZ6C19WUibfYffgPFHEhDfsSSLDAPZDd79mda8OAEibGjYlJsO0/132"};
            data.score=100;
            data.uuid="12331231232"
 wx.postMessage({
            event: 'setUserInfo',
            score: JSON.stringify(data)
        });
            
        */

       
            
    }

      /**
    * 设置用户
    * @param value
    */
      public setUserInfo(data:{nickName:string,avatarUrl:string,score:number}) {
        if (!wx) return;
        console.log("setUserInfo",data)
        wx.postMessage({
            event: 'setUserInfo',
            score: JSON.stringify(data)
        });
        console.log("setScore")
    }


    /**
     * 获取排行榜
     */
    public getRank() {
        if (!wx) return;
        wx.postMessage({
            event: 'getRank'
        });
    }

    getRankFriendCallback=null;
    /**
   * 获取排行榜
   */
    public getRankFriend(data={id:"getRankFriend",callback:()=>{}}) {
        if (!wx) return;
        console.log("getRankFriend")
        wx.postMessage({
            event: 'getRankFriend'
        });
        this.getRankFriendCallback=data.callback;
    }

    public onMessage(msg){
          console.log(msg)
    }


    public getUserInfo( callback=(t,res)=>{console.log("获取结果",t,res)}) {
        if(this.isGetUserInfo) return;

        if (typeof wx != "undefined") {
            let w=wx.getWindowInfo();
       
               let  data={
                    type: 'text',
                    text: '',
                    style: {
                      left:  w.screenWidth*0.1,
                      top: w.screenHeight*0.1,
                      width: w.screenWidth*0.8,
                      height: w.screenHeight*0.8,
        
                    }
                  }
            
           
            let but = wx.createUserInfoButton(data);
            console.error("lyk-自己创建",this.isGetUserInfo);
            but.onTap((res) => {
                console.log("点击按钮", res)
                //https://lyk-1305927356.cos.ap-nanjing.myqcloud.com/gameremote/ppl
                // 必须是在用户已经授权的情况下调用
                but.destroy();
                console.error("获取成功",res)
                let rawData=JSON.parse(res.rawData)//{"nickName":"李逍遥","gender":0,"language":"zh_CN","city":"","province":"","country":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/hpvu3VyBvtvJbbebR8QxLiafb7lXXZS4lJ9G30bfV3ap4SHLTdHWewlBe4RLZ6C19WUibfYffgPFHEhDfsSSLDAPZDd79mda8OAEibGjYlJsO0/132"};
                if(!rawData.avatarUrl){
                    return console.error("获取数据异常")
                }
                rawData.uuid=rawData.avatarUrl;
                var e = cc.sys.localStorage.getItem("screwLevel");
                if (!(null != e && null != e && "" != e)) {
                    e = "1";
                }
                var t = cc.sys.localStorage.getItem("currentLevel");
                if (!(null != t && null != t && "" != t)) {
                    t = "1";
                }
                var n = parseInt(e) - 1 + (parseInt(t) - 1);
                rawData.score=n;
                localStorage.setItem("wx_user_info",JSON.stringify(rawData));
                this.setUserInfo(rawData);
                this.saveUserInfo(rawData)
                

         
            })
            console.error("lyk-创建成功");
        }

    }

    public checkUserInfo() {
      if (!wx) return;
        // 通过 wx.getSetting 查询用户是否已授权头像昵称信息
        let info= JSON.parse(localStorage.getItem("user_info_wx")||JSON.stringify({}));
        if(info.avatarUrl&&!info.isSave) this.saveUserInfo(info);
        wx.getSetting({
            success:(res)=> {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wxSDK.isGetUserInfo=true;
                   console.log("已经获得微信用户权限",res)
                } else {
                    wxSDK.isGetUserInfo=false;
                   console.log("未微信用户权限")
                }
            },
            fail:()=>{
                console.log("未微信用户权限")
            }
        })
    
    }

    itv;

    saveUserInfo(info) {//{"nickName":"李逍遥","gender":0,"language":"zh_CN","city":"","province":"","country":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/uuu9iaL7AFtq4PFibQOVgZxt0QE0CEwSIYs60aHhxA45icxgzwRH98G2TXPmqXkLhiaQXt3pzA5qMrZwNGibTuaOV6C3NkPOhjJpKib01uiaKnWIS0/132"}
      console.log("lyk====?????????????????????保存用户信息")
      info.isSave=false;
      localStorage.setItem("user_info_wx",JSON.stringify(info));
      if(!this.openid){
         console.error("OpenId不存在");
         this.itv= setInterval(()=>{
          console.error("不获取到绝不罢休")
          this.getId().then((id:string)=>{
            console.log(id)
            this.openid=id;
            this.saveUserInfo(info);
            clearInterval(this.itv)
           },(res)=>{console.error(res)});
         },3000)
        
        return;
      }
      cc.log(info, "保存用户信息openid=",this.openid);
      this.autoFetch("/api/findUser", { body: { id: this.openid, type: this.type } }).then((res: any) => {
        cc.log(res, "查询结果");
        if (res.data.length <= 0) {
          this.autoFetch("/api/addUser", {
            body: {
              id: this.openid, type: this.type,
              userinfo: JSON.stringify(info),
              score: cc.sys.localStorage.getItem("currentLevel")||0
            }
          }).then((res) => {
            cc.log(res, "userdata");
            info.isSave=true;
            localStorage.setItem("user_info_wx",JSON.stringify(info));
          },()=>{
            cc.log("保存失败");
          });
        }
      })
    }
  

    

    
 generateRandomID(length=20) {
    // 确保长度至少为1
    length = Math.max(length, 1);
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let id = '';
    for (var i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
   
 
  getCity(call=()=>{}){
    if (!wx) return;
    if(localStorage.getItem("City")) return;

    wx.getFuzzyLocation({
      type: 'wgs84',
      success (res) {
        let latitude = res.latitude;
        let longitude = res.longitude;
        wxSDK.wxFetch("/api/getCity",{body:{location:latitude+","+longitude}}).then((res:any)=>{
                console.log("获取的城市："+res);
                localStorage.setItem("City",res.data);
                call();
        });
        console.log("获取成功",res);
      },
      fail:(res)=>{
          console.log("获取失败",res)
      }
     })


  }


  url="https://express-xcy7-120888-6-1329251231.sh.run.tcloudbase.com";
  
  autoFetch(url, data: { body }, type = "POST") {
    if (!window["wx"]) {
      return this.fetch(this.url + url, data, type)
    } else {
      return this.wxFetch(url, data, type)
    }
  }

  fetch(url, data: { body }, type) {
    return new Promise((resolve, reject) => {
      var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
      httpRequest.open(type, url, true); //第二步：打开连接

      /**
      *发送json格式文件必须设置请求头 ；如下 - 
      */
      httpRequest.setRequestHeader("Content-type", "application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）




      httpRequest.send(JSON.stringify(data.body));//发送请求 将json写入send中
      /**
       * 获取数据后的处理程序
       */
      httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
          var json = httpRequest.responseText;//获取到服务端返回的数据
          console.log(json);
          resolve(JSON.parse(json))
        }
      };
    });

  }

  
  wxcloud;
  async wxInit(){
    if(!window["wx"]) return
   this.wxcloud = new window["wx"].cloud.Cloud({
      resourceAppid: 'wx59fb01c3369badac', // 环境所属的账号appid
      resourceEnv: 'prod-8g9h3n5q3c23cfc8', // 微信云托管的环境ID
    })

   await this.wxcloud.init();
   this.userInit();
  }


  wxFetch(url, data?: { body }, type="POST") {
    console.log("请求数据", url, data, type)

    return new Promise((r, j) => {
      console.log("获取============================================",data,type)
      // window["wx"].cloud.init();
    
      this.wxcloud.callContainer({
        "config": {
          "env": "prod-8g9h3n5q3c23cfc8"
        },
        "path": url,
        "header": {
          "X-WX-SERVICE": "express-xcy7",
          "content-type": "application/json"
        },
        "method": type,
        "data": data&&data.body ? JSON.stringify(data.body) : ""
      }).then((res) => {
        if (res.statusCode == 200) {
          r(res.data);
        } else {
          console.error("云请求错误", res)
          j()
        }

      })

    })


  }

  addAreaScore(score:number){
      let city= localStorage.getItem("City");
      if(!city){
        console.error("省市不存在")
        return;
      }
      this.autoFetch("/api/addAreaScore",{body:{areaName:city,type:this.type,score:score}}).then((res)=>{
            console.log("省市排名已经保存",res);
      });

  }

  openid="";
   //获取openid
   getId() {
    console.log("lyk getOpenId")
    return new Promise((r, j) => {
      let openid =this.openid;
      console.log("lyk openid",openid)
      if (!openid) {
        console.log("lyk autoFetch openid")
        this.autoFetch("/api/wx_openid", { body: "" }, "GET").then((id: string) => {

          localStorage.setItem("wx_openid",id);
          console.log("lyk-获取openid成功", id);
          r(id);
        },(res)=>{
          console.error("lyk-获取openid失败",res);
        })
      } else {
      
        r(openid);
        
      }
    })
  }

  userInit(){
    console.log("lyk userInit")
    if(wx&&!this.openid){
      console.log("lyk this.getOpenId")
      this.getId().then((id:string)=>{
       
      },()=>{

      })
    }
    
  }


  updateScore(score) {
    if(!this.openid||!wx) return;
    score=(Number(localStorage.getItem("currentLevel"))-1)||0;
    this.setScore(score)
    this.autoFetch("/api/updateScore", { body: { id: this.openid, type: this.type, score: score } }).then((res) => {
      cc.log("排行榜保存成功");
    }, () => { });
  }

  share(){
    if(wx) wx.shareAppMessage();
  }

}

export let wxSDK = new wxSDKClass();
window["wxSDK"] = wxSDK;


/**
 

window["wx"].cloud.init();
window["wx"].cloud.callContainer({
  "config": {
    "env": "prod-8g9h3n5q3c23cfc8"
  },
  "path": "/api/wx_openid",
  "header": {
    "X-WX-SERVICE": "express-xcy7",
    "content-type": "application/json"
  },
  "method": "POST",
  "data":  ""
}).then((res) => {
  if (res.statusCode == 200) {
   console.log("获取成功",res)
  } else {
    console.error("云请求错误", res)
   
  }

})

 */

