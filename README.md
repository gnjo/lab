# lab
20x20 maze maker
```
//usage

let is={}
is.wall
is.door
is.doorkey
is.doorsec
is.road
is.icon
is.wallable=is.wall&&is.door&&is.doorkey&&is.doorsec
;
let boxsize=10
let mm=new Mesher(boxsize)
let getPos=(f,x,y,flg)=>{
 let a=flg?boxsize:0
 return new THREE.Vector3(x*boxsize,-f*boxsize*2+a,y*boxsize)
}
let f00=lab(seed,roomnum,wallrate,doorrate)
let iw=20,f=0,x,y
let url='https://gnjo.github.io/mock3d/wall/red2-min.jpg'
let ftex=(val)=>{
 if(is.wall(val))return tex(url,0)
 if(is.door(val))return tex(url,1)
 if(is.doorkey(val))return tex(url,2)
 if(is.doorsec(val))return tex(url,3)
 if(is.road(val))return void 0
}
let gr=new THREE.Group()
f00.data.map((d,i)=>{
 x=i%iw,y=~~(i/iw)
 
 let box1=mm.make({
  n:ftex(d.n),
  e:ftex(d.e),
  w:ftex(d.w),
  s:ftex(d.s),
  g:tex(url,0)
 },'box')
  box1.position.copy(getPos(f,x,y))
  gr.add(box1)
 let box2=mm.make({
  n:is.wallable(d.n)?tex(url,0):void 0,
  e:is.wallable(d.e)?tex(url,0):void 0,
  w:is.wallable(d.w)?tex(url,0):void 0,
  s:is.wallable(d.s)?tex(url,0):void 0,
  g:void 0
 },'tall')
  box2.position.copy(getPos(f,x,y,'tall'))
  gr.add(box2)
 if(is.icon(d.g)){
  let icon=mm.make({i:tex(d.g,1,64)},'icon')
  icon.position.copy(getPos(f,x,y))
  gr.add(icon)
 }
 
 
})

```
