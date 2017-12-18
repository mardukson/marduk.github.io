var gElems = new Array

var _T=true,_F=false,_ww=0,_nav_w,_nav_wp=0,_nav_wn=0,_sl_gd=0,_sl_pas=0,_init=_T,_act=_F,_drag=_F
var BS=gui.bgslider,BI=gui.bginfo,GP=gui.grip,BT=gui.btntoolbar,_gp_X=0,_gp_Y,_bs_Y,_gp_mX=0
var _sl_pg=0,_sl_inc=0,_page_info="",_h_txt=_F,_susp_vis=_F,_sl_vis
var bk_w,pp_w,susp_w,av_w,pld_w,_sl_pgs=new Array,tabInfo=new Array
var infoWidth=1024
var _box_btn=null,_box_focus=null,_box_click=null,TB

function _KB_Background(typ,src,color,w,h,l,t)
{
	this.typ=typ;
	this.src=src;
	this.color=color;
	this.w=w; this.h=h;this.l=l;this.t=t;

	this.source=source_Background
	this.load=load_Background
	this.resize=resize_Background
}
function source_Background()
{
	var s=''
	with(this)
	{
		l=(l==null?0:l)
		h=(h==null?0:h)
		w=(w==null?mw:w)
		h=(h==null?mh:h)
		switch(typ)
		{
			case "fixed":
			case "center":
			case "tile":
				s+=SK(src,"KBBg",l,t,w,h,0,0)
			break;	
			default:
				s+=lyr(0,0,"","",true,"KBBg",mw,mh)
			break;
		}
	}
	return s
}
function load_Background()
{
	var css=layerCSS("KBBg")
	var col=testStr(this.color)?this.color:gui.bgcolor
	css.backgroundColor=col;
	this.resize()
}
function resize_Background()
{
	switch(this.typ)
	{
		case "color":
			ML("KBBg",lb,tb)
			RL("KBBg",wb,hb)
		break;
		case "center":
			ML("KBBg",Math.floor((wb-this.w)/2),Math.floor((hb-this.h)/2))
		break;
		case "stretch":
			RL("KBBg",ww,wh)	
			WL('<img src="'+this.src+'" width='+ww+' height='+wh+'>',"KBBg")
		case "tile":
			RL("KBBg",ww,wh)	
		break;
		default:
			ML("KBBg",0,0)
			RL("KBBg",ww,wh)
		break;
	}
}

