/*
Copyright (c) 1997-2002,KeeBoo Corporation. All rights reserved.
Copyright application on progress at the Copyright Office.
This source code is the property of KeeBoo Corporation,
it cannot be reused,modified or published without prior 
written consent from KeeBoo Corporation.
KeeBoo and the KeeBoo logo are trademarks or registered
trademarks of KeeBoo Corporation.
*/

<!--
if (self._KBK_Layer==null) var _KBK_Layer=false
if (_KBK_Layer) { var margin=(_moz?35:0) }
function getKeebooTop(w) {if (w._keebooTopFrameset == 'here') return w;if (w == top) return self;return getKeebooTop(w.parent)}
function keebooTop(){return self}
function KeeBooSticker(i,txt,bg,y,x,w,h){new KBKStkr(i,txt,bg,x,y,w,h)}
function translateLink(linkURL) {document.location.replace(linkURL)}
function KBcss(id){with(this){var e=el(id);return (_ie||_moz)?e.style:e}}
function KBelt(id){with(this){return (_moz?document.getElementById(id):(_ns?document.layers[id]:document.all[id]))}}
function KBmv(x,y,c){with(this){if (ho==null) ho=_ns4?css(i).clip.height:el(i).offsetHeight;x=Math.max(x,5-wo);y=Math.max(y,5-ho);if (_moz) c.left=""+x+"px";else if (_ns) c.left=x;else c.pixelLeft=x;if (_moz) c.top=""+y+"px";else if (_ns) c.top=y;else c.pixelTop=y}}
function KBX(e){return this._ns?e.pageX:event.clientX}
function KBY(e){return this._ns?e.pageY:event.clientY}
function KBoverNSCB(i){if (KBNSdown==0){KBCurr=i;KBold["down"]=document.onmousedown;document.onmousedown=KBdownCB;document.captureEvents(Event.MOUSEDOWN);}}
function KBoutNSCB(e){if (KBNSdown==0){document.onmousedown=KBold.down;KBCurr=null;if (KBold.down==null) document.releaseEvents(Event.MOUSEDOWN);}}
function KBdownCB(e,i){if (i) KBCurr=i;if (KBCurr) with(KBStkrs[KBCurr]){KBNSdown=1;if (typeof(document.onmousemove)!="unknown") KBold["move"]=document.onmousemove;if (typeof(document.onmouseup)!="unknown") KBold["up"]=document.onmouseup;document.onmousemove=KBmoveCB;document.onmouseup=KBupCB;var s=css(i);if (!_ns4){s.filter=""}else document.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);s.zIndex=KBmaxZ+1;KBmaxZ++;xi=xev(e)-xo;yi=yev(e)-yo;return false;}else return true;}
function KBmoveCB(e,fixid)
{
	if (fixid==null&&_KBK_Layer&&_ie&&btn(e)!=1) 
		return false;
	if (fixid||KBCurr)
	{
		with(KBStkrs[fixid?fixid:KBCurr])
		{
			xo=(fixid?xo:xev(e)-xi);if(_KBK_Layer) { xo=Math.max(xo,0);xo=Math.min(xo,winWidth()-wo-margin); }
			yo=(fixid?yo:yev(e)-yi);if(_KBK_Layer) { yo=Math.max(yo,0);yo=Math.min(yo,winHeight()-(ho==null?0:ho)-margin); }
			mv(xo,yo,css(i));
		}
		return false;
	}
	return true;
}
function KBupCB(e){KBNSdown=0;if (KBCurr) with(KBStkrs[KBCurr]){css(i).filter='alpha(opacity=85)';document.onmouseup=KBold.up;document.onmousemove=KBold.move;if (_ns4){if (KBold.up==null) document.releaseEvents(Event.MOUSEUP);if (KBold.move==null) document.releaseEvents(Event.MOUSEMOVE);}else KBCurr=null;}}
var KBStkrs=new Array,KBmaxZ=200,KBCurr;KBold=new Array;KBNSdown=0;
function KBKStkr(i,txt,bg,x,y,w,h)
{
	if (x==null) x=0;if (y==null) y=0;if (w==null) w=200;
	var n=navigator.appName.toLowerCase(),v=navigator.appVersion.toLowerCase(),s;this._ns=(n.indexOf('netscape')>=0)||(n.indexOf('mozilla')>=0);this._ie=!this._ns;	this.xo=x;this.yo=y;this._moz=this._ns&&parseInt(v)>=5;this._ns4=this._ns&&!this._moz;
	this.i=i;this.xi=0;this.yi=0;this.mv=KBmv;this.el=KBelt;this.css=KBcss;this.xev=KBX;this.yev=KBY;KBStkrs[i]=this;this.wo=w;this.ho=h;if (txt=="") txt="&nbsp;";
	var trs=bg.toLowerCase()=="transparent"
	if (this._ns4) s="<layer"+(trs?"":" bgcolor=black")+" class=keebooStickerClassNS id='"+i+"' top='"+y+"' left='"+x+"' height='"+(h==null?1:h)+"' width='"+w+"' z-index="+(KBmaxZ++)+" onMouseOver='KBoverNSCB(\""+i+"\")' onMouseOut='KBoutNSCB(\""+i+"\")'><table border=0 cellspacing=1 width=100% height=100% cellpadding=0><tr valign=top><td align=left'"+(trs?"":" bgcolor='"+bg+"'")+"><span class=keebooStickerClassNSText>"+txt+"</span></td></tr></table></layer>";
	else s="<span  ondragstart='return false' onmousedown='return KBdownCB(event,\""+i+"\")' class=keebooStickerClass id='"+i+"' style='cursor:move;overflow:hidden;position:absolute;top:"+y+"px;left:"+x+"px;height:"+h+"px;width:"+w+"px;z-index:"+(KBmaxZ++)+";background-color:"+bg+";"+(trs?"border-width:0px":"filter:alpha(opacity=85);")+"'>"+txt+"</span>";
	document.write(s);
}
//-->
