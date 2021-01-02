// This file is used for window-control
const { shell, remote } = require("electron");
const { BrowserWindow } = remote;
const fs = require('fs')
const Store = require('electron-store');
const store = new Store();
const request = require("request");
ipcRenderer.on('fullscr', (event, arg) => {
    if (arg) {
        _('maxbtn').style.display = "none";
        _('defullbtn').style.display = "block";
    } else {
        _('maxbtn').style.display = "block";
        _('defullbtn').style.display = "none";
    }
})
_('closebtn').onclick = function() {
    ipcRenderer.send('exit');
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
    window.onresize = function() {
        ipcRenderer.send('window-get');
    }
});
let edulist = () => {
    let win = new BrowserWindow({
        width: 220,
        height: 550,
        title: "教育版",
        icon: "bin/icon.ico",
        resizable: false
    })
    win.loadURL('data:text/plain;utf8,' + fs.readFileSync(__dirname + '/edulist.txt', 'utf-8'));
}


let gfwlist = () => {
    let win = new BrowserWindow({
        width: 220,
        height: 550,
        title: "专业版",
        icon: "bin/icon.ico",
        resizable: false
    })
    win.loadURL('data:text/plain;utf8,' + fs.readFileSync(__dirname + '/gfwlist.txt', 'utf-8'));
}


let stlist = () => {
    let win = new BrowserWindow({
        width: 220,
        height: 550,
        title: "标准版",
        icon: "bin/icon.ico",
        resizable: false
    })
    win.loadURL('data:text/plain;utf8,' + fs.readFileSync(__dirname + '/stlist.txt', 'utf-8'));
}




var options = {
    method: 'get',
    url: "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp"
};
let currenttime = 0;
applytest = (code) => {
    $.ajax({
        url: `http://175.24.32.153:5858/usecard.php?filename=cards_test.txt&oldcm=${code}`,
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
                                store.set("expdate", currenttime + 2592000000);
                                alert("激活成功，剩余时间 30天\r\n重启该浏览器后生效");
                                window.close();
                            }
                        })
                    } else {
                        alert("激活失败，请确认激活码有效性");
                    }
                }
            } else {
                alert("激活失败，请确认激活码有效性");
            }

        }
    });
}
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
                                store.set("expdate", currenttime + 2592000000);
                                store.set("expver", "edu");
                                alert("激活成功，剩余时间 30天\r\n重启该浏览器后生效");
                                window.close();
                            }
                        })
                    } else {
                        alert("激活失败，请确认激活码有效性");
                    }
                }
            } else {
                alert("激活失败，请确认激活码有效性");
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
                                store.set("expdate", currenttime + 2592000000);
                                store.set("expver", "expert");
                                alert("激活成功，剩余时间 30天\r\n重启该浏览器后生效");
                                window.close();
                            }
                        })
                    } else {
                        alert("激活失败，请确认激活码有效性");
                    }
                }
            } else {
                alert("激活失败，请确认激活码有效性");
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
                                store.set("expdate", currenttime + 2592000000);
                                store.set("expver", "standard");
                                alert("激活成功，剩余时间 30天\r\n重启该浏览器后生效");
                                window.close();
                            }
                        })
                    } else {
                        alert("激活失败，请确认激活码有效性");
                    }
                }
            } else {
                alert("激活失败，请确认激活码有效性");
            }

        }
    });
}
//B3LVBU3G3Q8KL0SK