function _KB_Slider() 
{
	this.css = css_sliderCB
	this.source=write_slider
	this.load=load_sliderCB
	this.resize=resize_sliderCB	
	this.update=update_sliderCB
	this.show=show_sliderCB
}
function css_sliderCB() { return _sty2['.grip']+_sty2['.info'] }
function write_slider() 
{
	if (book==null) return ''

	var l=-screen.width
	var s=''+
	SK("htile.gif","sl_bk",0,0,0,BS.h,0,BS.dy)+
	SK("notile.gif","sl_l",sw,sh,BS.lw,BS.h,BS.dx,0)+
	SK("notile.gif","sl_r",sw,sh,BS.rw,BS.h,BS.dx+BS.lw,0)+

	SK("notile.gif","gripl",sw,sh,GP.lw,GP.h,GP.dx,0)+
	SK("htile.gif","gripbg",sw,sh,GP.w-GP.lw-GP.rw,GP.h,0,GP.dy)+
	SK("notile.gif","gripr",sw,sh,GP.rw,GP.h,GP.dx+GP.lw,0)+

	lyr(0,0,"<nobr>&nbsp;"+(book.pages.length-1)+"&nbsp;-&nbsp;"+book.pages.length+"&nbsp;</nobr>",'class=grip',_F,"gp_txt",mw,mh)+
	lyr(l,0,"",'class=grip',_F,"gp_txt1")+
	lyr(l,0,"",'class=grip',_F,"gp_txt2")+
	lyr(l,0,"","", _F,"gp_lnk")+
													
	SK("htile.gif","h_bk",l,0,0,BI.h,0,BI.dy)+
	SK("notile.gif","h_bkl",l,0,BI.lw,BI.h,BI.dx,0)+
	SK("notile.gif","h_bkr",l,0,BI.rw,BI.h,BI.dx+BI.lw,0)+

	(_macIE?lyr(l,BI.t+BI.txtt,"",'class="info"',_F,"h_l"):lyr(l,BI.t+BI.txtt,"",'class="info"',_F,"h_l",mw,mh))+
	(_macIE?lyr(l,BI.t+BI.txtt,"",'class="info"',_F,"h_r"):lyr(l,BI.t+BI.txtt,"",'class="info"',_F,"h_r",mw,mh))+
	(_macIE?lyr(l,BI.t+BI.txtt,"",'class="info"',_F,"h_txt"):lyr(0,BI.t+BI.txtt,"",'class="info"',_F,"h_txt",mw,mh))+

	lyr(l,0,"<span class='info'>|</span>","",_F,"h_pipe")+
	lyr(l,0,"<span class='info'>...</span>","",_F,"h_susp_r")+
	lyr(l,0,"<span class='info'>...</span>","",_F,"h_susp_l")+
	lyr(l,0,"<span class='info'>...</span>","",_F,"h_susp")+

	'<span class="info" id="truc">&nbsp;</span>'

	return s 
}
function load_sliderCB() 
{
	L = book.pages.length

	WriteGrip(_T)

	document.onmousedown=downCB;
	document.onmouseup=upCB;
	document.onmousemove=moveCB;
	document.onmouseout=outCB;

	var lid="truc"
	for (var i=0; i<L; i++)	
	{
		var s=getPageTitle(i,_T)
		_sl_pgs[i]=t=new Object
		t.s=s
		t.w=GetTextWidth(t.s,"info")
	}
	return _T
}
function resize_sliderCB(init) 
{
	if(init) return _F

	_ww=wb,h=hb;
	if (book==null) return _T

	_nav_wp=x0+gui.prev.bmargin+gui.npw+gui.bgslider.margin
	_nav_wn=(_ww-x8)+gui.bgslider.margin+gui.npw+gui.next.bmargin
	
	_nav_w = _nav_wp + _nav_wn

	var ssl=_F
	_sl_pg=_Book.page
	if (_init) {
		ML("sl_l",_nav_wp,y2+BS.t)
		RL("sl_bk",_ww-(_nav_wp+_nav_wn)-(BS.lw+BS.rw),BS.h)
		ML("sl_bk",_nav_wp+BS.lw,y2+BS.t)
		ML("sl_r",_ww-_nav_wn-BS.rw,y2+BS.t)
		_init=_F
	}
	else
		ssl=_sl_vis
	if (_ww-(_nav_wp+_nav_wn)-(BS.lw+BS.rw)>GP.w) 
	{
		BS.l=_nav_wp+BS.lw
		BS.w=_ww-(_nav_wp+_nav_wn)-(BS.lw+BS.rw)

		ML("sl_l",BS.l-BS.lw,y2+BS.t)
		RL("sl_bk",BS.w,BS.h)
		ML("sl_bk",BS.l,y2+BS.t)
		ML("sl_r",BS.l+BS.w,y2+BS.t)

		pld_w=(gui.bgpreload.w?gui.bgpreload.w+gui.bgpreload.margin:0)
		
		BI.w = Math.max(0,(x8-x0-2*BI.margin))
		BI.l = BI.w==0?sw:x0+BI.margin

		ML("h_bkl",BI.l,y2+BI.t)
		RL("h_bk",BI.w-BI.lw-BI.rw,BI.h)
		ML("h_bk",BI.l+BI.lw,y2+BI.t)
		ML("h_bkr",BI.l+BI.w-BI.rw,y2+BI.t)
			
		pp_w=layerWidth("h_pipe")
		susp_w=layerWidth("h_susp")
		av_w= (BI.w-pp_w)/2
		
		ML("h_pipe",BI.l+av_w,y2+BI.t+BI.txtt)
		ML("h_r",BI.l+av_w+pp_w,y2+BI.t+BI.txtt)
		ML("h_susp_l",BI.l+av_w-susp_w,y2+BI.t+BI.txtt)
		ML("h_susp_r",BI.l+BI.w-susp_w,y2+BI.t+BI.txtt)
		ML("h_susp",BI.l+BI.w-susp_w,y2+BI.t+BI.txtt)

		SCR(layerCSS("h_l"),0,0,av_w-susp_w,BI.h)
		SCR(layerCSS("h_r"),0,0,av_w-susp_w,BI.h)
		SCR(layerCSS("h_pipe"),0,0,pp_w,BI.h)
		SCR(layerCSS("h_susp_l"),0,0,susp_w,BI.h)
		SCR(layerCSS("h_susp_r"),0,0,susp_w,BI.h)
		SCR(layerCSS("h_susp"),0,0,susp_w,BI.h)

		_sl_pas = book.pages.length
		if (_sl_pas>2) {
			if (_Book.mode == 2) {
				_sl_pas=(book.flip==2?_sl_pas/2:_sl_pas-1)
			}
		}
		else 
			_sl_pas=2
			
		_sl_gd=(BS.w-GP.w)/(_sl_pas-1)
		_sl_inc=(_Book.mode==2&&book.flip==2)?2:1

		_gp_X = PosFromPage(_sl_pg)
		_gp_Y=y2+BS.t+GP.t
		_bs_Y=y2+BS.t	

		MoveGrip(_gp_X,_gp_Y)
		
		ssl=_T
	}
	else 
		ssl=_F
	if (_sl_vis!=ssl) this.show(ssl)
	SetGripInfo()
	return _T
}
function update_sliderCB()
{
	INTER_UpdateSlider(_Book.page)
}
function show_sliderCB(f)
{
	SLS(f,"sl_l","sl_bk","sl_r","sl_gp","gp_txt", "gp_lnk","h_bk","h_bkl","h_bk","h_bkr")
	SLS(f,"gripl","gripbg","gripr","gp_lnk","gp_txt")
	_sl_vis=f
}
function PageFromPos(pos)
{
	var p=Math.floor((pos-BS.l+_sl_gd/2)/_sl_gd)
	p=Math.max(0,p)
	p=Math.min(_sl_pas-1,p)
	return p*_sl_inc
}
function PosFromPage(page)
{
	page/=_sl_inc
	page=Math.max(0,page)
	page=Math.min(_sl_pas-1,page)
	var pos = BS.l + page*_sl_gd
	return pos
}
function SetGripInfo() 
{
	var S=""
	if (_Book.mode==2) S=""+(_sl_pg+1)+" - "+(_sl_pg+2);
	else S=""+(_sl_pg+1)
	S=table(null,"width="+GP.w)+'<tr><td align=center class=grip>'+S+'</td></tr></table>'
	WL(S,"gp_txt",_T)
	return	
}
function SetPageInfo(clear) 
{
	if(_moz||clear) {pageInfoDoit=_T; SetPageInfoDoit(clear);}
	SetPageInfoDoit()
}
function SetPageInfoDoit(clear) 
{
	var l_w, r_w

	SLS(_F,"h_l","h_r","h_susp_l","h_susp_r","h_pipe")
	setTextInfo("")
	
	if (clear||!_drag) return
	if (_Book.mode==1) {setTextInfo(_sl_pgs[_sl_pg].s,_F); return;}

	var t=_sl_pgs[_sl_pg]
	if ( t )
	{
		WL("<nobr>"+t.s+"</nobr>","h_l")
		l_w=t.w

		t=_sl_pgs[_sl_pg+1]

		WL("<nobr>"+t.s+"</nobr>","h_r")
		r_w=t.w

		_susp_vis_left=(l_w>av_w)
		_susp_vis_right=(r_w>av_w)
		
		ML("h_l",BI.l+(_susp_vis_left?0:av_w-l_w),y2+BI.t+BI.txtt)
		
		SLS(_T,"h_pipe","h_l","h_r")
		SL(_susp_vis_left,"h_susp_l")
		SL(_susp_vis_right,"h_susp_r")
	}
}
function gripOver() { setTextInfo(_lab.navBoxH) }
function gripOut() { setTextInfo() }
function WriteGrip(init) 
{
/*
	if (init) 
	{
		GP.w=GetTextWidth("&nbsp;"+(book.pages.length-1)+"&nbsp;-&nbsp;"+book.pages.length+"&nbsp;","info")
		GP.w=GP.lw+GP.w+GP.rw
	}
*/
	WL('<a href="javascript:void(0)" onfocus="this.blur()" onmouseover="gripOver()" onmouseout="gripOut()" onmousedown="downCB(event)" ondragstart="return false;">'+box(GP.w,GP.h,null,_hand)+'</a>',"gp_lnk")
	RL("gp_txt",GP.w,GP.h)

	SLS(_T,"gripl","gripr","gripbg")
}
function MoveGrip(l,t) 
{
	ML("gripl",l,t); ML("gripr",l+GP.w-GP.rw,t);
	ML("gripbg",l+GP.lw,t); 
	ML("gp_lnk",l,t)
	ML("gp_txt",l+(_macIE?gui.grip.lw:0),t+GP.txtt)
}

