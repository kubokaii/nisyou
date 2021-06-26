var wordlist = ["imanokaredeiinjanai?","koekakeniikimasu?","ketutokahakanbensitekudasaine?","ketuhakanbensitekudasaitteittajanaidesuka","nandaomaekonjounasidana","dakaraitexetuttenjaneeka"];
var wordlistJapanese = ["今の彼でいいんじゃない？","声かけに行きます？","ケツとかは勘弁してくださいね？","ケツは勘弁してくださいって言ったじゃないですか","なんだお前根性なしだな","だから痛ぇつってんじゃねえかよ"];
     var time_limit = 90;
     var readytime = 3;
     var score;
     var correct;
     var mistake;
     var char_num = 0;
     var word_char;
     var random;
     var newline;
     var replacewordlist = [];
     function ready(){
         readytime = 3;
         scoredis.innerHTML="";
         start_button.style.visibility ="hidden";
         var readytimer = setInterval(function(){
             count.innerHTML=readytime;
             readytime--;
             if(readytime < 0){
                clearInterval(readytimer);
                 gameStart();
                }
         },1000);
     }
     function gameStart(){
         score = 0.0;
         mistake = 0;
         correct = 0;
         wordDisplay();
         var time_remaining = time_limit;
         var gametimer = setInterval(function(){
            count.innerHTML="残り時間："+time_remaining;
             time_remaining--;
             if(time_remaining <= 0){
             clearInterval(gametimer);
                 finish();
         }
         },1000);
     }
     function wordDisplay(){
         random = Math.floor( Math.random() * wordlist.length );
         replacewordlist[random] = wordlist[random].replace("<br>/g","");
         newline = wordlist[random].indexOf("<");
         word.innerHTML = wordlist[random];
         japanese.innerHTML = wordlistJapanese[random];
         charInsort();
     }
     function charInsort(){
         word_char = replacewordlist[random].charAt(char_num);
     }
     function finish(){
         score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
         scoredis.innerHTML="スコア:"+score+"点"+"<hr>正タイプ数:"+correct+"<br>ミスタイプ数:"+mistake+"<br>正答率"+(correct/(correct+mistake)*100).toFixed(1)+"%";
         count.innerHTML="";
         word.innerHTML="";
         japanese.innerHTML="";
         start_button.style.visibility ="visible";
         word_char=0;
         random = 0;
         char_num = 0;
     }
document.onkeydown = function(e) {
    if(e.keyCode == 189){
       keyStr = "-";
       }else if(e.keyCode == 188){
                keyStr = ","
                }else{
 var keyStr = String.fromCharCode(e.keyCode);
    keyStr = keyStr.toLowerCase();
       }
    if(keyStr == word_char){
        document.getElementById('missaudio').pause();
        document.getElementById('missaudio').currentTime = 0;
        document.getElementById('correctaudio').pause();
        document.getElementById('correctaudio').currentTime = 0;
        document.getElementById('correctaudio').play();
        word.innerHTML="<span style='color: red;'>"+wordlist[random].substr(0,char_num+1)+"</span>"+wordlist[random].substr(char_num+1,wordlist[random].length);
        char_num++;
        if(newline == char_num){
           char_num = char_num + 4;
           }
        correct++;
        charInsort();
       }else{
           document.getElementById('missaudio').pause();
           document.getElementById('missaudio').currentTime = 0;
           document.getElementById('correctaudio').pause();
           document.getElementById('correctaudio').currentTime = 0;
           mistake++;
           document.getElementById('missaudio').play();
       }
    if(char_num == wordlist[random].length){
        char_num=0;
        wordDisplay();
       }
};
 
