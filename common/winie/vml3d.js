var step = -2
var tempo = 25
var nbsteps = 16
function fw(n) { return (1-(Math.exp(((n+1)*(n+1))/((nbsteps+1)*(nbsteps+1)))-1)/(Math.exp(1)-1)); }
function fh(n) { return Math.log(n+1)/Math.log(nbsteps+1); }
var moves = new Array()
for (var i=0; i<nbsteps; i++)
	moves[moves.length] = [fw(i),fh(i),tempo]	

var right,left
var changeside = false
var _offset = 3
var timeLeft=0
var toAnim
var fullwidth

var m=1,MiddleAnimWidth=10,MiddleAnimHeight=7,BackAnimWidth=30,BackAnimHeight=10
var ah=0
var _lpg,_rpg,_olpg,_orpg

function animTimeLeft() { return (mleft||mright?timeLeft:0); }
function animTimeMinDuration() { return tempo*(2*nbsteps)/1000; }

function startRight(offset,lpg,rpg,olpg,orpg)
{
	_offset = offset
	_orpg=book.pages[orpg]
	_rpg=book.pages[rpg]
	_olpg=book.pages[olpg]
	_lpg=book.pages[lpg]
	right = true
	left = false
	changeside = false
	timeLeft = (2*nbsteps+1)*tempo

	setPageNumSide(f_rightpage.id,"right",_Book.page+1)
	setPageNumSide(mf_rightpage.id,"right",_Book.page-1)
	setPageNumSide(f_leftpage.id,"left",_Book.page-2)
	setPageNumSide(mf_leftpage.id,"left",_Book.page)
	
	if (_ieVer < 5.5 || 1)	moveLayer(f_rightpage.id,sw,sh)
	resizeLayer(f_rightpage.id,w2,hp)
	resizeIframe(f_rightpage.id,w2,hp,!IframeIsFixed(_orpg))
	loadIframe(f_rightpage,getPageRealUrl('right'))
			
	resizeLayer(mf_leftpage.id,1,1)
	loadIframe(mf_leftpage,getPageRealUrl('left'))

	colorAnim("right",true)
	moveRightPage()
}
function moveRightPage()
{
	if(_Book.mode == 1)
	{
		timeLeft=0
		resizeLayer(mf_rightpage.id,1,1)
		moveLayer(mf_rightpage.id,x4,yp)
		resizeLayer(f_rightpage.id,w2,hp)
		moveLayer(f_rightpage.id,x4,yp)
		moveLastRight()
		_Book.refresh("pagemode")
	}
	timeLeft-=tempo
	if (! mright) return
	if (step>=moves.length) step = moves.length-1
	if (step<0) step=0
	if (moves[step])
	{
		var t=moves[step][2]
		WritePage(moves[step][0],moves[step][1])
		if (step==1) 
		{
			updateSurroundAnim("right")
			if (_ieVer >= 5.5 && 0)
			{
				moveLayer(f_rightpage.id,sw,sh)
				moveIframe(f_rightpage.id,0,0)
				resizeIframe(f_rightpage.id,w2,hp)
				resizeLayer(f_rightpage.id,w2,hp)
				moveLayer(f_rightpage.id,x4,yp)
			}
		}
		if (right && ++step<moves.length)
		{
			toAnim = setTimeout("moveRightPage()", t)
			return
		}
	
		right = false
		if (changeside)
		{
			if (_ieVer < 5.5 || 1)
			{
				moveIframe(f_rightpage.id,0,0)
				resizeIframe(f_rightpage.id,w2,hp)
				resizeLayer(f_rightpage.id,w2,hp)
				moveLayer(f_rightpage.id,x4,yp)
				moveLayer(f_leftpage.id,sw,sh)
			}
			colorAnim("left")
			changeside = false
		}
		if (! left)
		{
			left = true
			changeside = true
		}
							
		if (left && --step>=0)
			toAnim = setTimeout("moveRightPage()",t)
		else
			toAnim = setTimeout("moveLastRight()",t)
	}
}
function moveLastRight(force)
{
	if (! mright) return
	if (toAnim) { clearTimeout(toAnim); toAnim=null }
	endAnim()

	if (!force)
	{
		updateNavigation()

		resizeIframe(f_rightpage.id,w2,hp)
		resizeLayer(f_rightpage.id,w2,hp)
		moveIframe(f_rightpage.id,0,0)
		moveLayer(f_rightpage.id,x4,yp)
	}

	step = -2
	var tmp = f_leftpage
	f_leftpage = mf_leftpage
	mf_leftpage = tmp	
	
	if (!force)
	{
		resizeLayer(f_leftpage.id,w1,hp)
		resizeIframe(f_leftpage.id,w1,hp)
		moveIframe(f_leftpage.id,0,0)
		moveLayer(f_leftpage.id,x2,yp)
	}

	resizeLayer(mf_leftpage.id,1,1)
	moveLayer(mf_leftpage.id,sw,sh)
	loadIframe(mf_rightpage,null)
	loadIframe(mf_leftpage,null)
	
	if (force) updateSurroundAnim("right")
	updateSurroundAnim("left")

	right=left=mright=false
}
function startLeft(offset,lpg,rpg,olpg,orpg)
{
	_orpg=book.pages[orpg]
	_rpg=book.pages[rpg]
	_olpg=book.pages[olpg]
	_lpg=book.pages[lpg]
	_offset = offset
	right = false
	left = true
	changeside = false
	timeLeft = (2*nbsteps+1)*tempo

	setPageNumSide(f_rightpage.id,"right",_Book.page+3)
	setPageNumSide(mf_rightpage.id,"right",_Book.page+1)
	setPageNumSide(f_leftpage.id,"left",_Book.page)
	setPageNumSide(mf_leftpage.id,"left",_Book.page+2)

	if (_ieVer < 5.5 || 1)	moveLayer(f_leftpage.id,sw,sh)
	resizeLayer(f_leftpage.id,w2,hp)
	resizeIframe(f_leftpage.id,w1,hp,!IframeIsFixed(_olpg))
	loadIframe(f_leftpage,getPageRealUrl('left'))
			
	resizeLayer(mf_rightpage.id,1,1)		
	loadIframe(mf_rightpage,getPageRealUrl('right'))

	colorAnim("left",true)
	moveLeftPage()
}
function moveLeftPage()
{
	if(_Book.mode == 1)
	{
		timeLeft=0
		resizeLayer(mf_leftpage.id,1,1)
		moveLayer(mf_leftpage.id,sw,sh)
		resizeLayer(f_leftpage.id,w1,hp)
		moveLayer(f_leftpage.id,sw,sh)
		moveLastLeft()
		_Book.refresh("pagemode")
	}
	timeLeft-=tempo
	if (! mleft) return
	if (step>=moves.length) step = moves.length-1
	if (step<0) step=0
	if (moves[step])
	{
		var t=moves[step][2]
		WritePage(moves[step][0],moves[step][1])	
		if (step==1) 
		{
			updateSurroundAnim("left")
			if (_ieVer >= 5.5 && 0)
			{
				moveLayer(f_leftpage.id,sw,sh)
				moveIframe(f_leftpage.id,0,0)
				resizeIframe(f_leftpage.id,w1,hp)
				resizeLayer(f_leftpage.id,w1,hp)
				moveLayer(f_leftpage.id,x2,yp)
			}
		}
		if (left && ++step<moves.length)
		{
			toAnim = setTimeout("moveLeftPage()",t)
			return
		}		
		left = false
		if (changeside)
		{
			if (_ieVer < 5.5 || 1)
			{
				moveIframe(f_leftpage.id,0,0)
				resizeIframe(f_leftpage.id,w1,hp)
				resizeLayer(f_leftpage.id,w1,hp)
				moveLayer(f_leftpage.id,x2,yp)
				moveLayer(f_rightpage.id,sw,sh)
			}
			colorAnim("right")
			changeside = false
		}
		if (! right)
		{
			right = true
			changeside = true
		}
		if (right && --step>=0)
			toAnim = setTimeout("moveLeftPage()",t)
		else
			toAnim = setTimeout("moveLastLeft()",t)
	}
	else
		mleft = false
}
function moveLastLeft(force)
{
	if (! mleft) return
	if (toAnim) { clearTimeout(toAnim); toAnim=null }
	endAnim()
	if (!force)
	{
		updateNavigation()

		resizeIframe(f_leftpage.id,w1,hp)
		resizeLayer(f_leftpage.id,w1,hp)
		moveIframe(f_leftpage.id,0,0)
		moveLayer(f_leftpage.id,x2,yp)
	}
	step = -2
	resizeIframe(f_leftpage.id,w1,hp)
	var tmp = f_rightpage; f_rightpage = mf_rightpage; mf_rightpage = tmp;
	if (!force)
	{
		resizeLayer(f_rightpage.id,w2,hp)
		resizeIframe(f_rightpage.id,w2,hp)
		moveIframe(f_rightpage.id,0,0)
		moveLayer(f_rightpage.id,x4,yp)
	}
	loadIframe(mf_rightpage,null)
	loadIframe(mf_leftpage,null)
	resizeLayer(mf_rightpage.id,1,1)
	moveLayer(mf_rightpage.id,sw,sh)
	if (force) updateSurroundAnim("left")
	updateSurroundAnim("right")
	right=left=mleft=false
}
debug = true
function mydebug(str)
{
	if (debug) 
	{
		debug = false
		alert(str)
	}
}
function WritePage(pw, ph)
{
	var h=Math.floor(ph*gui.anim.h)
	var innerw = Math.max(w1,w2)
	var h=Math.ceil(ph*innerw/10)
	if (right)
	{
		w=Math.floor(pw*(gui.kmid.mw/2-gui.fill.mrcb+innerw+gui.fill.rcb))
		moveAnim(x4-gui.kmid.mw/2)
		redrawAnim(w,h)
	}	
	if (left)
	{
		w=Math.floor(pw*(gui.kmid.mw/2-gui.fill.mlcb+innerw+gui.fill.lcb))	
		moveAnim(x4-gui.kmid.mw/2)
		redrawAnim(-w,h)
	}
}
function setFillColor(dom,id,c) { var f=dom.all["a"+id+"F"]; with(f) { type = "solid"; color = c; } }
function setFillPattern(dom,id,url) { var f=dom.all["a"+id+"F"]; with(f) { type="tile"; src=url; aspect="atleast"; alignshape="False"; origin="0,0"; position="0,0"; } }
function setAnimPath(dom,id,path) { var p=dom.all["a"+id+"P"]; p.v = path }
function setAnimClass(dom,id,cls) { var el=dom.all["a"+id]; el.className = cls }
function getAnimPath(x,y,w,h,pos)
{
	var g=gui.anim, s = ""
	if (w != 0)
	{
		var fw = .20;
		var w0 = (-1)*(Math.abs(_offset)/_offset) * Math.max(0 , Math.floor(fw * fullwidth * (1 - Math.abs(w)/fullwidth)))
	
		switch(pos)
		{
			case "full":
			case "middle":
				s+=" m "+x+" "+y
				if ((mright&&right) || (mleft&&left))
					s+=" c "+(x-w0)+","+y+", "+(x+w+w0)+","+(y-h)+", "+(x+w+w0)+","+(y-h)
				else
					s+=" c "+(x)+","+(y-h)+", "+(x+w+w0)+","+(y-h)+", "+(x+w+w0)+","+(y-h)
				s+=" c "+(x+w)+","+(y-h)+", "+(x+w)+","+(y+g.h+h)+", "+(x+w)+","+(y+g.h+h)
				s+=" l "+x+","+(y+g.h)
			
			break;
			case "empty":
				s+=" m "+x+" "+y
				s+=" l "+x+","+(y+g.h)
			break;
		}
	}	
	else
	{
		s+=" m "+x+" "+y
		s+=" l "+x+","+(y+g.h)
	}
	s+=" x e"
	return s
}
function createAnim(dom,animid,zindex)
{
	if(dom.all["a"+animid]!=null) return
	var el = dom.createElement("v:shape")
	with(el)
	{
		id="a"+animid;
		coordorigin="0 0"; 
		coordsize="1000 1000";
		style.position="absolute";
		style.top=sh;
		style.left=sw;
		style.width=1000;
		style.height=1000;
		style.zIndex= zindex;
	}
	
	var elf = dom.createElement("v:fill")
	elf.id="a"+animid+"F"

	el.appendChild(elf)
	
	var elp = dom.createElement("v:path")
	elp.id="a"+animid+"P"
	elp.v=""
	
	el.appendChild(elp)
	
	el.strokecolor=gui.anim.sc
	el.strokeweight=gui.anim.sw
	
	dom.body.appendChild(el)
}
function moveAnim(x)
{
	gui.anim.t = y1-gui.fill.ch
	gui.anim.h = gui.fill.ch + h1 + gui.fill.bh

	moveLayer("aF",x,gui.anim.t)
	if (Math.abs(_offset)>2)
	{
		moveLayer("aFm",x,gui.anim.t)
		moveLayer("aFb",x,gui.anim.t)
	}
	else
	{
		moveLayer("aFb",sw,sh);
		moveLayer("aFm",sw,sh);
	}
}
function redrawAnim(w,h)
{
	fullwidth = Math.max(w1,w2)+gui.kmid.mw/2+gui.fill.rcb
	if (w==null && h==null)
	{
		ah=0
		if (Math.abs(_offset)>2)
		{
			setAnimPath(document,"Fb",getAnimPath(0,0,0,0,"empty"));
			setAnimPath(document,"Fm",getAnimPath(0,0,0,0,"empty"));
		}
		setAnimPath(document,"F",getAnimPath(0,0,0,0,"empty"));
		return;
	}
	w=Math.ceil(w)
	h=Math.ceil(h)
	if (Math.abs(_offset)>2)
	{
		var _hm,_wm,_hb,_wb
		
		_hm=(h-MiddleAnimHeight>0?h-MiddleAnimHeight:0)
		_wm=(_hm==0?0:w+(w>0?MiddleAnimWidth:-MiddleAnimWidth))
		if (Math.abs(_wm)>fullwidth) 
		{ 
			_wm=0; _hm=0; _wb=0; _hb=0; 
		}
		else
		{
			_hb=(h-BackAnimHeight>0?h-BackAnimHeight:0)
			_wb=(_hb==0?0:w+(w>0?BackAnimWidth:-BackAnimWidth))
			if (Math.abs(_wb)>fullwidth) { _wb=0; _hb=0; }
		}

		ah=m+(_hm==0?0:MiddleAnimHeight)+(_hb==0?0:BackAnimHeight)
		
		setAnimPath(document,"Fb",getAnimPath(0,0,_wb,_hb,"full"));
		setAnimPath(document,"Fm",getAnimPath(0,0,_wm,_hm,"full"));
		setAnimPath(document,"F",getAnimPath(0,0,w,h,"full"));
	}
	else
	{
		ah=0
		setAnimPath(document,"F",getAnimPath(0,0,w,h,"full"));
	}
}
function endAnim()
{
	moveAnim(sw)
	redrawAnim()
	setAnimClass(document,"F","noOpacity")
}
function colorAnim(side,old)
{
	var pgn=_Book.page
	pgn+=(side=="left"?(old?-_offset:0):(old?1-_offset:1))

	var pg=book.pages[pgn]
	var u=null,c=bg
	if (pg) { u=pg.pattern_url; c=pg.getCol(); }

	if (u!=null)
		setFillPattern(document,"F",u);
	else
		setFillColor(document,"F",c);
}
function updateSurroundAnim(side) 
{
	writeTitle(side)
	updtCol(side)
}
function updateNavigation() 
{
	updateElems()
}
function animateTitleAndPage(offset,lpg,rpg,olpg,orpg,wait)
{
	leftLoad=false
	rightLoad=false
	setAnimClass(document,"F",(Math.abs(offset)>2?"noOpacity":"withOpacity"))
	if (offset>0)
	{
		mleft=false
		mright=true
		startRight(offset,lpg,rpg,olpg,orpg,wait)
	}
	else
	{
		mleft=true
		mright=false
		startLeft(offset,lpg,rpg,olpg,orpg,wait)
	}
}
function moveLastFlipping(force) 
{
	if (mright) moveLastRight(force); 
	if (mleft) moveLastLeft(force); 
	wait=true;
}
function _KB_Anim() 
{
	this.css=css_Anim
	this.source=source_Anim
	this.load=load_Anim
	this.resize=resize_Anim
	this.update=update_Anim
	this.show=show_Anim
}
function css_Anim() 
{
	var s=""
	s+=book.flipAnimation.trans?'.withOpacity{filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80);':'.withOpacity{filter:none;}'
	s+='.noOpacity{filter:none;}'; 
	return s
}
function source_Anim() { return '<IE:clientCaps ID="oClientCaps" />'; }
function load_Anim()
{
	if (isAnimated || isAnimated=="NoAnim") return
	if (hdlAnimation) { isAnimated=book.flipAnimation.enable; }
	else isAnimated = "NoAnim";
	
	var _bg=book.getCol(),u=book.getPat();
	
	createAnim(document,"Fb",1000);createAnim(document,"Fm",1000);createAnim(document,"F",1000);
	if(u) { setFillPattern(document,"Fm",u);setFillPattern(document,"Fb",u); }
	else { setFillColor(document,"Fm",_bg);setFillColor(document,"Fb",_bg); }

	setTimeout('redrawAnim(1, 1); _offset = 0;', 100)
	return '';
}
function resize_Anim() { return; }
function update_Anim() { return ''; }
function show_Anim() { return ''; }

gElems[ gElems.length ] = new _KB_Anim