var textCopy
function setTextInfo(text,force) 
{
	if ( textCopy == text ) return
	textCopy = text
	if (!(_sl_vis==_T)) return
	SLS(_F,"h_txt","h_susp")
	if (text==null||text=="") return

	if (self.force) {
		if ((force==false)&&_drag) return
	}

	if (_drag && _Book.mode!=1) return

	var txt_width=GetTextWidth(text,"info")
	_susp_vis=(txt_width>BI.w)

	WL(text,"h_txt")
	SCR(layerCSS("h_txt"),0,0,(_susp_vis?BI.w-susp_w:txt_width),BI.h)
	ML("h_txt",BI.l+(_susp_vis?0:(BI.w-txt_width)/2),y2+BI.t+BI.txtt)
	
	SL(_T,"h_txt")
	SL(_susp_vis,"h_susp")
	
}
function INTER_UpdateSlider(newpage,ev) 
{
	_drag=_F
	_act=_F
	outCB(ev)
	SetPageInfo()
	SLD.resize()
}

function downCB(ev) {

var ns_return = _T

	_drag=_F

	var x=eventGetX(ev),y=eventGetY(ev)
	if (!_mac&&btn(ev)!=1) return _T

	if ((x>=_nav_wp)&&(x<=_ww-_nav_wn)&&(y>=_bs_Y)&&(y<=_bs_Y+BS.h)) {
		_act=_T
	}
	if ((x>=_gp_X)&&(x<=_gp_X+GP.w)&&(y>=_gp_Y)&&(y<=_gp_Y+GP.h)) {
		_drag=_T
		_gp_mX=x-_gp_X
		SetPageInfo()
		return _F
	}

	return (_moz?_F:_T)
}

