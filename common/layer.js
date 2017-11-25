/*
Copyright (c) 1997-2005,KeeBoo Corporation. All rights reserved.
Copyright application on progress at the Copyright Office.
This source code is the property of KeeBoo Corporation,
it cannot be reused,modified or published without prior 
written consent from KeeBoo Corporation.
KeeBoo and the KeeBoo logo are trademarks or registered
trademarks of KeeBoo Corporation.
*/

<!--
var _KBK_Layer=true
var _appName=navigator.appName.toLowerCase(),_appVer=navigator.appVersion.toLowerCase() 
var _ns=(_appName.indexOf('netscape')>=0)||(_appName.indexOf('mozilla')>=0),_ie=!_ns
var _mac=(_appVer.indexOf('macintosh')>=0)||(_appVer.indexOf('macos')>=0),_win=_appVer.indexOf('win')>=0
var _macIE=_ie&&_mac,_macNS=_ns&&_mac,_NULL
var _saf=(_appVer.indexOf('safari')>=0)
if ( _saf )
	if ( _appVer.match( /safari\/(.*)/ ) )
		if ( RegExp.$1 > 85 ) 
			_saf = false
var _ie4=_ie&&(_appVer.indexOf("msie 4")>0),_moz=_ns&&parseInt(_appVer)>=5,_ns4=_ns&&!_moz
var _opera=(window.opera!=null?true:false);
var _show=(_ie||_moz)?'visible':'show',_hide=(_ie||_moz)?'hidden':'hide',_alt=(_macIE||_moz)?"title":"alt",_hand=_ie?"hand":"pointer"
var _imgcss=!_ns4&&!(_ie4&&_macIE)
var _tipWidth=null,_doc=document
var _ieVer=4
if (_ie)
{
	var tab = _appVer.split(';')
	for ( var i=0; i<tab.length; i++ )
		if ( tab[i].match( /msie (.*)/ ) )
		{
			_ieVer = RegExp.$1
			break;
		}
}
function testStr(s){return s&&s!=""}
function f1(){ return new Array('¢','£','¤','¥','¦','§','¨','©','ª','«','¬','­','®','¯','°','±','²','³','´','µ','¶','·','¸','¹','º','»','¼','½','¾','¿','À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','×','Ø','Ù','Ú','Û','Ü','Ý','Þ','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','÷','ø','ù','ú','û','ü','ý','þ','ÿ')}
var arrConv,arrOld
if (_ns4) {arrOld=f1();eval(f1.toString());arrConv=f1()}
function convStr(str,allowHTML)
{
	if (str==null||str==false||str=="") return ""
	var strOut="",c
	if (arrConv) 
		for (var i in arrConv) 
		{
			var re = new RegExp(arrConv[i],"g")
			str=str.replace(re,arrOld[i])
		}
	
	for (i=0;i<str.length;i++)
	{
		c=str.charAt(i)
		if (!allowHTML)
		{
			if (c=="<") c="&lt;"
			if (c==">") c="&gt;"
			if (c=="&") c="&amp;"
			if (c=="'") c="&#39;"
		}
		strOut+=c
	}
	return strOut
}
function setCrs(c,id){if (_ie||_moz){var css=layerCSS(id);if (css) css.cursor=c}}
function eventGetX(e){return _ns?e.pageX:event.x}
function eventGetY(e){return _ns?e.pageY:event.y}
function winHeight(win)
{
	if ( win == null ) win = window
	return _ns?win.innerHeight+(_ns4&&_win?4:0):win.document.body.clientHeight
}
function winWidth(win)
{
	if ( win == null ) win = window
	return _ns?(win.innerWidth-2)+(_ns4&&_win?6:0):win.document.body.clientWidth
}
function attr(name,val){return val!=_NULL?" "+name+"='"+val +"'":""}
function sty(name,val){return (val!=_NULL?name+":"+val +";":"")}
function st(fg,bg,ff,fs,fw,bw,bs,bc){return sty("background-color",bg)+sty("color",fg)+sty("font-family",ff)+sty("font-size",fs?fs+"px":fs)+sty("font-weight",fw)+sty("border-width",bw?bw+"px":bw)+sty("border-style",bs)+sty("border-color",bc)}
function wri(s) { document.write(s); }
function getImg(src,w,h,align,att){return "<IMG src='"+src+"' border=0 vspace=0 hspace=0 "+attr("width",w)+attr("height",h)+attr("align",align)+(att?att:"")+">"}
function box(w,h,att,crs,st){att=att!=null?att:"";if (st!=null) att+=" style='+crs+st'"; 
if (_macIE )
	return getImg(_neu+"menu_pixel.gif?"+Math.random(),w,h,_NULL,att)
else
	return getImg(_neu+"menu_pixel.gif",w,h,_NULL,att)
	
}
function table(cls,att){return "<table "+attr("class",cls)+(att?att:"")+" cellspacing=0 cellpadding=0 border=0>"}
function layerCSS(id,f){var e=layerElem(id,f);return e?((_ie||_moz)?e.style:e):_NULL}

