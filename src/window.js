const fs = require('fs');
const {
    remote,
    shell
} = require('electron');
const {confg} = require('../conf.js')
const {
    Menu,
    MenuItem,
    dialog
} = remote;
const request = require('request')
const Store = require('electron-store');
const store = new Store();
let isServer = "ns";

ipcRenderer.on('fullscr', (event, arg) => {
    if (arg) {
        _('maxbtn').style.display = "none";
        _('defullbtn').style.display = "block";
    } else {
        _('maxbtn').style.display = "block";
        _('defullbtn').style.display = "none";
    }
});
let mode = store.get('statemode') ? store.get('statemode') : "PAC";
_('bottombar-a').innerText = "当前模式" + mode;
_('minbtn').onclick = function() {
    ipcRenderer.send('window-min');
}
_('closebtn').onclick = function() {
    window.close();
}
_('maxbtn').onclick = function() {
    ipcRenderer.send('window-max');
}
_('titletext').innerText = document.title;
setInterval(function() {
    _('titletext').innerText = document.title;
}, 800)
ipcRenderer.on('maxmized', (event, arg) => {
    if (arg) {
        _('maxbtn').src = "img/window/reset.png";
    } else {
        _('maxbtn').src = "img/window/max.png";
    }
    window.addEventListener('resize', function() {
        ipcRenderer.send('window-get');
    })

});

let currur = null;

_("webv").style.height = (window.innerHeight - 98) + "px";
_("webi").style.width = (window.innerWidth - 283) + "px";
window.addEventListener('resize', function() {
    _("webi").style.width = (window.innerWidth - 283) + "px";
    _("webv").style.height = (window.innerHeight - 98) + "px";
})

let reper = null;
webview.addEventListener('did-navigate', () => {
    _('webi').value = webview.getURL().replace(reper, "");
    _('bottombar-right').innerText = "加载完成";
});
webview.addEventListener('new-window', (url) => {
    webview.goBack();
    let ldbt = loadbtn(url.url);
    webview.loadURL(ldbt);
    console.log("In-app [new window] run: (to) " + ldbt);
});
webview.addEventListener('will-navigate', (url) => {
    _('bottombar-right').innerText = "连接中";
    webview.goBack();
    let ldbt = loadbtn(url.url);
    webview.loadURL(ldbt);
    console.log("In-app run: (to) " + ldbt);
});

let route = null;

let isgfwed = (text) => {
    try {
        var domain = text.split('/')[2];
    } catch (e) {
        return 1;
    }
    let currentList = __dirname + (store.get('expver') == "edu" ? "/edulist.txt" : (store.get('expver') == "expert" ? "/gfwlist.txt" : "/stlist.txt"));
    let clfi = fs.readFileSync(currentList, 'utf-8').split('\r\n');
    for (var i = 0; i < clfi.length; i++) {
        if (domain.indexOf(clfi[i]) > -1) {
            return true;
        }
    }
    return false;
}

