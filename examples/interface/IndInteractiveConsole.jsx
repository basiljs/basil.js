/*
* InDesign Interactive Console
* @nbqx made the original of this script. 
* http://d.hatena.ne.jp/nbqx69/20100617#p1
*/

#target Indesign
#targetengine nbqx

// ユーティリティ
// Utility
var _ = {};

// app.activeDocument.selection[0]のショートハンド
// Short of hand
_.getSelect = function(){
  var s = app.activeDocument.selection[0];
  if(s){
    return s
  }else{
    return 'none!'
  }
}

// ファイルのパス指定で実行
// Run in the path specified in the file
// ex. load("/opt/indesign/jsonizer.jsx")
_.load = function(path){
  $.evalFile(path);
  return "loading done!"
}

// ログファイル
// Log file
_.logFile = new File(app.activeScript.parent.absoluteURI+'/log.txt');
_.logFile.encoding="UTF8";
_.logFile.lineFeed="Unix";

_.log = function(str){
  try{
    if(this.logFile.open('e')){
      this.logFile.seek(0,2);
      this.logFile.writeln(str);
      this.logFile.close();
    }
  }catch(e){}
}

// filter
// usage: _.filter(objs,fn) => obj
// fnはtrue or falseをかえすような関数です
// fn is a function that returns true or false
/*
_.filter(app.activeDocument.allPageItems,function(o){
  return (o instanceof TextFrame)
})
*/

_.filter = function(obj,fn){
  var ret = [];
  var tgt = (obj instanceof Array)? obj : [obj];
  
  for(var i=0; i<tgt.length; i++){
    if(fn(tgt[i])){
      ret.push(tgt[i]);
    }
  }
  return ret
}

//merge
//オブジェクト同士をマージするよ
//I'll merge the objects together
//usage: _.merge([{a:1,b:1},{b:2,c:3}])
_.merge = function(o){
  var ret = {};
  var obj = (o instanceof Array)? o : [o];

  for(var k in obj){
    ret[k] = obj[k];
  }
  return ret
}

// ヘルプを表示する
_.help = (function(){
  return 'TODO: I want to display the help'
})();

// EditTextのjavascriptを実行
// Run javascript of EditText
var evaluation = function(code){
  var res = {res:true,ret:undefined,log:[]};
  
  //$.writeと$.writelnをオーバーライド
  $.write = function(str){ res.log.push(str) };
  $.writeln = function(str){ res.log.push(str+'\n') };
  
  try{
    _.log('========== '+ new Date() +' ==========\n' + code +'\n');
    res.ret = eval(code);
  }catch(e){
    res.res = false
    res.ret = e.toString();
  }
  return res;
}

// main
// クラスにする
// I to class
var console;
console = new Window("palette", "InDesign Interactive Console beta", undefined, {resizable:true,closeButton:true});
console.orientation = 'column';
console.ta = console.add('edittext',{x:5, y:10, width:360, height:200},"/* New line: use Ctrl+Enter */\n",{
  margins:[3,3,3,3],
  enterKeySignalsOnChange:true,
  borderless:false,
  multiline:true,
  scrollable:true});
console.ra = console.add('edittext',{x:5, y:480, width:360, height:100},"Execution result\n",{
  margins:[3,3,3,3],
  readonly:true,
  borderless:false,
  multiline:true,
  scrollable:true});

console.ta.onChange = function(){
  var r = evaluation(console.ta.text);
  var str = '';
  if(r.log.length>0){
    str = r.log.join('\r')+'\r';
  }
  _.log('---------- Execution result ----------\n'
  + str + r.ret
  + '\n------------------------------\n');
  console.ra.text = str + r.ret;
}
console.show();