var nestRefArray = new Array()
var refArray = new Array()
var elObj = new Object
function layerElem(id,f)
{
	var obj = elObj[id]
	if(obj==null) 
	{
		obj=DOMElem(id,f)
		elObj[id]=obj
	}
	return obj
}
function DOMElem(id,f)
{
	f=f?f:self;
	if (id==_NULL) return null
	if (_ns4)
	{
		if ( nestRefArray[f.location.href] == null )
			nestRefArray[ f.location.href] = new Array()
		var divname = nestRefArray[f.location.href][id]
		if ( divname == null )
		{
			nestRefArray[f.location.href] = new Array()
			refArray = new Array()
			refArray.i = 0
			layerElemInit(null,f)
		}	
		divname = nestRefArray[ f.location.href][id]
		if (divname && divname!='')
		{
			if ( divname.lastIndexOf('.') != -1 )
			{
				divname = divname.slice(divname.lastIndexOf('.')+1)
			}
			f = layerElem(divname)
		}
	}
	return (_moz?f.document.getElementById(id):(_ns?f.document.layers[id]:f.document.all[id]))
}
function layerElemInit(nestref,f) 
{
	var ref
	if ( _ns4 ) 
	{
		if ( f == null ) f = self
		if ( nestref ) 
			ref = eval('f.document.'+nestref+'.document')
		else 
		{
			nestref = ''; ref = f.document;
		}
		for (var i=0; i<ref.layers.length; i++) 
		{
			var divname = ref.layers[i].name
			if ( divname && !divname.match(/^nsl/))
			{
				nestRefArray[f.location.href][divname] = nestref
				if (ref.layers[i].document.layers.length > 0) 
				{
					refArray[refArray.length] = (nestref=='')? ref.layers[i].name : nestref+'.document.'+ref.layers[i].name
				}
			}
		}
		if (refArray.i < refArray.length) 
		{
			layerElemInit(refArray[refArray.i++],f)
		}
	}
	return true
}
function zindexLayer(zindex,id,f) { var c=layerCSS(id,f); if(c) c.zIndex = zindex; }
function showLayer(show,id,f){showLayerCSS(show,layerCSS(id,f))}
function showLayerCSS(show,c){if (c) c.visibility=show?_show:_hide}
function showLayers(){var a=showLayers.arguments;for(var i=1;i<a.length;i++) showLayer(a[0],a[i])}
function setClipRect(css,x1,y1,x2,y2){if (_ns4){var c=css.clip;c.top=y1;c.left=x1;c.bottom=y2;c.right=x2}else css.clip = "rect("+y1+"px "+x2+"px "+y2+"px "+x1+"px)";}
function resizeLayerCSS(css,w,h){w=Math.max(0,w);h=Math.max(0,h);if(css){setClipRect(css,0,0,w,h);css.width=w;css.height=h}}
function resizeLayer(id,w,h){resizeLayerCSS(layerCSS(id),w,h)}
function changeUrl(w,u){w.location.replace(u)}
function getFrame(name,par){
	var w=par?par:((window==top)?window.parent:self);
	for (var i=0; i<w.frames.length; i++) {
		if (w.frames[i].name == name) return w.frames[i];
	}
	return null
}
function frameWidth(f){return parseInt(_ns?f.innerWidth+(_ns4&&_win?4:0):f.document.body.clientWidth)}
function frameHeight(f){return parseInt(_ns?f.innerHeight+(_ns4&&_win?4:0):f.document.body.clientHeight)}
function mozInsertHTMLBefEnd(id,s){var e=_doc.getElementById(id),r=_doc.createRange();r.setStartBefore(e);var fr=r.createContextualFragment(s);e.appendChild(fr)}
function insBeforeEnd(id,s){if (_moz) mozInsertHTMLBefEnd(id,s);if (_ie) layerElem(id).insertAdjacentHTML("BeforeEnd",s)}
function layerWidth(id) { var e=layerElem(id);return (_ie||_moz)?e.offsetWidth:e.clip.width } 
function layerHeight(id) { var e=layerElem(id);return (_ie||_moz)?e.offsetHeight:e.clip.height } 
function btn(ev){return _ns?(ev?ev.which:0):event.button}
function lyr(x,y,inner,att,show,id,w,h)
{
	var vis=(show==_NULL?_NULL:(show?_show:_hide));att=att?att:""
	if (_ns4) return "<LAYER "+att+attr("id",id)+attr("width",w)+attr("height",h)+attr("left",x)+attr("top",y)+attr("visibility",vis)+">"+inner+"</LAYER>"
	var tag = (_moz?'div':'div')
	return "<"+tag+" "+att+attr("id",id)+" style='position:absolute;"+sty("width",w)+sty("height",h)+sty("left",x)+sty("top",y)+sty("visibility",vis)+"'>"+inner+"</"+tag+">"
}
function imgLyr(src,x,y,attrib,show,id,alt)
{
	attrib=(attrib==_NULL)?'':attrib;id=attr("id",id)	
	if (show!=_NULL) show=(show?_show:_hide)
	if (_ns&&!_moz) return '<layer '+attr('visibility',show)+id+' left='+x+' top='+y+'><img src="'+src+'"'+attrib+attr(_alt,alt)+'></layer>'
	else return '<img '+id+attr(_alt,alt)+' style="position:absolute;left:'+x +';top:'+y+';'+sty('visibility',show)+'" src="'+src+'"'+attrib +'>'
}
function moveLayer(id,x,y){ moveLayCSS(layerCSS(id),x,y); }
function moveLayCSS(c,x,y)
{
	if(c==null) return
	if (x!=_NULL)
	{
		if (_moz) c.left=""+x+"px"
		else if (_ns) c.left=x
		else c.pixelLeft=x
	}
	if (y!=_NULL)
	{
		if (_moz) c.top=""+y+"px"
		else if (_ns) c.top=y
		else c.pixelTop=y
	}
}

