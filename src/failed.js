// This file is used for window-control
const { shell } = require("electron");
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