function moveCB(ev) 
{
	var x=eventGetX(ev),y=eventGetY(ev)
	if ((!_moz)&&(btn(ev)!=1)&&(_drag)) {
		SetPageInfo(_T)
		INTER_UpdateSlider(_main._Book.page,ev)
		return _T
	}
	 
	if (_drag) {
		var pos=x-_gp_mX
		pos=Math.min(pos,_ww-GP.w-BS.rw-_nav_wn)
		pos=Math.max(pos,_nav_wp+BS.lw)
		
		var tmpPage=PageFromPos(pos)
	
		_gp_X=pos
		MoveGrip(_gp_X,_gp_Y)
		
		if (_sl_pg!=tmpPage) {
			_sl_pg = tmpPage
			SetGripInfo()
			SetPageInfo()
			return _F
		}
	}
/*
	else {
		if ((x>=_gp_X)&&(x<=_gp_X+GP.w)&&(y>=_gp_Y)&&(y<=_gp_Y+GP.h)) {
			if (!_h_txt) {
				_h_txt=_T
				setTextInfo(_lab.navBoxH)
			}
		}
		else {
			if (_h_txt) {
				_h_txt=_F
				if (!_drag) setTextInfo("")
			}
		}
		
		if ((x<_gp_X)&&(x>_nav_w)&&(y>=_gp_Y)&&(y<=_gp_Y+GP.h)) setTextInfo((fl?_lab.previousPagesH:_lab.previousPageH)+(" "+_lab.accPrevPage))
		if ((x>_gp_X+GP.w)&&(x<_ww-_nav_w)&&(y>=_gp_Y)&&(y<=_gp_Y+GP.h)) setTextInfo((fl?_lab.nextPagesH:_lab.nextPageH)+(" "+_lab.accNextPage))
	}
*/
	return _T
}
function upCB(ev) 
{
	if(btn(ev)==3) return _F
	if (_box_btn) {
		if (_box_btn!=_box_focus) {
			_box_focus=_box_btn
			BtnAction(_box_focus,"OVER") 
			return _T
		}
	}
	else {
		if (_box_focus) {
			_box_click=null
			BtnAction(_box_focus,"OUT") 
			return _T
		}
	}

	var x=eventGetX(ev),y=eventGetY(ev)
	if (!_act) {
		_drag=_F
		outCB(ev)
		return _T
	}

	var ope 
	if (!_drag) 
	{
		if ((x>_gp_X)&&(_sl_pg<(book.pages.length-_Book.mode))) { _sl_pg+=(_Book.mode==1?1:_sl_inc); ope="np"; }
		if ((x<_gp_X)&&(_sl_pg>0)) { _sl_pg-=(_Book.mode==1?1:_sl_inc); ope="pp"; }
	}
	else { setTextInfo(_lab.navBoxH); ope="gp"; }

	setTimeout( 'changePage('+_sl_pg+',null,null,null,"'+ope+'","nav")', 100 )
	
	_drag=_F
	_act=_F
	SetPageInfo(_T)

	return _F
}

function outCB(ev) {

	if (_h_txt&&!_drag) {
		_h_txt=_F
		setTextInfo("")
	}
	setTextInfo("")
	return _T
}