let loadbtn = (wwws) => {
    let isawz = /[a-zA-Z0-9\-\.]+\.(com|edu|top|art|icu|ltd|store|wang|vip|shop|xin|我爱你|在线|fit|club|info|site|tech|online|fun|ren|group|cloud|ink|中国|网址|商标|biz|run|co|link|fans|love|host|press|website|space|beer|asia|com.cn|net.cn|广东|cool|zone|city|video|yoga|live|life|chat|pro|law|luxe|design|work|mobi|kim|pub|org|name|tv|show|red|wiki|world|today|plus|gold|company|org.cn|gov.cn|center|email|fund|social|team|企业|佛山|商店|游戏|餐厅|购物|网络|公司|网点|中文网|招聘|集团|商城|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cf|cg|ch|ci|ck|cl|cm|cn|co|cq|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|es|et|ev|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gp|gr|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|ml|mm|mn|mo|mp|mq|mr|ms|mt|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|qa|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pt|pw|py|re|ro|ru|rw|sa|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|va|vc|ve|vg|vn|vu|wf|ws|ye|yu|za|zm|zr|zw)(\:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\;\?\'\\\+&%\$#\=~_\-]+))*$/i;
    let ishttp = /((https)|(http))(.\/\/)*/i;
    let getmaindm = /([a-z0-9][a-z0-9\-]*?\.(?:com|edu|top|art|icu|ltd|store|wang|vip|shop|xin|我爱你|在线|fit|club|info|site|tech|online|fun|ren|group|cloud|ink|中国|网址|商标|biz|run|co|link|fans|love|host|press|website|space|beer|asia|com.cn|net.cn|广东|cool|zone|city|video|yoga|live|life|chat|pro|law|luxe|design|work|mobi|kim|pub|org|name|tv|show|red|wiki|world|today|plus|gold|company|org.cn|gov.cn|center|email|fund|social|team|企业|佛山|商店|游戏|餐厅|购物|网络|公司|网点|中文网|招聘|集团|商城|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cf|cg|ch|ci|ck|cl|cm|cn|co|cq|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|es|et|ev|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gp|gr|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|ml|mm|mn|mo|mp|mq|mr|ms|mt|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|qa|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pt|pw|py|re|ro|ru|rw|sa|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|va|vc|ve|vg|vn|vu|wf|ws|ye|yu|za|zm|zr|zw)(?:\.(?:cn))?)/
    wwws = wwws.replace(reper, "");
    if (mode == "PAC") {
        console.log("Data pack: PAC")
        if (isawz.test(wwws)) {
            wwws = wwws.replace(ishttp, "");
            let mdm = "gfwtest://" + wwws;
            console.log("Main domain is :" + mdm)
            if (isgfwed(mdm)) {
                console.log("PAC: GFWed")
                _('bottombar-b').innerText = "该网站使用代理";
                wwws = "https://" + route + "/-----" + wwws;
                return wwws;
            } else {
                console.log("PAC: NGFWed")
                _('bottombar-b').innerText = "该网站无需代理";
                wwws = "http://" + wwws;
                return wwws;
            }
        } else {
            console.log("PAC: search")
            _('bottombar-b').innerText = "该网站使用代理";
            return "https://" + route + "/-----https://www.duckduckgo.com/?q=" + wwws;
        }
    } else if (mode == "全局") {
        console.log("Data pack: global")
        _('bottombar-b').innerText = "该网站使用代理";
        if (isawz.test(wwws)) {
            wwws = wwws.replace(ishttp, "");
            wwws = "https://" + route + "/-----" + wwws;
            return wwws;
        } else {
            console.log("GLOBAL")
            return "https://" + route + "/-----https://www.duckduckgo.com/?q=" + wwws;
        }
    } else {
        console.log("Data pack: 直连")
        _('bottombar-b').innerText = "代理已禁用";
        return wwws;
    }
}
document.addEventListener('keydown', () => {
    if (event.keyCode == 13) {
        if (_('webi') == document.activeElement) {
            webview.loadURL(loadbtn(__('webi')));
        }
    } else if (event.keyCode == 123) {
        webview.openDevTools();
    }
})
let templatectm = [
    { label: "撤销", accelerator: "CmdOrCtrl+Z", role: "undo" },
    { label: "重做", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
    { type: "separator" },
    { label: "剪切", accelerator: "CmdOrCtrl+X", role: "cut" },
    { label: "复制", accelerator: "CmdOrCtrl+C", role: "copy" },
    { label: "粘贴", accelerator: "CmdOrCtrl+V", role: "paste" },
    { label: "全选", accelerator: "CmdOrCtrl+A", role: "selectAll" },
    { type: "separator" },
    {
        label: "开发者模式",
        accelerator: "CmdOrCtrl+Shift+i",
        click: () => {
            webview.openDevTools();
        }
    }
];
webview.addEventListener('context-menu', function(event) {
    let params = event.params;
    let menu = Menu.buildFromTemplate(templatectm);
    menu.popup(remote.getCurrentWindow());
});
_('ipns').addEventListener('click', function(event) {
    let params = event.params;
    serverlist = [
        { label: currserv, enabled: false },
        { label: "当前模式：" + mode, enabled: false },
        { type: "separator" },
        {
            label: "美国-洛杉矶-1（高速专线）",
            click: () => {
                route = lists[0];
                store.set('stateroute', 0)
                currserv = "美国-洛杉矶-1（高速专线）"
            }
        },
        {
            label: "美国-洛杉矶-2（高速专线）",
            click: () => {
                route = lists[1];
                store.set('stateroute', 1)
                currserv = "美国-洛杉矶-2（高速专线）"
            }
        },
        { type: "separator" },
        {
            label: "PAC模式",
            click: () => {
                mode = "PAC";
                _('bottombar-a').innerText = "当前模式" + mode;
                store.set('statemode', mode)
            }
        },
        {
            label: "直连模式",
            click: () => {
                mode = "直连";
                _('bottombar-a').innerText = "当前模式" + mode;
                store.set('statemode', mode)
            }
        },
        {
            label: "全局模式",
            click: () => {
                if (store.get('expver') == "expert") {
                    mode = "全局";
                    _('bottombar-a').innerText = "当前模式" + mode;
                    store.set('statemode', mode)
                } else {
                    smtk.alert("提示", "很抱歉，当前版本不支持该模式。请升级到专业版后再试。");
                }
            }
        }
    ];
    let menu = Menu.buildFromTemplate(serverlist);
    menu.popup(remote.getCurrentWindow());
});

Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

naranja().warn({
    title: '正在连接',
    text: "请稍等。第一次使用时可能需要等待两分钟到五分钟。",
    timeout: '3000',
    buttons: [{
        text: '忽略',
        click: function(e) {
            e.closeNotification();
        }
    }]
})


let serverlist = null;

let mainWindows = [];
let currserv = ["美国-洛杉矶-1（高速专线）", "美国-洛杉矶-2（高速专线）"][store.get('stateroute') ? store.get('stateroute') : 0];
let lists;
//CHECK SERVER LIST
if(confg.getlist==true){
    $.ajax({
        url: "http://175.24.32.153:5858/sl.txt",
        type: 'GET',
        cache: false,
        complete: function(response) {
            if (response.status == 200) {
                lists = response.responseText.split('\r\n');

                route = lists[store.get('stateroute') ? store.get('stateroute') : 0];
                reper = `https://${route}/-----`;
                $.ajax({
                    url: "https://" + route + "/",
                    type: 'GET',
                    complete: function(response) {
                        if (response.status == 404) {
                            _('ipns').style.backgroundColor = "rgb(0,123,21)";
                            _('bottombar-c').innerText = "服务器OK";
                            if (!isServer || isServer == "ns") {
                                naranja().success({
                                    title: '连接成功',
                                    text: "成功建立到服务器的代理连接。",
                                    timeout: '3000',
                                    buttons: [{

                                        text: '忽略',
                                        click: function(e) {
                                            e.closeNotification();
                                        }
                                    }]
                                })
                                isServer = 1;
                            }
                        } else {
                            _('ipns').style.backgroundColor = "#8B0000";
                            _('bottombar-b').innerText = "服务器错误";
                            if (isServer || isServer == "ns") {
                                naranja().error({
                                    title: '无法连接到服务器',
                                    text: "很抱歉，暂时无法连接到服务器，请等待。如长时间失败，请切换路线、使用直连或咨询客服。",
                                    timeout: '5000',
                                    buttons: [{
                                        text: '忽略',
                                        click: function(e) {
                                            e.closeNotification();
                                        }
                                    }]
                                })
                                isServer = 0;
                            }

                        }
                    }
                });
                if (mode != "直连") {
                    webview.loadURL("https://" + route + "/-----https://start.duckduckgo.com/");
                    _('bottombar-b').innerText = "该网站使用代理";
                } else {
                    _('bottombar-b').innerText = "代理已禁用";
                }
            } else {
                alert("无法获取服务器列表。请稍后再试。");
                //window.close();
            }
        }
    });
}else{
    lists = [confg.route1,confg.route2];
    route = lists[store.get('stateroute') ? store.get('stateroute') : 0];
    reper = `https://${route}/-----`;
    $.ajax({
        url: "https://" + route + "/",
        type: 'GET',
        complete: function(response) {
            if (response.status == 404) {
                _('ipns').style.backgroundColor = "rgb(0,123,21)";
                _('bottombar-c').innerText = "服务器OK";
                if (!isServer || isServer == "ns") {
                    naranja().success({
                        title: '连接成功',
                        text: "成功建立到服务器的代理连接。",
                        timeout: '3000',
                        buttons: [{

                            text: '忽略',
                            click: function(e) {
                                e.closeNotification();
                            }
                        }]
                    })
                    isServer = 1;
                }
            } else {
                _('ipns').style.backgroundColor = "#8B0000";
                _('bottombar-b').innerText = "服务器错误";
                if (isServer || isServer == "ns") {
                    naranja().error({
                        title: '无法连接到服务器',
                        text: "很抱歉，暂时无法连接到服务器，请等待。如长时间失败，请切换路线、使用直连或咨询客服。",
                        timeout: '5000',
                        buttons: [{
                            text: '忽略',
                            click: function(e) {
                                e.closeNotification();
                            }
                        }]
                    })
                    isServer = 0;
                }

            }
        }
    });
    if (mode != "直连") {
        webview.loadURL("https://" + route + "/-----https://start.duckduckgo.com/");
        _('bottombar-b').innerText = "该网站使用代理";
    } else {
        _('bottombar-b').innerText = "代理已禁用";
    }
}

var options = {
    method: 'get',
    url: "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp"
};
applyedu = (code) => {
    $.ajax({
        url: `http://175.24.32.153:5858/usecard.php?filename=cards_edu.txt&oldcm=${code}`,
        type: 'GET',
        complete: function(response) {
            if (code.length == 16) {
                if (response.status == 404) {
                    alert("错误：无法连接到服务器");
                } else {
                    if (response.responseText == "successed") {
                        request(options, function(err, res, body) {
                            if (err) {
                                alert("无法连接到网络，请联系客服解决。");
                            } else {
                                currenttime = (Number(JSON.parse(body).data.t));
                                store.set("expdate", store.get('expdate') + 2592000000);
                                store.set("expver", "edu");
                                smtk.alert("续费结果", "当前到期时间变为" + new Date(Number(store.get('expdate'))).format('yyyy年MM月dd日 hh:mm:ss'));
                            }
                        })
                    } else {
                        smtk.alert("续费结果", "续费失败，请检查激活码有效性或再试一次。");
                    }
                }
            } else {
                smtk.alert("续费结果", "续费失败，请检查激活码有效性或再试一次。");
            }

        }
    });
}
applyexpert = (code) => {
    $.ajax({
        url: `http://175.24.32.153:5858/usecard.php?filename=cards_expert.txt&oldcm=${code}`,
        type: 'GET',
        complete: function(response) {
            if (code.length == 16) {
                if (response.status == 404) {
                    alert("错误：无法连接到服务器");
                } else {
                    if (response.responseText == "successed") {
                        request(options, function(err, res, body) {
                            if (err) {
                                alert("无法连接到网络，请联系客服解决。");
                            } else {
                                currenttime = (Number(JSON.parse(body).data.t));
                                store.set("expdate", store.get('expdate') + 2592000000);
                                store.set("expver", "expert");
                                smtk.alert("续费结果", "当前到期时间变为" + new Date(Number(store.get('expdate'))).format('yyyy年MM月dd日 hh:mm:ss'));
                            }
                        })
                    } else {
                        smtk.alert("续费结果", "续费失败，请检查激活码有效性或再试一次。");
                    }
                }
            } else {
                smtk.alert("续费结果", "续费失败，请检查激活码有效性或再试一次。");
            }

        }
    });
}
applystandard = (code) => {
    $.ajax({
        url: `http://175.24.32.153:5858/usecard.php?filename=cards_standard.txt&oldcm=${code}`,
        type: 'GET',
        complete: function(response) {
            if (code.length == 16) {
                if (response.status == 404) {
                    alert("错误：无法连接到服务器");
                } else {
                    if (response.responseText == "successed") {
                        request(options, function(err, res, body) {
                            if (err) {
                                alert("无法连接到网络，请联系客服解决。");
                            } else {
                                currenttime = (Number(JSON.parse(body).data.t));
                                store.set("expdate", store.get('expdate') + 2592000000);
                                store.set("expver", "standard");
                                smtk.alert("续费结果", "当前到期时间变为" + new Date(Number(store.get('expdate'))).format('yyyy年MM月dd日 hh:mm:ss'));
                            }
                        })
                    } else {
                        smtk.alert("续费结果", "续费失败，请检查激活码有效性或再试一次。");
                    }
                }
            } else {
                smtk.alert("续费结果", "续费失败，请检查激活码有效性或再试一次。");
            }

        }
    });
}

_('menubtn').addEventListener('click', function(event) {
    let templatemenu = [
        { label: "当前版本： " + (store.get('expver') == "edu" ? "教育版" : (store.get('expver') == "expert" ? "专业版" : "标准版")), enabled: false },
        { label: "到期时间：" + new Date(Number(store.get('expdate'))).format('yyyy年MM月dd日 hh:mm:ss'), enabled: false },
        {
            label: "续费",
            click: () => {
                smtk.prompt("续费", "请输入多个同版本的激活码，由空格隔开。<br><a style='color:cyan;cursor:pointer;' onclick='" + `shell.openExternal("https://www.pkfaka.com/details/${(store.get('expver')=="edu"?"15CA507F":(store.get('expver')=="expert"?"89A93D28":"8F3ADD27"))}")` + "'>购买相同版本激活码</a>").then((e) => {
                    let msgcons = "";
                    let jhms = e.split(" ");
                    let checksyd = (store.get('expver') == "edu" ? applyedu : (store.get('expver') == "expert" ? applyexpert : applystandard));
                    for (var i = 0; i < jhms.length; i++) {
                        checksyd(jhms[i]);
                    }
                }, () => {})
            }
        },
        {
            label: "升级",
            click: () => {
                if (store.get('expver') == "expert") {
                    smtk.alert("提示", "您已经是专业版，不需要升级。")
                } else {
                    smtk.confirm("升级", "确定将您的" + (store.get('expver') == "edu" ? "教育版" : (store.get('expver') == "expert" ? "专业版" : "标准版")) + "升级到专业版吗？剩余时间将会根据比例自动计算更改。").then((e) => {
                        let rate = (store.get('expver') == "edu" ? 0.083333333333333 : (store.get('expver') == "expert" ? 1 : 0.66666666666));
                        request(options, function(err, res, body) {
                            if (err) {
                                alert("无法连接到网络，请稍后再试");
                            } else {
                                currenttime = (Number(JSON.parse(body).data.t));
                                store.set("expdate", store.get('expdate') + (store.get('expdate') - currenttime) * rate);
                                store.set("expver", "expert");
                                smtk.alert("升级结果", "当前版本变为专业版，当前到期时间变为" + new Date(Number(store.get('expdate'))).format('yyyy年MM月dd日 hh:mm:ss'));
                            }
                        })
                    }, () => {})
                }

            }
        },
        { type: "separator" },
        {
            label: "关闭窗口",
            click: () => {
                remote.app.quit()
            }
        },
        {
            label: "退出浏览器",
            click: () => {
                remote.app.quit()
            }
        }
    ];
    let menu = Menu.buildFromTemplate(templatemenu);
    menu.popup();
});
setInterval(function() {
    if (__('webgo') != "") {
        let wcv = __('webgo');
        _('webgo').value = "";
        webview.loadURL(loadbtn(wcv));
    }
}, 200);




















//CHECK FOR THE STATE   
let fn = true;
setInterval(function() {
    request(options, function(err, res, body) {
        if (err) {
            
        } else {
            currenttime = (Number(JSON.parse(body).data.t));
            if(store.get('expdate')<currenttime){
                smtk.alert("提示", "您的激活码已到期，请续费。").then((e) => {
                    remote.app.quit();
                });
            }else if(store.get('expdate')-70000<currenttime){
                if(fn){
                smtk.alert("提示", "您的激活码即将到期，浏览器将在一分钟内退出。请保存数据。");
                fn=false;
                }
            }
        }
    })
    $.ajax({
        url: "https://" + route + "/",
        type: 'GET',
        complete: function(response) {
            if (response.status == 404) {
                _('ipns').style.backgroundColor = "rgb(0,123,21)";
                _('bottombar-c').innerText = "服务器OK";
                if (!isServer || isServer == "ns") {
                    naranja().success({
                        title: '连接成功',
                        text: "成功建立到服务器的代理连接。",
                        timeout: '3000',
                        buttons: [{

                            text: '忽略',
                            click: function(e) {
                                e.closeNotification();
                            }
                        }]
                    })
                    isServer = 1;
                }
            } else {
                _('ipns').style.backgroundColor = "#8B0000";
                _('bottombar-b').innerText = "服务器错误";
                if (isServer || isServer == "ns") {
                    naranja().error({
                        title: '无法连接到服务器',
                        text: "很抱歉，暂时无法连接到服务器，请等待。如长时间失败，请切换路线、使用直连或咨询客服。",
                        timeout: '5000',
                        buttons: [{
                            text: '忽略',
                            click: function(e) {
                                e.closeNotification();
                            }
                        }]
                    })
                    isServer = 0;
                }

            }
        }
    });
}, 10000);