## Notes

### 1. 如何執行完成的 package

請參考專案最上層的 [README.md](../../README.md) 的 Quick Start 一節。

### 2.思路與筆記

本次製作參考tiktok WAP模式與HY提供的figma圖檔下去製作
>該如何呈現上下滑動每個區塊來進行觀看影片？

使用swiper touch Slider功能並設定垂直的方式進行此功能製作

> Video source如何呈現m3u8的格式影片？

使用video.js處理m3u8的影片格式，並且自訂樣式與播放功能，讓上下滑動能自動播放

> 處理影片切換following , foryou播放清單

將存入的list data，加入狀態videoState，並設定狀態為play或是pause
切換選單時紀錄目前是哪個正在播放，切換時再將指定清單的狀態更改為play 
透過vue watch監聽videoState是否有被更動，有被更動將會做影片處理

> 功能需求第四點 Progress Bar 可拖曳播放進度，並未製作完畢

本週有三天時候因公司與家庭因素，不在台北，因時間趕不上，所以本次並未製作完畢
progress bar被我列入為最後功能項目，首要先把功能全部呈現出來，後續優化時間在進行progress bar
如要製作progress bar，目前的想法
1.將畫面切版，製作一個div 命名為progress-bar裡面包length（進度條）

2.先取得video的總長時間換算與影片播放的現在時間，建立一個updateProgress的function<br>
const { currentTime , duration } = audioPlayer;<br>
const percentTime = ((currentTime / duration) * 100).toFixed(2);<br>
progressBar.css("width", `${percentTime}%`);<br>

3.video每次timeupdate時，去跑updateProgress function，就會進行進度條的更新

4.點擊進度條時取得progress-bar的總寬度，以及點擊progress-bar的offsetX的寬度進行運算，然後將audioPlayer的currentTime指定到運算後的寬度，currentTime更新之後，也會一同觸發video timeupdate，一並進行updateProgress的function<br>
const width = element.clientWidth;<br>
const clickX = element.offsetX;<br>
const { duration } = audioPlayer;<br><br>

audioPlayer.currentTime = (clickX / width) * duration;

###

### 3. 其他

> 如果影片想要設計試看功能，請問怎麼設計比較好。舉例 一個影片長30mins，但試看只能看前5mins，影片來源需是 m3u8 格式，設計想法 並不侷限在前端操作行為，可自由發揮


如果要處理並支援 M3U8 格式的影片播放器
選用 Video.js 或 Hls.js。這些播放器能夠處理 M3U8 格式的影片相關格式
要設定每個影片有試看功能的話，目前的想像是
透過player 的 timeupdate 事件監聽器，當播放時間超過 5 分鐘（300 秒）時，將暫停播放器
並彈跳出相關視窗提醒目前已停止影片播放，這部影片僅提供試看

更暴力一點就是再載入頁面或打ＡＰＩ之前，直接請後端根據影片設定產出一個5分鐘試看影片資料塞入

### 