function trLnkMouseOver(target) 
{
	if (_drag) return _F
	switch(target) {
		case 'prev': setTextInfo((fl?_lab.previousPagesH:_lab.previousPageH)+(" "+_lab.accPrevPage)); break
		case 'next': setTextInfo((fl?_lab.nextPagesH:_lab.nextPageH)+(" "+_lab.accNextPage)); break
		case 'toggle': setTextInfo((gui.toolbar.show?_lab.hideToolbarH:_lab.showToolbarH)+(" "+_lab.accToolbar));break
	}
	return _T
}

function _KB_Buttons()
{
	this.showText = null
	this.maxw = 0
	this.npw = -1
	
	this.css = Buttons_Css
	this.source = Buttons_Source
	this.load = Buttons_Load
	this.resize = Buttons_Resize
	this.update = Buttons_Resize
	this.show = Buttons_Show
}

function updtNavButton(side,notext,init)
{
	var bmodeout = (_Book.mode==1?2:1) 
	var off, offout
	var obj = eval("gui."+side)
	var bmargin = (side=="prev"?x0+obj.bmargin:x8-gui.npw-obj.bmargin)
	var pm=(_Book.mode==2&&book.flip==1)?2:1
	var isout = init||(side=="prev"?_Book.page-book.inc<0:_Book.page+book.inc>book.pages.length-pm)
	if (isout) { off=-10000; offout=bmargin; } else { off=bmargin; offout=-10000; }

	ML(side+"l",off,y2+obj.t)
	ML(side+"r",notext?off+gui.npw-obj.rw:off+obj.lw,y2+obj.t)

	RL(side+"bg",gui.npw-(obj.lw+obj.rw),obj.h)
	ML(side+"bg",Math.max(off,offout)+obj.lw,y2+obj.t)
		
	ML(side+"lout",offout,y2+obj.t)
	ML(side+"rout",offout+gui.npw-obj.rw,y2+obj.t)
		
	ML(side+"bl",off,y2+obj.t);
	
	ML(side+"bt"+_Book.mode,notext?off:sw,y2+obj.t);
	ML(side+"btOut"+_Book.mode,notext?offout:sw,y2+obj.t);
		
	ML(side+"bt"+bmodeout,sw,null);
	ML(side+"btOut"+bmodeout,sw,null);
}
function writeButton(side)
{
	var obj=eval("gui."+side)
	var txt = fl==null?"":_lab[(side=="prev"?"previous":"next")+"Page"]
	var dy=0
	reWriteLayer((txt?wriTxt(txt,side+"text1",null,obj.lw+obj.txtl,obj.txtt,"nextprev"):""),side+"bt1" )
	dy = obj.h
	reWriteLayer((txt?wriTxt(txt,side+"textout1",null,obj.lw+obj.txtl,obj.txtt,"nextprevout"):""),side+"btOut1" )
	txt = fl==null?"":_lab[(side=="prev"?"previous":"next")+"Page"+(fl?"s":"")]
	dy=0
	reWriteLayer((txt?wriTxt(txt,side+"text2",null,obj.lw+obj.txtl,obj.txtt,"nextprev"):""),side+"bt2" )
	dy=obj.h
	reWriteLayer((txt?wriTxt(txt,side+"textout2",null,obj.lw+obj.txtl,obj.txtt,"nextprevout"):""),side+"btOut2" )

	SLS(true,side+"l",side+"r",side+"lout",side+"rout",side+"bg",side+"bt1",side+"bt2",side+"btOut1",side+"btOut2")
}
function writeInitButton(side)
{
	var s=''
	var obj=eval("gui."+side)

	s+=SK("htile.gif",side+"bg",sw,sh,0,obj.h,0,obj.dy)

	s+=SK("notile.gif",side+"l",sw,sh,obj.lw,obj.h,obj.dx,0)
	s+=SK("notile.gif",side+"r",sw,sh,obj.rw,obj.h,obj.dx+obj.lw,0)
	s+=SK("notile.gif",side+"lout",sw,sh,obj.lw,obj.h,obj.dx,obj.h)
	s+=SK("notile.gif",side+"rout",sw,sh,obj.rw,obj.h,obj.dx+obj.lw,obj.h)

	var lab=fl==null?"":_lab[(side=="prev"?"previous":"next")+"Page"+(fl?"s":"")]
	s+=lyr(0,obj.t,wriTxt(lab),"class=z0",false,side+"Button",mw,mh)
	
	s+=lyr(sw,0,"","class=z100",true,side+"bt1",mw,mh)
	s+=lyr(sw,0,"","class=z100",true,side+"bt2",mw,mh)
	s+=lyr(sw,0,"","class=z100",true,side+"btOut1",mw,mh)
	s+=lyr(sw,0,"","class=z100",true,side+"btOut2",mw,mh)
	s+=lyr(sw,0,"","class=z1000",true,side+"bl",mw,mh)

	return s
}
function Buttons_Css() { return _sty2['.nextprev']+_sty2['.nextprevout'] }
function Buttons_Source() { return writeInitButton("prev")+writeInitButton("next"); }
function Buttons_Load() 
{ 
	gui.prev.w=GetTextWidth(_lab["previousPage"+(fl?"s":"")],"nextprev")+5; 
	gui.next.w=GetTextWidth(_lab["nextPage"+(fl?"s":"")],"nextprev")+5;
	var maxw=Math.max(gui.prev.w,gui.next.w);
	gui.prev.txtl=(maxw-gui.prev.w)/2; gui.next.txtl=(maxw-gui.next.w)/2
	this.maxw = Math.max(gui.prev.lw+gui.prev.w+gui.prev.rw,gui.next.lw+gui.next.w+gui.next.rw)
	writeButton("prev");writeButton("next"); 
}
function Buttons_Resize(init)
{
	var w=wb,h=gui.base.h;

	this.showText=(!init)&&(x8-x0>gui.prev.bmargin+3*this.maxw+gui.next.bmargin)
	gui.npw=Math.max(gui.prev.lw+(this.showText?gui.prev.w:0)+gui.prev.rw,gui.next.lw+(this.showText?gui.next.w:0)+gui.next.rw)

	if(!init&&gui.npw!=this.npw)
	{
		this.npw=gui.npw
		RL("prevbl",gui.npw,gui.prev.h)
		reWriteLayer(trLnk("leftlink",gui.npw,gui.prev.h,"return changePageCB(\"p\",\"but\")","trLnkMouseOver(\"prev\")","setHelpText()"),"prevbl")
		RL("nextbl",gui.npw,gui.next.h)
		reWriteLayer(trLnk("rightlink",gui.npw,gui.next.h,"return changePageCB(\"n\",\"but\")","trLnkMouseOver(\"next\")","setHelpText()"),"nextbl")
	}

	updtNavButton("prev",this.showText,init); updtNavButton("next",this.showText,init)
}
function Buttons_Show(f)
{
	gui.npw=Math.max(gui.prev.lw+(this.showText?gui.prev.w:0)+gui.prev.rw,gui.next.lw+(this.showText?gui.next.w:0)+gui.next.rw)
	updtNavButton("prev",this.showText,!f); updtNavButton("next",this.showText,!f)
}
function wriTxt(txt,id,mid,l,t,cl)
{
	var s=''
	var rel=(l==null&&t==null);l=(l==null?0:l);t=(t==null?0:t);cl=(cl==null?"nextprev":cl)
	if ( rel ) 
		s = '<span class="'+cl+'">&nbsp;'+txt.replace(/ /,'&nbsp;')+'&nbsp;</span>'
	else 
		s=lyr(l,t,'<nobr>&nbsp;'+txt+'&nbsp;</nobr>'," class="+cl,true,id,mw,mh)
	return s 
}

