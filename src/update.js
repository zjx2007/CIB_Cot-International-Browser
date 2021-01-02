// This file is used for window-control
const { shell, remote } = require("electron");
const request = require('request');
const fs = require('fs')
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
let aq=false;
var update = {
    method: 'get',
    url: "http://175.24.32.153:5858/upd.txt"
};
request(update, function(err, res, body) {
    if (err) {
        alert("下载失败。")
        aq=!aq;
        remote.app.quit();
    } else {
        let url = body.split('\r\n')[1];
        _('ctms').innerText = "更新中请等待1分钟";
        request({ method: 'get', url: url }, function(err, res, body) {
            if (err) {
                alert("下载失败")
                remote.app.quit();
            } else {
                _('ctms').innerText = "下载完成";
                fs.writeFileSync(process.cwd() + "/resources/app.dld", body);
                runExec();
                setTimeout(()=>{
                    remote.app.quit()
                },1000)
            }
        })
    }
})

const exec = require('child_process').exec
let cmdStr = 'start applyupd.exe "'+process.cwd() + "/resources/app.asar"+'" "'+process.cwd() + "/resources/app.dld" + '"';

let cmdPath = process.cwd() + "/bin/";
let workerProcess

function runExec() {
    workerProcess = exec(cmdStr, { cwd: cmdPath })
    // 不受child_process默认的缓冲区大小的使用方法，没参数也要写上{}：workerProcess = exec(cmdStr, {})

    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });

    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });

    // 退出之后的输出
    workerProcess.on('close', function(code) {
        aq=!aq;
        remote.app.quit();
    })
}