function moveLayers() { var a=moveLayers.arguments,l=a.length; if(l>2) for(var i=0;i<l-2;i++) moveLayer(a[i],a[l-2],a[l-1]) }
function reWriteLayer(str,id,istext)
{
	var e=layerElem(id)
	if (!e) { return; }
	if (_ie) { if (istext==true) e.innerText=str; else e.innerHTML=str}
	else if (_moz) e.innerHTML=str;
	else { e.document.write(str);e.document.close(); }
}
var debug = true 
function rImg(u,id,w,h,dx,dy,cb,tip,inr,st,clss,att)
{
	if (dx!=-1&&dy!=-1) 
	{
		var offy=0
		if ( _saf )
		{
			var t = u.substr(0,u.length-4).split("/");
			if ( t.length )
			{
				var img = t[t.length-1]		
				switch( img )
				{
					case "notile":
					case "menucorners":
						offy = eval( "gui."+img+".h" );
					break;
				}			
			}
		}
		if ( offy )
			return '<div '+(att?att:'')+(clss?' class="'+clss+'"':'')+' id="'+id+'" '+attr("onclick",cb)+attr("title",tip)+' style="font-size:1px; position:absolute; '+sty("cursor",(cb?_hand:null))+'background-image:url('+u+');width:'+w+'px;height:'+h+'px;'+'background-position:'+((-1)*dx)+'px '+(h-(offy-dy))+'px;'+(st?st:"")+'">'+(inr?inr:"")+'</div>';
		else
			return '<div '+(att?att:'')+(clss?' class="'+clss+'"':'')+' id="'+id+'" '+attr("onclick",cb)+attr("title",tip)+' style="font-size:1px; position:absolute; '+sty("cursor",(cb?_hand:null))+'background-image:url('+u+');width:'+w+'px;height:'+h+'px;'+'background-position:'+((-1)*dx)+'px '+((-1)*dy)+'px;'+(st?st:"")+'">'+(inr?inr:"")+'</div>';
	}
	else 
	{
		if (u.match(/^file/)) u=u.substring(7)
		return '<div '+(att?att:'')+(clss?' class="'+clss+'"':'')+' id="'+id+'" '+attr("onclick",cb)+attr("title",tip)+' style="font-size:1px; position:absolute; '+sty("cursor",(cb?_hand:null))+'width:'+w+'px;height:'+h+'px;'+(st?st:"")+'">'+(inr?inr:"")+'</div>';
	}
}
function layr(x,y,w,h,dx,dy,id,vis,att,inr)
{
	att=(att==null?"":att);inr=(inr==null?"":inr)
	vis=attr("visibility",(vis==null?_show:(vis?_show:_hide)))
	return '<layer '+att+' ' +vis+' id="'+id+'" width="'+w+'" height="'+h+'" left="'+(x-dx)+'" top="'+(y-dy)+'" clip="'+dx+','+dy+','+(dx+w)+','+(dy+h)+'">'+inr+'</layer>'
}
function absImg(u,id,x,y,w,h,dx,dy,cb,tip,inr,st,att,vis)
{
	att=(att==null?"":att);inr=(inr==null?"":inr)
	if (_ns4)
	{
		if (dx==-1||dy==-1)
			return layr(x,y,w,h,0,0,id,true,att,layr(0,0,screen.width,screen.height,0,0,id+'inr',vis,'',null)+inr)
		else
		{
			if (u.match(/^file/)) u=u.substring(7)
			return layr(x,y,w,h,0,0,id,true,att,layr(-dx,-dy,screen.width,screen.height,0,0,id+'inr',vis,' background="'+u+'" ',null)+inr)
		}
	}
	else
		return rImg(u,id,w,h,dx,dy,cb,tip,inr,'clip:rect(0px '+w+'px '+h+'px 0px);position:absolute;left:'+x+'px;top:'+y+'px;'+(st?st:''),null,att)
}
function skinImg(u,id,x,y,w,h,dx,dy,cb,tip,inr,st,att)
{
	if(u.match(/^(.*):(.*)/)==null&&u.match(/^\//)==null) u=_neu+u; 
	return absImg(u,id,x,y,w,h,dx,dy,cb,tip,inr,st,att)
}
function getTipHTML(id)
{
	var s
	if (_ie4&&_win) s="<div id='%1' style='width:1px;visibility:%2;position:absolute;left:0;top:0;"+(_tipWidth!=null?"width:%3":"")+"'></div>"
	else if (_ns4) s="<layer id ='%1' visibility=%2 left=0 top=0 "+(_tipWidth!=null?"width=%3":"")+"></layer>"
	else s="<div id='%1' style='visibility:%2;z-index:1000;position:absolute;left:0;top:0;"+(_tipWidth!=null?"width:%3":"")+"'></div>"
	return formatString(s,id,_hide,_tipWidth)
}
function showTip(id,str,x,y)
{
	reWriteLayer(str,id)
	if (_macIE||(_ie&&!_ie4))
	{
		x+=_doc.body.scrollLeft;y+=_doc.body.scrollTop
	}
	y+=_ieVer<5.5?5:20;x+=15
	if (!_moz)
	{
		var xRel=x-(_ns?self.pageXOffset:_doc.body.scrollLeft),yRel=y-(_ns?self.pageYOffset:_doc.body.scrollTop),newXrel=Math.max(0,Math.min(xRel,winWidth()-layerWidth(id))),height=layerHeight(id)
		x=x+newXrel-xRel;if ((yRel+height)>winHeight()) y=y-40-height
	}
	moveLayer(id,x,y);showLayer(true,id)
}

function hideTip(id){showLayer(false,id);moveLayer(id,0,0);if (_moz) reWriteLayer("",id)}

function corner(side,white)
{
	var w=(white?14:8),h=((white&&((side=="botleft")||(side=="botright")))?10:7);aln=(side.indexOf("right")>=0?"right":"left");
	if (_imgcss)
	{
		var x=(white?-32:0),ofs=(white?14:8);
		switch(side)
		{
			case "topright":x-=ofs;break;
			case "botleft":x-=(ofs*2);break;
			case "botright":x-=(ofs*3);break;
		}
		if ( _saf )
			offy = h-gui.menucorners.h;
		else
			offy = 0;
		return getImg(_neu+"menu_pixel.gif",w,h,aln,' style="background-image:url('+_neu+'menucorners.gif);background-position:'+x+'px '+offy+';"')
	}
	else return getImg(_neu+"corner"+(white?"white":"")+"_"+side+".gif",w,h,aln)
}

function frameimg(valign,halign)
{
	var w=0,h=0,g=gui.imgframe,isbg=false
	switch(valign)
	{
		case "t":
			h=g.th;
		break;
		case "m":
			isbg=true;
		break;
		case "b":
			h=g.bh
		break;
	}
	switch(halign)
	{
		case "l":
			w=g.lw;
		break;
		case "c":
			isbg=true;
		break;
		case "r":
			w=g.rw
		break;
	}
	if (isbg)
		return '<td background="'+_neu+valign+halign+'frame.gif">'+box(w,h)+'</td>'
	else
		return '<td>'+getImg(_neu+valign+halign+"frame.gif",w,h)+'</td>'
}

function formatString()
{
	if (formatString.arguments.length==0) return null
	var s=formatString.arguments[0]
	for(i=1;i<formatString.arguments.length;i++) s=s.replace(new RegExp("%"+i,"g"),formatString.arguments[i])
	return s.replace(new RegExp("%%","g"),"%")
}

function FriendlyLayer(id,show,x,y,w,h,inner,att,st)
{
	if (show!=null) show=(show?_show:_hide);
	if (_ns4) return "<LAYER "+att+attr("visibility",show)+attr("CLIP","0,0,"+w+","+h)+attr("id",id)+attr("left",x)+attr("top",y)+attr("width",w)+attr("height",h)+">"+inner+"</LAYER>"
	else return "<div "+att+attr("id",id)+" style='position:absolute; overflow:hidden; "+st+" "+sty("visibility", show)+sty("left",""+x+"px")+sty("top",""+y+"px")+sty("width", ""+w+"px")+sty("height",""+h+"px")+"'>"+inner+"</div>"
}

function cBox(id,x,y,w,h,c){if (_ns4) return "<LAYER "+attr("id",id)+attr("BGCOLOR",c)+attr("CLIP","0,0,"+w+","+h)+attr("left",x)+attr("top",y)+attr("width",w)+attr("height",h)+"></LAYER>";else return "<div "+attr("id", id)+" style='position:absolute;overflow:hidden;background-color:"+c+"; "+sty("left",""+x+"px")+sty("top",""+y+"px")+sty("width",""+w+"px")+sty("height",""+h+"px")+"'></div>";}
function DBox(id,x,y,w,h,cUp,cDwn,show){return lyr(x,y,cBox(id+"_1",0,0,1,h,cUp)+cBox(id+"_2",0,0,w,1,cUp)+cBox(id+"_3",1,h,w,1,cDwn)+cBox(id+"_4",w,0,1,h,cDwn),"",show,id,w,h)}

function ClipImage(id, image, doc_x, doc_y, img_w, img_h, clip_x, clip_y, att, img_att) 
{
	if (_ns4) return	"<LAYER ID='"+id+"' CLIP='"+clip_x+","+clip_y+","+(clip_x+img_w)+"," + (clip_y+img_h)+"' "+attr("left",doc_x)+attr("top",doc_y)+attr("width",img_w)+attr("height",img_h)+"><img id='IMG_"+id+"' name='IMG_"+id+"' src='"+image+"' "+img_att+"></LAYER>"
	else return	"<div ID='"+id+"' STYLE='clip:rect("+clip_y+"px "+(clip_x+img_w)+"px "+(clip_y + img_h)+"px "+clip_x+"px); position:absolute;"+sty("left",doc_x)+sty("top",doc_y)+sty("width",img_w)+sty("height", img_h)+"'><img id='IMG_"+id+"' name='IMG_"+id+"' src='"+image+"' "+img_att+"></div>"
}
function getCookie(name)
{
	var cname=name+"=",dc=document.cookie
	if (dc.length > 0) 
	{
		var beg=dc.indexOf(cname)
		if (beg!=-1)
		{
			beg+=cname.length
			var end=dc.indexOf(";",beg)
			if (end==-1) end=dc.length
			return unescape(dc.substring(beg,end))
		}
	}
	return null
}
function setCookie(name,value,nbDay) 
{
	var d=new Date(),exp=new Date(d.getTime()+nbDay*24*60*60*1000)
	document.cookie=name+"="+escape(value)+"; path=/"+((exp==null)?"":";expires="+exp.toGMTString())
}
function trLnk(id,w,h,cb,overcb,outcb,downcb,upcb)
{
	var clickhdl = (cb==null?"":" onclick='"+cb+"'")
	var overhdl = (overcb==null?"":" onmouseover='"+overcb+"'")
	var outhdl = (outcb==null?"":" onmouseout='"+outcb+"'")
	var downhdl = (downcb==null?"":" onmouseout='"+downcb+"'")
	var uphdl = (upcb==null?"":" onmouseout='"+upcb+"'")
	s="<a 'onfocus=this.blur()' href='javascript:void(0)' "+clickhdl+overhdl+outhdl+downhdl+uphdl+">"+box(w,h,null,_hand)+"</a>"
	return s
}

function bordPat(id,u,dx,dy) 
{
	if (_ns4) return
	var css=layerCSS(id)
	if (css!=null)
	{
		if(u&&(u!="")) { 
			css.backgroundImage='url('+u+')'
			css.backgroundPosition=''+(dx==null?0:dx)+'px'+' '+(dy==null?0:dy)+'px'
		}
		showLayer(u,id)
	}
}
function bordCol(id,col,hide)
{
	var css=layerCSS(id)
	if (css!=null)
	{
		if (col!=null&&col!="")
			if(_ns4) css.bgColor=col; else css.backgroundColor=col;
		showLayer(!hide&&(col!=null),id)
	}
}

var x0,x1,x2,x3,x4,x5,x6,x7,x8
var x0t,x1t,x2t,x3t,x4t,x5t,x6t,x7t
var x0b,x1b,x2b,x3b,x4b,x5b,x6b,x7b
var y1,y2,yp,hp,yt,h1
var wb=0,hb=0,ww,wh,lb,tb
var wL,wR,xL,xR
function GetGlobalSizes(book, win)
{
	ww=winWidth(win); wh=winHeight(win)
	lb=(book.l==null?1:book.l)
	rb=(book.r==null?1:book.r)
	tb=(book.t==null?1:book.t)
	bb=(book.b==null?1:book.b)

	if ( book.centered && book.w && book.h )
	{
		wb=(book.w==null?Math.max(ww-(lb+rb),0):book.w);
		hb=(book.h==null?Math.max(wh-(tb+bb),0):book.h);
		lb=Math.max( 0, (ww-wb)/2 )
		tb=Math.max( 0, (wh-hb)/2 )
		rb=ww-lb
		bb=wh-tb
	}
	else
	{
		wb=(book.w==null?Math.max(ww-(lb+rb),0):book.w);
		hb=(book.h==null?Math.max(wh-(tb+bb),0):book.h);
	}
	
	with(gui)
	{
		if (wb<minw) wb=minw
		if (hb<minh) hb=minh
	
		var out = lm+kmid.lw+kmid.mw+kmid.rw+rm

		//w1=(_Book.mode==1?Math.max(0,ktop.lw-lm+(ktop.mw-kmid.mw)/2,kbot.lw-lm+(kbot.mw-kmid.mw)/2):Math.floor((wb-out)/2))
		w1=Math.floor((wb-out)/2)
		w2=wb-out-w1
	
		x0=lb+lm-Math.min(bgceil.lw,bgmid.lw,bgbase.lw); x1=lb+lm; x2=x1+kmid.lw; 
		x0t=x0; x1t=x1; x2t=x1t+ktop.lw; 
		x0b=x0; x1b=x1; x2b=x1b+kbot.lw; 

		x3=x2+w1; x4=x3+kmid.mw; x5=x4+w2; x6=x5+kmid.rw; 
		x3t=x3-(ktop.mw-kmid.mw)/2; x4t=x3t+ktop.mw; x5t=x6-ktop.rw; x6t=x6;
		x3b=x3-(kbot.mw-kmid.mw)/2; x4b=x3b+kbot.mw; x5b=x6-kbot.rw; x6b=x6;
		
		x8=x6+Math.min(bgceil.rw,bgmid.rw,bgbase.rw);
		x7t=x8-bgceil.rw;
		x7b=x8-bgbase.rw;
		x7=x8-bgmid.rw;

		y1=tb+ceil.h;y2=y1+Math.max(0,hb-(ceil.h+base.h+(toolbar.show?toolbar.h:0)));h1=y2-y1;
		
		var showTitle=(book.titleVis!=false)
		//yt=(showTitle?y1-(ceil.h-titles.t):sh);yp=y1-(showTitle?0:(ceil.h-titles.t)); hp=h1+(showTitle?0:(ceil.h-titles.t))+8
		yt=(showTitle?y1-fill.ch:sh);yp=y1-(showTitle?0:fill.ch); hp=h1+(showTitle?0:fill.ch)+fill.bh
		wL=w1,xL=(_Book.mode==2?x2:sw)
		wR=(_Book.mode==2?w2:w1+kmid.mw+w2); xR=(_Book.mode==2?x4:x2)
	}
}

function GetParams() {
var requete = unescape(window.location.search.substring(1));
var elements = requete.split("&");
var pp=new Object();
for(i = 0; i < elements.length; i++) {
  temp = elements[i].split("=");
  pp[temp[0]]=unescape(temp[1]);
}
return pp;
}

var SL=showLayer,SLS=showLayers,ML=moveLayer,MLS=moveLayers,RL=resizeLayer,WL=reWriteLayer,ZI=zindexLayer,SK=skinImg,SCR=setClipRect
//-->