function _KB_TabSet()
{
	this.tabs=new Array
	this.l=0
	this.t=0
	this.txtt=(gui.tab.txtt==null?2:gui.tab.txtt)
	this.h=gui.tab.h
	this.w=0
	this.f=0
	this.w3=0
	this.lw=gui.tab.lw
	this.rw=gui.tab.rw
	this.tcolor=(gui.tab.tcolor==null?"#000000":gui.tab.tcolor)
	
	this.load=new Function
	this.build=buildTabSet
	this.css=cssTabSet
	this.source=elemTabSet
	this.resize=resizeTabSet
	this.update=updateTabSet
	this.show=showTabSet
}
function buildTabSet()
{
	var font=(gui.tabs.addedfont?'"'+gui.tabs.addedfont+'",'+gui.tabs.font:gui.tabs.font)
	if (book)
	{
		var p=book.pages
		for (var i in p)
		{
			var tb=p[i].tab
			if(tb) 
			{
				var l=this.tabs.length;this.tabs[l]=tb
				with(tb)
				{
					text=(text=="labINTERNAL"?getTitle(p[i]):text)
					id="tab"+l
					curc="c"+id; curcs="cs"+id
					n=l
					tf=font;tfs=gui.tabs.fontsize;tcolor=this.tcolor;
					h=this.h;
				}
			}
		}
	}
}
function cssTabSet()
{
	this.build()

	var s=''
	s+='.tTab { background-color:'+this.tcolor+'; layer-background-color:'+this.tcolor+';}'
	s+=_sty2['.toolTipBorder']+_sty2['.toolTipText']
	for (var t in this.tabs) s+=this.tabs[t].css()
	return s
}
function elemTabSet()
{	
	var s=''
	for (var t=this.tabs.length-1;t>=0;t--) 
		with(this.tabs[t]) s+=elem()
	s+=getTipHTML("tabTip")
	return s
}
function resizeTabSet(init, toolbar)
{	
	if ( toolbar ) return
	if (init)
	{
		for (var _t in this.tabs)
		{
			with(this.tabs[_t])
			{
				minw=GetTextWidth( inner((text!=null?text.slice(0,1):""),true) )
				w=GetTextWidth( inner((text!=null?text:""),true) )
				pw=GetTextWidth( inner(null,true) )
				this.w+=gui.tab.lw + w + gui.tab.rw
			}
		}
	}

	this.l=x0+gui.tabs.l
	this.availw=gui.logo.l-this.l
	this.t=y1-gui.ceil.h+gui.tabs.t
	
	var f=Math.min(1,this.availw/(this.w==0?1:this.w))
	if (_Book.centered||f!=this.f)
	{
		var offx=this.l
		for (var _t in this.tabs)
		{
			with( this.tabs[_t] )
			{
				var cw=Math.floor((gui.tab.lw+w+gui.tab.rw)*f)-(gui.tab.lw+gui.tab.rw), pcw
				if ( cw<=minw )
				{
					cw = minw
					pcw = 0
				}
				if ( minw<cw && cw<minw+pw )
				{
					pcw = Math.min(pw,cw-pw)
				}
				if ( minw+pw<cw && cw<w )
				{
					pcw = Math.min(pw,w-cw)
				}
				if ( w<=cw )
				{
					cw = w
					pcw = 0
				}
				SCR(layerCSS(id),0,0,cw,h)
				SCR(layerCSS("s"+id),0,0,cw,h)	
				SCR(layerCSS("p"+id),0,0,pcw,h)	
				SCR(layerCSS("sp"+id),0,0,pcw,h)	

				ML("l"+id,offx,this.t)
				ML(id,offx+gui.tab.lw,this.t+this.txtt)
				RL( id, cw, h )
				ML("p"+id,offx+gui.tab.lw+cw-pcw,this.t+this.txtt)
				ML("s"+id,offx+gui.tab.lw,this.t+this.txtt)		
				ML("sp"+id,offx+gui.tab.lw+cw-pcw,this.t+this.txtt)		
				ML("r"+id,offx+gui.tab.lw+cw,this.t)
	
				vw = gui.tab.lw+cw+gui.tab.rw
				WL(outer(),"lnk"+id)
				ML("lnk"+id,offx,this.t)
				
				RL("bg"+id,vw,h)
				ML("bg"+id,offx,this.t)
				RL("sbg"+id,vw,h)
				ML("sbg"+id,offx,this.t)

				RL("t"+id,cw,1)		
				ML("t"+id,offx+gui.tab.lw,this.t)		

				offx+=vw
			}
		}
		this.f=f
	}
	if ( !init ) this.update()
}
function updateTabSet()
{
	var cursel=false
	for (var t in this.tabs)
	{
		with(this.tabs[t])
		{
			var p=page.page-1
			cursel=( p==_Book.page||(_Book.mode==2&&p==_Book.page+1))	
			if(cursel)
			{
				SLS(true,"sbg"+id,"s"+id,"sp"+id);SLS(false,"bg"+id,id,"p"+id);
			}
			else
			{
				SLS(false,"sbg"+id,"s"+id,"sp"+id);SLS(true,"bg"+id,id,"p"+id);
			}
			SLS(true,"l"+id,"t"+id,"r"+id,"lnk"+id);
		}
	}
}
function showTabSet(f)
{
	for (var t in this.tabs)
		with(this.tabs[t])
			SLS(f,"sbg"+id,"s"+id,"sp"+id,"bg"+id,id,"p"+id,"l"+id,"t"+id,"r"+id,"lnk"+id);
}

