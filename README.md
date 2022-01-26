# IFrame-Window

## 畫面呈現

<img src="./screen-shot.gif" style="height:50rem">

## 安裝

- IFrame-Window 可以透過 ```<script>``` 以 cdn 方式引入。

```JS
    <script>
        (function (w, c, p, s, e) {
            p = new Promise(function (resolve) {
                w[c] = {
                    createFile: function () {
                        if (!s) {
                            s = document.createElement('script');
                            s.src = './lib/iframe-window.js';
                            s.async = 1;
                            e = document.getElementsByTagName('script')[0];
                            e.parentNode.insertBefore(s, e);
                            s.onload = function () {
                                resolve(w[c]);
                            };
                        }
                        return p;
                    }
                }
            })
        })(window, 'IFrameWindow')

        IFrameWindow.createFile().then(function () {
            // 若寬度與高度設定大於使用者當前畫面，會自動調整為當前視窗最大值
            IFrame_Window.createWindow(
                'https://ai3.cloud/',
                600, // 寬度。單位 px
                400); // 高度。單位 px
        })
    </script>
```
- Example：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DEMO</title>
    <script>
        (function (w, c, p, s, e) {
            p = new Promise(function (resolve) {
                w[c] = {
                    createFile: function () {
                        if (!s) {
                            s = document.createElement('script');
                            s.src = './lib/iframe-window.js';
                            s.async = 1;
                            e = document.getElementsByTagName('script')[0];
                            e.parentNode.insertBefore(s, e);
                            s.onload = function () {
                                resolve(w[c]);
                            };
                        }
                        return p;
                    }
                }
            })
        })(window, 'IFrameWindow')

        IFrameWindow.createFile().then(function () {
            // 若寬度與高度設定大於使用者當前畫面，會自動調整為當前視窗最大值
            IFrame_Window.createWindow(
                'https://ai3.cloud/',
                600, // 寬度。單位 px
                400); // 高度。單位 px
        })
    </script>
</head>

<body>
</body>

</html>
```


## 函式介紹

### 建立 IFrame-Window
- IFrame_Window.createWindow( url , width , height )
  - url ```<string>```： 要嵌入 IFrame 的 Url 。(必填欄位)
  - width ```<number>```: IFrame-Window 寬度，以 px 為單位。(必填欄位)
  - height ```<number>```: IFrame-Window 高度，以 px 為單位。(必填欄位)

### 移除 IFrame-Window
- IFrame_Window.closeWindow()
  
