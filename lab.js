;(function(root){
 /*usage
 
 let seed=1,room=8,fill=100,door=70
 lab(seed,room,fill,door) 
 //empty
 let f00=lab(seed,0,-1,-1)
 //f00.str
 //f00.data
 //f00.mapsize
 */
 
let fn={}
fn.rand=(n)=>{return ~~(~~n*Math.random())}
fn.len2pos=(n,w)=>{return [n%w,~~(n/w)] }
fn.pos2len=(x,y,w)=>{return y*w+x}
fn.strsplit=function strenter(str, length) {
 var resultArr = [];
 if (!str || !length || length < 1) {
  return resultArr;
 }
 var index = 0;
 var start = index;
 var end = start + length;
 while (start < str.length) {
  resultArr[index] = str.substring(start, end);
  index++;
  start = end;
  end = start + length;
 }
 return resultArr;
}
fn.tomapdata=function tomapdata(ary,w){
 if(/\n/.test(ary)) return fn.tomapdata(ary.split('\n').join(''),w)
 let getpos=function getpos(mapx,mapy,data,w){
  let x=~~(mapx*2)+1
  let y=~~(mapy*2)+1
  let f=(x,y,w)=>{return y*w+x}//fn.pos2len
  //console.log(mapx,mapy,x,y,f(x,y,w))

  let o={}
  o.e=data[f(x+1,y,w)]
  o.w=data[f(x-1,y,w)]
  o.c='　'
  o.g=data[f(x,y,w)]
  o.n=data[f(x,y-1,w)]
  o.s=data[f(x,y+1,w)]

  /*
 let str=
 "■"+o.n+"■"+"\n"
+ o.w+o.g+ o.e+"\n"
+"■"+o.n+"■"
 console.log(str,o)
 */
  return o
 }
 let size=(w-w%2)/2,data=[]
 for(let y=0;y<size;y++)
  for(let x=0;x<size;x++){
   data.push(getpos(x,y,ary,w))
  }
 return data
}
fn.even=(n)=>{
 return (n%2)?n-1:n
}
fn.room=function room(w,h,n){
 let road='　',wall='■'
 let ary=Array.from({length:w*h}).map(d=>wall)
 ;//calc bou-dung

 let oor=(w,h,x,y)=>{
  //out of range
  return (x>w||y>h||x<0||y<0)
 }
 let paint=(rw,rh,ox,oy)=>{
  let room=Array.from({length:rw*rh}).map(d=>road)
  for(let i=0;i<room.length;i++){
   let a=fn.len2pos(i,rw),x=a[0]+ox,y=a[1]+oy
   if(oor(w,h,x,y)) continue;
   ary[fn.pos2len(x,y,w)]=road
  }
 }

 let sizes=[6,7,8,9,10]
 let len=sizes.length
 let r=Array.from({length:n}).map(d=>{
  let rw=sizes[fn.rand(len)],rh=sizes[fn.rand(len)]
  paint(rw,rh,fn.rand(w-rw),fn.rand(h-rh))

 })
 ;
 return {
  ary:ary,
  str:fn.strsplit(ary.join(''),w).join('\n'),
  data:fn.tomapdata(ary,w),
  size:w,
  mapsize:~~(w/2)
 }
 //return (strflg)?fn.strsplit(ary.join(''),w).join('\n'):ary
}
;
function lab(seed,n,fill,ndoor){
 fill=(fill===void 0)?100:fill
 ndoor=(ndoor===void 0)?70:ndoor
 fn.rand=xrand(seed)
 let w=41,h=41
 let ishit=d=>fn.rand(100)<=fill
 let road='　',wall='■',unread='□',maskary=fn.room(w,h,n).ary
 let ary=Array.from({length:w*h}).map(d=>road)
 let f=(cx,cy)=>{
  let al=[]
  if(cy===2&&ary[fn.pos2len(cx-0,cy-1,w)]!=wall) al.push([cx-0,cy-1])
  if(ary[fn.pos2len(cx+1,cy-0,w)]!=wall) al.push([cx+1,cy-0])
  if(ary[fn.pos2len(cx-1,cy-0,w)]!=wall) al.push([cx-1,cy-0])
  if(ary[fn.pos2len(cx-0,cy+1,w)]!=wall) al.push([cx-0,cy+1])
  let num=fn.rand(al.length -1)
  return al[num]
 }
 ;//calc bou-dung
 for(let i=0;i<ary.length;i++){
  let a=fn.len2pos(i,w),x=a[0],y=a[1]
  ;
  if(y===0||y===h-1||x===0||x===w-1){ary[i]= wall;continue}
  if(x%2===0 && y%2===0){
   //console.log(ishit())
   if(ishit()){
    let b=f(x,y),len=fn.pos2len(b[0],b[1],w)
    ary[len]=(maskary[len]===wall)?wall:road
   }
   ary[i]=unread;continue
  }
  ;
 }
 ;
 ary=grid(ary,w)
 ary=doorable(ary,w,ndoor)
 ;
 return {
  ary:ary,
  str:fn.strsplit(ary.join(''),w).join('\n'),
  data:fn.tomapdata(ary,w),
  size:w,
  mapsize:~~(w/2)
 }
 //return (strflg)?fn.strsplit(ary.join(''),w).join('\n'):ary
}

root.lab=lab

function doorable(a,w,rate){
 rate=rate||100
 let ary=a,g='扉',h=w,ch=0
 for(let i=0;i<ary.length;i++){
  let a=fn.len2pos(i,w),x=a[0],y=a[1],flg=0
  ;
  if(y===0||y===h-1||x===0||x===w-1)continue;
  //if(!(x%2===1&&y%2===1) )continue;
  if( (x%2===1&&y%2===0) || (y%2===1&&x%2===0) ){
   if(ary[i]==='■')continue;
   if(ary[fn.pos2len(x-1,y-1,w)]==='■'&&ary[fn.pos2len(x+1,y-1,w)]==='■')flg++
   if(ary[fn.pos2len(x+1,y-1,w)]==='■'&&ary[fn.pos2len(x+1,y+1,w)]==='■')flg++
   if(ary[fn.pos2len(x-1,y-1,w)]==='■'&&ary[fn.pos2len(x+1,y+1,w)]==='■')flg++
   if(ary[fn.pos2len(x+1,y-1,w)]==='■'&&ary[fn.pos2len(x-1,y+1,w)]==='■')flg++
   if(flg&&flg!=4)
    if(fn.rand(100)<rate)
     ary[i]=g   
  }
 }//for
 /*
□■□・□
■　■　・ // -1,-1  1,-1 が■
□＊□・□ //或いは
・　・　・ // 1,-1　1,1　が■
□・□・□  //cross
 */
 ;
 return ary;
}
function grid(a,w){
 let ary=a,g='０１２３４５６７８９',h=w,ch=0
 for(let i=0;i<ary.length;i++){
  let a=fn.len2pos(i,w),x=a[0],y=a[1]
  ;
  if(y===0||y===h-1){
   if(x%2===0)continue;
   ch=~~(x/2)%10
   ary[i]= g.charAt(ch)
   continue
  }else if(x===0||x===w-1){
   if(y%2===0)continue;
   ch=~~(y/2)%10
   ary[i]=g.charAt(ch)
   continue   
  }
 }
 ;
 return ary;
}
function xrand(_s){
 let _seed=_s||371973300,x=472613715,y=413900530,z=942798599,w=_seed,wk
 ;
 function is(d){return(d||d===0)?true:false}
 function next(){return wk=x^(x<<11),x=y,y=z,z=w, w=(w ^ (w >>> 19)) ^ (wk ^ (wk >>> 8))}  
 ;
 return function random(min,max){
  if(is(min)&&!is(max)) max=min,min=0;
  return (!is(max))?next():min + (Math.abs(next()) % (max + 1 - min));
 }
}
 
})(this);