function _KB_TAB(page)
{
	this.page = page
	this.text="";
	
	this.bgcolor=gui.tabs.bgcolor;this.sbgcolor=gui.tabs.sbgcolor;this.textcolor=gui.tabs.textcolor;this.stextcolor=gui.tabs.stextcolor;

	this.n=0
	this.tf=""
	this.id=""
	this.w=0
	this.pw=0
	this.h=0

	this.vw=0
	this.tcolor=""
	this.curc="";this.curcs="";

	this.setskin=setSkinTab
	this.css=cssTab
	this.elem=elemTab

	this.inner=innerTab
	this.outer=outerTab
}
function setSkinTab(deftab)
{	
	for(var p in this)
	{
		var gt=this[p]
		if (typeof(gt)!="function") this[p]=(gt==""?deftab[p]:gt)
	}
}
var zi=0
function cssTab()
{
	var s=""
	with(this)
	{
		var f=(tf!=""?'font-family:'+tf+';font-size:'+tfs+'px;':'')
		var sz = (mw==null?'':'width:'+mw+'px;')+(mh==null?'':'height:'+mh+'px;')
		s+='.c'+id+'{background-color:'+bgcolor+';layer-background-color:'+bgcolor+';color:'+textcolor+';'+f+'}.cs'+id+'{background-color:'+sbgcolor+';layer-background-color:'+sbgcolor+';color:'+stextcolor+';'+f+'font-weight:bold;}'
		s+='#lnk'+id+'{z-index:'+zi+';'+sz+'}'
	}
	zi++
	return s
}
function elemTab()
{
	var s='' 
	var minw=(_moz?null:1), minh=(_moz?null:1)
	with(this)
	{
		s+=lyr(sw,sh,inner((text!=null?text.slice(0,1):""),true),null,false,'min'+id,minw,minh)
		s+=lyr(sw,sh,"",' bgcolor="'+bgcolor+'" class="'+curc+'" ',false,'bg'+id,minw,minh)
		s+=lyr(sw,sh,"",' bgcolor="'+sbgcolor+'" class="'+curcs+'" ',false,'sbg'+id,minw,minh)
		s+=skinImg("notile.gif","l"+id,sw,sh,gui.tab.lw,gui.tab.h,gui.tab.dx,0)
		s+=skinImg("notile.gif","r"+id,sw,sh,gui.tab.rw,gui.tab.h,gui.tab.dx+gui.tab.lw,0)
		s+=lyr(sw,sh,inner((text!=null?text:""),false)," align=center ",false,id,minw,minh)
		s+=lyr(sw,sh,inner((text!=null?text:""),true),"",false,'s'+id,minw,minh)
		s+=lyr(sw,sh,inner(null,false),"",false,'p'+id,minw,minh)
		s+=lyr(sw,sh,inner(null,true),"",false,'sp'+id,minw,minh)
		s+=lyr(sw,sh,"",' bgcolor="'+tcolor+'" class="tTab" ',true,'t'+id,minw,minh)
		s+=lyr(sw,sh,"","",false,"lnk"+id,minw,minh)
	}
	return s
}	
function tabImg(side,white)
{
	var w=(side=="left"?gui.tab.lw:gui.tab.rw),h=gui.tab.h
	var dx=gui.tab.dx+(side=="left"?0:gui.tab.lw)
	if (_imgcss) return box(w,h,null,"background-image:url('+_neu+'notile.gif);background-position:'+(-dx)+' 0;")
	else return getImg(_neu+"tab_"+side+".gif",w,gui.tab.h)
}
function innerTab(txt,cursel)
{	
	return '<span class='+(cursel?this.curcs:this.curc)+'><nobr>'+(txt==null?'...':txt)+'</nobr></span>'
}
function outerTab()
{	
	return '<a onfocus=this.blur() href="javascript:clickTabCB('+this.n+')" onmouseover="overTabCB('+this.n+',event)" onmouseout="outTabCB('+this.n+')">'+box(this.vw,this.h)+'</a>'
}
function overTabCB(n,ev)
{
	var tab = TS.tabs[n]
	if (!tab) return
	setHelpText(_lab.tabH)
	if (tab.w!=tab.vw+TS.w3-TS.lw-TS.rw)
	{
		var s
		var tag=_macIE?"span":"div"
		s="<"+tag+" style='padding:2px;' class='toolTipBorder'><nobr>%1</nobr></"+tag+">"
		with(tab) showTip("tabTip",formatString(s,text),eventGetX(ev),TS.t+TS.h-20)
	}
}
function outTabCB(n)
{
	setHelpText()
	hideTip("tabTip")
}
var doClick=true
function clickTabCB(n)
{
	if ( doClick )
	{
		doClick = false
		var tab=TS.tabs[n]
		if (tab) with( tab ) changePage(page.page-1,null,null,"right","gp","tab")
		doClick = true
	}
}

var SLD=new _KB_Slider()
var BTNS = new _KB_Buttons()
var TS = new _KB_TabSet()

gElems[gElems.length] = TS
gElems[gElems.length] = BTNS
gElems[gElems.length] = SLD
