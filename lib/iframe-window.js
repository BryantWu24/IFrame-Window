var IFrame_Window = {
    element: {
        divBar: null,
        divOuter: null,
        iframe: null,
    },

    cusStyle: {
        minHeight: '300px',
        minWidth: '500px',
    },

    setting: {
        width: 0,
        height: 0,
        url: 0
    },

    createWindow: function (url, width, height) {
        // 建立視窗

        if (!!url) IFrame_Window.setting.url = url;
        else {
            console.error('IFrame_Window setting Error : Need to set url target.')
            return;
        }

        if (!!width) IFrame_Window.setting.width = width;
        else {
            console.error('IFrame_Window setting Error : Need to set width length.')
            return;
        }

        if (!!height) IFrame_Window.setting.height = height;
        else {
            console.error('IFrame_Window setting Error : Need to set height length.')
            return;
        }

        if (!!IFrame_Window.element.divOuter) {
            IFrame_Window.element.iframe.onload = function () {
                IFrame_Window.createDargEvent();
                IFrame_Window.element.iframe.onload = null;
            }
            IFrame_Window.element.iframe.src = url
        } else {
            const iframe = document.createElement('iframe');
            iframe.id = 'iframe';
            iframe.style.width = 'calc(100% - 5px)';
            iframe.style.minWidth = IFrame_Window.cusStyle.minWidth;
            iframe.style.minHeight = IFrame_Window.cusStyle.minHeight;
            iframe.style.borderRadius = '10px';

            const divIframe = document.createElement('div');
            divIframe.style.display = 'flex';
            divIframe.id = 'divIframe';
            divIframe.style.width = '100%';
            divIframe.style.justifyContent = 'center';
            divIframe.style.borderTop = 'solid 2px gray';
            divIframe.appendChild(iframe);

            const divBar = document.createElement('div');
            divBar.style.width = 'calc(100% - 5px)';
            divBar.style.height = '20px';
            divBar.style.cursor = 'grab';
            divBar.style.display = 'flex';
            divBar.style.alignItems = 'center';
            divBar.style.justifyContent = 'flex-end';
            divBar.id = 'divBar';
            divBar.draggable = "true"
            divBar.innerHTML = "<img src=\"./lib/image/times-solid.svg\" style=\"height:100%; cursor:pointer;\" onclick=\"IFrame_Window.closeWindow()\" />";

            const divOuter = document.createElement('div');
            divOuter.style.position = 'fixed';
            divOuter.style.background = '#E7E9EB';
            divOuter.style.borderRadius = '10px';
            divOuter.style.height = !!height ? (window.innerHeight > height) ? height + 'px' : window.innerHeight + 'px' : '300px';
            divOuter.style.minHeight = IFrame_Window.cusStyle.minHeight;
            divOuter.style.width = !!width ? (window.innerWidth > width) ? width + 'px' : window.innerWidth + 'px' : '500px';
            divOuter.style.minWidth = IFrame_Window.cusStyle.minWidth;
            divOuter.id = 'divOuter';
            divOuter.style.top = 'calc(' + window.innerHeight + 'px - ' + divOuter.style.height + ' )';
            divOuter.style.zIndex = '9999';
            divOuter.style.left = 'calc(' + window.innerWidth + 'px - ' + divOuter.style.width + ')';
            divOuter.style.border = 'solid 2px gray';
            divOuter.innerHTML = divBar.outerHTML + divIframe.outerHTML;

            document.body.appendChild(divOuter);

            IFrame_Window.element.divBar = document.getElementById('divBar');
            IFrame_Window.element.divOuter = document.getElementById('divOuter');
            IFrame_Window.element.iframe = document.getElementById('iframe');
            IFrame_Window.element.divIframe = document.getElementById('divIframe');
            IFrame_Window.element.iframe.onload = function () {
                IFrame_Window.createDargEvent();
                IFrame_Window.element.iframe.onload = null;
            }
            IFrame_Window.element.iframe.src = url;
            IFrame_Window.element.iframe.style.border = 'none';
            IFrame_Window.element.iframe.style.height = (parseInt(IFrame_Window.element.divOuter.style.height) - parseInt(IFrame_Window.element.divBar.style.height) - 3) + 'px';

            window.addEventListener('resize', function (e) {
                if (window.innerWidth < (IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.left) + IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.width))) {
                    if (window.innerWidth < IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.width)) {
                        IFrame_Window.element.divOuter.style.width = window.innerWidth + 'px';
                        IFrame_Window.element.divOuter.style.left = 0;
                    } else {

                        IFrame_Window.element.divOuter.style.left = (window.innerWidth - IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.width)) + 'px';
                    }
                } else IFrame_Window.element.divOuter.style.width = IFrame_Window.setting.width + 'px';


                if (window.innerHeight < (IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.top) + IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.height))) {
                    if (window.innerHeight < IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.height)) {
                        IFrame_Window.element.divOuter.style.height = window.innerHeight + 'px';
                        IFrame_Window.element.iframe.style.height = window.innerHeight - IFrame_Window.getPixelValue(IFrame_Window.element.divBar.style.height) + 'px';

                        IFrame_Window.element.divOuter.style.top = 0;
                    } else IFrame_Window.element.divOuter.style.top = (window.innerHeight - IFrame_Window.getPixelValue(IFrame_Window.element.divOuter.style.height)) + 'px';
                } else {
                    IFrame_Window.element.divOuter.style.height = IFrame_Window.setting.height + 'px';
                    IFrame_Window.element.iframe.style.height = IFrame_Window.setting.height - IFrame_Window.getPixelValue(IFrame_Window.element.divBar.style.height - 3) + 'px';
                }

            })
        }

    },

    getPixelValue(string) {
        // 取得 pixel 大小
        const pixelNumberReg = new RegExp(/[0-9]+px/);
        const matchAry = string.match(pixelNumberReg);
        if (!!matchAry) {
            return parseInt(matchAry[0].split('px')[0]) || matchAry[0].split('px')[0];
        } else return string;
    },

    createDargEvent() {
        // 建立拖拉事件
        IFrame_Window.element.divBar.addEventListener('dragstart', function (event) {
            dragged = event.target;
            event.target.style.opacity = 1;
        }, false)

        IFrame_Window.element.divBar.addEventListener('dragend', function (event) {
            event.target.style.opacity = "";
            let top = '0px';
            let left = '0px';

            // 計算 top
            if (event.clientY - parseInt(IFrame_Window.element.divBar.style.height) / 2 < 0) {
                top = '0px';
            } else if ((event.clientY + parseInt(IFrame_Window.element.divOuter.style.height) + parseInt(IFrame_Window.element.divBar.style.height) / 2) > window.innerHeight) {
                top = window.innerHeight - parseInt(IFrame_Window.element.divOuter.style.height) + 'px';
            } else top = (event.clientY - 10) + 'px';

            // 計算 left
            if ((event.clientX - parseFloat(IFrame_Window.element.divOuter.style.width) / 2) < 0) {
                left = '0px';
            } else if (event.clientX + parseFloat(IFrame_Window.element.divOuter.style.width) / 2 > window.innerWidth) {
                left = window.innerWidth - parseFloat(IFrame_Window.element.divOuter.style.width) + 'px';
            } else left = (event.clientX - parseFloat(IFrame_Window.element.divOuter.style.width) / 2) + 'px';

            IFrame_Window.element.divOuter.style.left = left;
            IFrame_Window.element.divOuter.style.top = top;
            IFrame_Window.element.divBar.style.cursor = 'grab';
        }, false)
    },
    closeWindow() {
        // 關閉視窗
        if (!!IFrame_Window.element.divOuter) IFrame_Window.element.divOuter.remove();
        IFrame_Window.element = {
            divBar: null,
            divOuter: null,
            iframe: null,
        }
    }
}