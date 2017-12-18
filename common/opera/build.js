var left, right
var _sty2=new Array,_sty=new Array
function css(name,s){_sty[name]=name+"{"+s+"}"}
function css2(name,s){_sty2[name]=name+"{"+s+"}"}
bigZ="z-index:20000;"
css2(".nextprev",st(gui.nextprevfg,null,baseFf,gui.nextprevfs,"bold")+"text-decoration:none;")
css2(".nextprevout",st(gui.nextprevoutfg,null,baseFf,gui.nextprevoutfs,"bold")+"text-decoration:none;")
css2(".grip",st(gui.gripfg,null,baseFf,gui.gripfs,"bold")+"text-decoration:none;"+(_ie&!_mac?"text-align:center;":""))
css2(".info",st(gui.infofg,null,baseFf,gui.infofs,"bold")+"text-decoration:none;overflow:hidden;")
css2(".preload",st(gui.preloadfg,null,baseFf,gui.preloadfs,"bold")+"text-decoration:none;")
css2(".toolbar",st(gui.toolbarfg,null,baseFf,gui.toolbarfs,"bold")+"text-decoration:none;")
css2(".ptitle",st(topFg,null,topFf,topFs,"bold"))
css2(".pnumber",st(topFg,null,topFf,topFs-2,"bold"))
css2("A.ptitle:link",st(lnk,null,topFf,topFs,"bold"))
css2("A.ptitle:active",st(lnk,null,topFf,topFs,"bold"))
css2("A.ptitle:visited",st(lnk,null,topFf,topFs,"bold"))
with (gui.logo) css2(".theLogo",st(fg,null,font,fontsize,"bold")+";text-decoration:none;font-style:italic")
css2("A:active",st(lnkA))
css2("A:link",st(lnk))
css2("A:visited",st(lnk))
css2(".toolTipBorder",st(fg,tipBg,ff,fs,null,1,"solid",tipBd)+bigZ)
css2(".toolTipText",st(fg,tipBg,ff,fs)+bigZ)
css2(".Lines",st(fg,null,ff,fs)+"line-height:16px;")
css("BODY",st(null,bg))
css("P",st(fg,null,ff,fs))
css(".Normal",st(fg,null,ff,fs)+"text-decoration:none;")
css(".Small",st(fg,null,ff,baseFs))
css(".Emphasis",st(emphFg,null,ff,fs))
css(".EmphasisBold",st(emphFg,null,ff,fs,"bold"))
css("A:active",st(lnkA))
css("A:link",st(lnk))
css("A:visited",st(lnkV))
css(".Thumb",st(thFg,thBg,ff,fs,"bold"))
css(".ThumbLight",st(thFg,thBg,ff,fs))
css(".ThumbBig",st(thFg,thBg,ff,topFs,"bold"))
css(".Inputs",st(inputFg,null,ff,12))
css(".InnerThumb",st(fg,thMidBg,ff,12))
css(".BtnNorm",st(buttonFg,null,ff,fs,"bold")+"cursor:"+_hand+";text-decoration:none;")
css(".Dlg",st(dlgFg,thBg,ff,fs,"normal"))
css(".DlgTitle",st(dlgFg,thBg,ff,fs,"bold"))
css(".DlgMid",st(thMidFg,thMidBg,ff,fs))
css(".posabs","position:absolute;")
css(".posrel","position:relative;")

var _Book=new gBook,_MAX_CHAPTER=11
var setInc,onLoadPageCB,_page=new Array

var isAnimated = false;
var hdlAnimation = _ie&&_win&&!_ie4;
var sAnimation = false;

function PageInfo(){this.idx=0;this.url='';this.title='';this.external=false;this.light=false;this.col=null;this.colTitle=null}

_page["left"]=new PageInfo
_page["right"]=new PageInfo

function setHelpText(s) { setTextInfo(s) }
function loadIframe(ifr,url) { url=(url==null?"about:blank":url); if (ifr) ifr.src = url; return }
function moveIframe(ifr,x,y) { var f = getFrame(ifr); try { f.setPos(x,y);} catch(e){} }
function resizeIframe(ifr,w,h,_margin) 
{
	var f = getFrame(ifr); 
	try { f.setSize(w,h);} 
	catch(e){ return false; }; 
	return true;
}
function IframeIsFixed(pg) { return pg.internal!=null; }
function GetTextWidth( txt, cls )
{
	cls = ( cls == null ? "" : 'class="'+cls+'"' )
	WL( '<span '+cls+'>'+txt+'</span>', "tmpLayer")
	return layerWidth( "tmpLayer" )
}

function gBook()
{
	this.mode=2;this.page=0;this.l=0;this.t=0;this.r=0;this.b=0;this.w=null;this.h=null;this.centered=null;this.scroll=null;
	this.bg=null; this.titleVis=true;
	this.init=gBook_init;
	this.write=gBook_write;
	this.load=gBook_load;
	this.refresh=gBook_refresh;
	this.resize=gBook_resize;
	this.resizeBook=gBook_resizeBook;
	this.resizeElems=gBook_resizeElems;
	this.resizePages=gBook_resizePages;
	this.showToolbar=gBook_showToolbar;
	this.setDim=gBook_setDim;
}	
function gBook_init()
{
	_common=calPath(_root,EnginePath+'common');
	_localized=calPath(_root,EnginePath+"langs/"+params.language);
	_inc=calPath(_root,(_dyn?"../../":"")+"include/")
	_resources=calPath(_common,"../resources/")
	_neu=calPath(_root,EnginePath+"skins/"+params.skin);
	_contents=calPath(_root,'contents');
	_langName=params.language;_lookName=params.skin;
	if (_partner&&_partner.toLowerCase()=="keeboo") _partner=null
	with(this)
	{
		mode = parseInt(params.pagemode)
		page=mode==2?0:1
		if ( params.resize==1 )
		{
			var item=book.getPageById(params.lastpageid)
			if (item) page=item.page-1;
		}
		else if (params.startpageid)
		{
			var item=book.getPageById(params.startpageid,params.lastpageid,params.lastpagedt)
			if (item) page=item.page-1;
		}
		else if (params.startpagenumber)
		{
			var nbr=params.startpagenumber
			if (typeof nbr=="string") nbr=parseInt(nbr)
			page=nbr-1
		}
		if ((mode==2)&&(this.flip==2)&&(page%2!=0)) page=Math.max(0,page-1)
		page=Math.max(0,Math.min(book.pages.length-mode,page))
		setDim(params.l,params.t,params.r,params.b,params.w,params.h,params.centered)
		bg=book.bg
		titleVis=book.titleVis
	}
	gui.toolbar.show=params.enabletoolbar&&params.toolbarmode
	if (setInc) setInc()
	writeInHeader()
}
function gBook_showToolbar()
{
	if ( params.enabletoolbar )
	{
		gui.toolbar.show = !gui.toolbar.show
		this.refresh("toolbar")
	}
}
function gBook_setDim(l,t,r,b,w,h,centered){ this.l=l;this.t=t;this.r=r;this.b=b;this.w=w;this.h=h;this.centered=centered; }
var oldW=-1,oldH=-1
function gBook_refresh(state)
{
	oldW=-1,oldH=-1
	switch(state)
	{
		case "load":
			if (book.preload) setTimeout("book.preload.start()",1000)
			break;
		case "toolbar":
			setHelpText("")
			this.resize(false,true,true);
			break;
		case "pagemode":
			if(TB) TB.update()
			this.resize(false,true,true);
		break;
	}
	foc();
}
function logoOverCB(){setHelpText(_lab.logoH)}
function logoOutCB(){setHelpText()}

var f_leftpage,f_rightpage
var mf_leftpage, mf_rightpage
var mright,mleft

var fl=null
function SetFlipMode() { fl=(book.flip==2) }

var sw=(_mac?1:-1)*screen.width,sh=(_mac?1:-1)*screen.height;
var mw,mh; if(_ie4||_macIE) { mw=1; mh=1; }
var _pageNumInfo

function pageNumInfoObj(name)
{
	this.win=getFrame(name)
	this.side=""
	this.num=0
	if (_pageNumInfo==null) _pageNumInfo=new Array
	_pageNumInfo[name]=this
}
function InitPageNumInfo()
{
	if (_pageNumInfo==null)
	{
		new pageNumInfoObj("f1")
		new pageNumInfoObj("f2")
		new pageNumInfoObj("mf1")
		new pageNumInfoObj("mf2")
	}
}
function setPageNumSide(name,side,num)
{
	InitPageNumInfo()
	var obj=_pageNumInfo[name]
	obj.side=side
	obj.num=num
}

function getPageNumSide(w)
{
	var f=w,p=w,tp=w.top
	while ((p!=self)&&(p!=tp))
	{
		f=p
		p=p.parent
	}
	for (var i in _pageNumInfo)
	{
		var inf=_pageNumInfo[i]
		if (inf.win==f) return inf
	}
	return null
}

function changePageCB(side,trig)
{	
	var offset=(side=="p"?-1:1)*book.inc
	changePage(_Book.page+offset,null,null,null,side+"p",trig)
	return false;	
}
var cleft=true,cright=true
function doChange() 
{
	if (!isAnimated) return true
	
	if ( cleft&&cright )
	{
		cleft=false;cright=false;
		return true
	}
	else
		return false 
}
function changeTitleAndPage(side,lurl,rurl)
{
	var tempo = 500
	var f_leftpageid = f_leftpage.id
	f_leftpage = layerElem(f_rightpage.id)
	f_rightpage = layerElem(f_leftpageid)
	
	if (book.slideShow&&book.slideShow.running) book.slideShow.loadpageEvent()
	
	setPageNumSide(f_rightpage.id,"right",_Book.page+1)
	setPageNumSide(f_leftpage.id,"left",_Book.page)

	if ( side>0 ) 
	{
		cleft=true;

		RL(f_rightpage.id,w2,h1)
		ML(f_rightpage.id,x4,sh)
		
		RL(f_leftpage.id,w1,h1)
		ML(f_leftpage.id,x2,y1)

		rightLoad=false
		changeUrl(getFrame(f_rightpage.id),rurl)
		setTimeout('ML(f_rightpage.id,x4,y1)', tempo )
	}
	else
	{
		cright=true;

		RL(f_leftpage.id,w1,h1)
		ML(f_leftpage.id,x2,sh)
		
		RL(f_rightpage.id,w2,h1)
		ML(f_rightpage.id,x4,y1)
		
		leftLoad=false
		changeUrl(getFrame(f_leftpage.id),lurl)
		setTimeout('ML(f_leftpage.id,x2,y1)', tempo )
	}
}

function writeTitle(side)
{
	WL(titleStr(side,"Title"),side+"Title")
	WL(titleStr(side,"Folio"),side+"Folio")
}
function writePage(side,moved,empty)
{
	if(book==null) return
	if (book.pages==null) return
	var fobj = eval((moved?"m":"")+"f_"+side+"page")
	setPageNumSide(fobj.id,side,_Book.page+(side=="right"?_Book.mode-1:0))
	url=(empty?"about:blank":getPageRealUrl(side))
	if(url) 
	{
		eval( side+'Load=false' )
		changeUrl(getFrame(fobj.id),url)
	}
}
function writeTitleAndPage(side,moved) 
{ 
	if(book==null) return
	if (book.pages==null) return
	writeTitle(side);
	writePage(side,moved);
}

function getPageFrame(side,moved)
{
	var fobj = eval((moved?"m":"")+"f_"+side+"page")
	return getFrame(fobj.id)
}

function pageOverCB() {setHelpText(_lab.extRightH)}
function pageOutCB() {setHelpText()}
function initTitle()
{
	WL(titleStr(),"tmpLayer")
	gui.titles.pgw=layerWidth("tmpLayer")
	gui.titles.ph=layerHeight("tmpLayer")	
	RL("leftFolio",gui.titles.pgw,gui.titles.ph); RL("rightFolio",gui.titles.pgw,gui.titles.ph)
}
function titleStr(side,type)
{
	if (side==null&&type==null)
	{
		var page=book.pages.length+'/'+(book.pages.length)
		var s='<span class=pnumber>'+page+'</span>'
		return s
	}

	var pg=_page[side],vis=true
	var fg=_page[side].colTitle
	if (book.titleVis!=null) vis=book.titleVis
	if (book.pages[pg.idx].titleVis!=null) vis=book.pages[pg.idx].titleVis

	if (type=="Title")
	{
		var ti=vis?pg.title:"&nbsp;"
		if (fg) ti="<font color='"+fg+"'>"+ti+"</font>"

		if (book.pages[_page[side].idx].internal == "author"||book.pages[_page[side].idx].internal == "blank")
			ti="&nbsp;"

		return '<span class="ptitle"><nobr>'+ti+'</nobr></span>'
	}
	else
	{
		var page = (_Book.page+_Book.mode-(side=="left" ? 1 : 0))+'/'+(book.pages.length)
		if (fg) page="<font color='"+fg+"'>"+page+"</font>"

		if (book.pages[_page[side].idx].internal == "author"||book.pages[_page[side].idx].internal == "blank")
			page="&nbsp;"

		return '<span class="pnumber"><nobr>'+page+'</nobr></span>'
	}
}
function getPageFrame(side,moved)
{
	var fobj = eval((moved?"m":"")+"f_"+side+"page")
	return getFrame(fobj.id)
}
function updateSurround()
{
	updtCol("left",_Book.mode==1)
	updtCol("right")
	updtElems()
}
function updtCol(side,hide)
{
	var c=((_Book.mode==1)&&(side=="left"))?bg:(_page[side].col?_page[side].col:bg)
	var pg=book.pages[_page[side].idx],cid="color"+side,pid="pattern"+side
	var u=pg.pattern_url
	var dx=(_ie4?0:(side=="left"?gui.fill.lcb:gui.fill.mrcb)), dy=(_ie4?0:gui.fill.ch)

	if(hide){ c=bg;u=null; }
	if (u!=null)
	{
		bordCol(cid,c);
		bordPat(pid,u,dx,dy);
	}
	else
	{
		bordPat(pid,false);
		bordCol(cid,c);
	}
}

function updtLinks(side)
{
	if (side==null||side=="left")
	{
		if (_Book.page-book.inc<0)
			ML("lTLnk",sw,null);
		else
			ML("lTLnk",x0,y1);
	}
	if (side==null||side=="right")

	{
		if (_Book.page+book.inc>=book.pages.length-1 )
			ML("rTLnk",sw,null);
		else
			ML("rTLnk",x5,y1);
	}
}

function updtPages()
{
	if ( ! resizeIframe(f_rightpage.id,w2,h1) )
		writePage('right');
	if ( ! resizeIframe(f_leftpage.id,w1,h1) )
		writePage('left'); 
	updtLinks()
}

function updtElems()
{
	for ( var i=0; i<gElems.length; i++ )
		gElems[i].update()
}	

function getPageWidth(side) { return (side=="left"?w1:w2); }
function getPageHeight() { return h1; }

function foc(){focus()}

function changePageModeCB(trig,d1,d2)
{
	var shiftPage=false
	with (_Book)
	{
		page += (mode==2?1:-1)
		if (page==-1) shiftPage=true
		page=Math.max(page,0);page=Math.min(page,book.pages.length-(mode==2?1:2))
		if (mode==2)
		{
			mode=1;
			setInc();
			if(mright||mleft) return;
			if (shiftPage) 
				changePage(page,true,null,null,"vm",trig,null,d1,d2)
			{
				var oldl=_page["left"].idx+1, oldr=_page["right"].idx+1
				book.trackPage("vm",trig,page,oldl,oldr,d1,d2)
			}
		}
		else
		{
			mode=2;
			var pgchd=setInc()
			if (shiftPage||pgchd) 
				changePage(page,true,null,null,"vm",trig,null,d1,d2)
			else
			{
				var lpg=_page.left,itl=book.pages[lpg.idx].internal
				if ((lpg.url!=getPageURL(page))||(itl=="pict")||(itl=="mult")||(itl=="tpl"))
					changePage(page,true,null,null,"vm",trig,true,d1,d2)
				else
				{
					var oldl=_page["left"].idx+1, oldr=_page["right"].idx+1
					book.trackPage("vm",trig,page,oldl,oldr,d1,d2)
				}
			}
		}
		refresh("pagemode")
	}
}
function rImg(u,id,w,h,dx,dy,cb,tip,inr,st,clss,att)
{
	if (dx!=-1&&dy!=-1) 
		return '<div '+(att?att:'')+(clss?' class="'+clss+'"':'')+' id="'+id+'" '+attr("onclick",cb)+attr("title",tip)+' style="font-size:1px; position:absolute; '+sty("cursor",(cb?_hand:null))+'background-image:url('+u+');width:'+w+'px;height:'+h+'px;'+'background-position:'+((-1)*dx)+'px '+((-1)*dy)+'px;'+(st?st:"")+'">'+(inr?inr:"")+'</div>';
	else 
	{
		if (u.match(/^file/)) u=u.substring(7)
		return '<div '+(att?att:'')+(clss?' class="'+clss+'"':'')+' id="'+id+'" '+attr("onclick",cb)+attr("title",tip)+' style="font-size:1px; position:absolute; '+sty("cursor",(cb?_hand:null))+'width:'+w+'px;height:'+h+'px;'+(st?st:"")+'">'+(inr?inr:"")+'</div>';
	}
}
function foc(){self.focus()}
function arrow(pl) {changePage(_Book.page+book.inc*pl)}
function writeImgs(x,y)
{
	x=(x==null?0:x); y=(y==null?0:y)
	var s=""
	with(gui)
		for ( var i=0;i<imgs.length;i++ )
			with(imgs[i]) s+=SK(url,"imgs"+i,sw,sh,w,h,dx,dy);
	return s
}
function moveImgs(x,y)
{
	x=(x==null?0:x); y=(y==null?0:y)
	with(gui)
		for ( var i=0;i<imgs.length;i++ )
			with(imgs[i]) ML("imgs"+i,l+x,t+y)
}
function writeInHeader()
{
	var s=''
	s+='<STYLE TYPE="text/css"><!--'+_sty2['.theLogo']+_sty2[".ptitle"]+_sty2[".pnumber"]+_sty2["A.ptitle:active"]+_sty2["A.ptitle:link"]+_sty2["A.ptitle:visited"]+_sty['.Normal']+'.abs{margin:0px;visibility:hidden;position:absolute;top:0px;left:0px;border-width:0px;width:1px;height:1px;}'
	s+='.ifabs{margin:0px;position:absolute;top:'+sh+'px;left:'+sw+'px;border:0px;}'
	for ( var i=0; i<gElems.length; i++ )
		s+=gElems[i].css()
	s+='--></STYLE>'
	wri(s)
}
function ifr(id,zind,u,att){return '<iframe style="z-index:'+zind+'" frameborder="0" class="ifabs" name="'+id+'" id="'+id+'"  src="'+u+'" '+(att?att:"")+'></iframe>'}
function gBook_write()
{
	SetFlipMode()
	var s=''
	s+=this.bg?this.bg.source():''
	with(gui)
	{
		s+=SK("vtile.gif","lTBg",sw,sh,bgmid.lw,0,bgmid.dx,0)+
		SK("vtile.gif","rTBg",sw,sh,bgmid.rw,0,bgmid.dx+bgmid.lw,0)+
		
		SK("htile.gif","tTBg",sw,sh,-sw,bgceil.h,0,bgceil.dy)+
		SK("notile.gif","tleftBg",sw,sh,bgceil.lw,bgceil.h,bgceil.dx,0)+
		SK("notile.gif","trightBg",sw,sh,bgceil.rw,bgceil.h,bgceil.dx+bgceil.lw,0)+

		SK("htile.gif","bTBg",sw,sh,-sw,bgbase.h,0,bgbase.dy)+
		SK("notile.gif","bleftBg",sw,sh,bgbase.lw,bgbase.h,bgbase.dx,0)+
		SK("notile.gif","brightBg",sw,sh,bgbase.rw,bgbase.h,bgbase.dx+bgbase.lw,0)+
		
		SK("vtile.gif","lT",sw,sh,kmid.lw,0,kmid.dx,0)+
		SK("vtile.gif","rT",sw,sh,kmid.rw,0,kmid.dx+kmid.lw+kmid.mw,0)+
		SK("htile.gif","tT",sw,sh,0,ktop.h,0,ktop.dy) +
		SK("htile.gif","bT",sw,sh,0,kbot.h,0,kbot.dy)+
		SK("vtile.gif","mT",sw,sh,kmid.mw,0,kmid.dx+kmid.lw,0)+

		lyr(0,ceil.h,"","",true,"colorleft",mw,mh)+
		lyr(0,ceil.h,"","",true,"colorright",mw,mh)+
		lyr(0,ceil.h,"","",true,"patternleft",mw,mh)+
		lyr(0,ceil.h,"","",true,"patternright",mw,mh)+

		SK("notile.gif","tleft",sw,sh,ktop.lw,ktop.h,ktop.dx,0)+
		SK("notile.gif","tm",sw,sh,ktop.mw,ktop.h,ktop.dx+ktop.lw,0)+	
		SK("notile.gif","tright",sw,sh,ktop.rw,ktop.h,ktop.dx+ktop.lw+ktop.mw,0)+
				
		SK("notile.gif","bleft",sw,sh,kbot.lw,kbot.h,kbot.dx,0)+
		SK("notile.gif","bm",sw,sh,kbot.mw,kbot.h,kbot.dx+kbot.lw,0)+
		SK("notile.gif","bright",sw,sh,kbot.rw,kbot.h,kbot.dx+kbot.lw+kbot.mw,0)+
		
		writeImgs(_Book.l,_Book.t)+

		lyr(sw,sh,"<span class='theLogo'>&nbsp;KeeBook &#8482;</span>","",true,"logo",mw,mh)+
		lyr(0,0,"","",true,"logoLnk",mw,mh)+

		lyr(0,0,"","",true,"lTLnk")+
		lyr(0,0,"","",true,"rTLnk")+

		ifr("f1",100,_common+"empty.htm",' scrolling="auto"')+
		ifr("f2",100,_common+"empty.htm",' scrolling="auto"')+
		ifr("mf1",100,_common+"empty.htm",' scrolling="auto"')+
		ifr("mf2",100,_common+"empty.htm",' scrolling="auto"')+

		lyr(sw,sh,"","",true,"leftTitle",mw,mh)+lyr(sw,sh,"","",true,"leftFolio",mw,mh)+
		lyr(sw,sh,"","",true,"rightTitle",mw,mh)+lyr(sw,sh,"","",true,"rightFolio",mw,mh)+

		lyr(0,0,""," style='z-index:1000000;' ",true,"animContainer",_moz?null:1,_moz?null:1)+
		lyr(0,0,"","",false,"tmp",_moz?null:1,_moz?null:1)+
		lyr(0,0,"","",false,"scriptdiv",_moz?null:1,_moz?null:1)+
		
		'<span id="tmpLayer" style="visibility:hidden;">&nbsp;</span>'
	}
	for (var i=0;i<gElems.length;i++ )
		s+=gElems[i].source()
	if (this.scroll) s+=this.scroll.writeHTML()
	wri(s)
}
function gBook_load()
{
	f_leftpage = layerElem("f1")
	f_rightpage = layerElem("f2")
	mf_leftpage = layerElem("mf1")
	mf_rightpage = layerElem("mf2")

	if (_ie)
		with(document.body)
		{ 
			link=fg; aLink=fg; vLink=fg; 
			scroll=(this.w==null&&this.h==null)?"no":"auto"
		}	
	gui.logo.w=GetTextWidth("&nbsp;KeeBook &#8482;","theLogo"); 
	gui.logo.h=layerHeight("logo")

	if ( params.wmargin ) this.l = parseInt(params.wmargin)
	if ( params.hmargin ) this.t = parseInt(params.hmargin)
	
	GetGlobalSizes(this, parent)
	if(this.bg) this.bg.load()

	WL(trLnk("lnk",gui.logo.w,gui.logo.h,"about()","logoOverCB()","logoOutCB()"),"logoLnk")

	initTitle()
	gui.titles.margin=(gui.titles.margin==null?0:gui.titles.margin)

	for (var i=0;i<gElems.length;i++ )
		s+=gElems[i].load()

	this.resize(true)

	bordCol("colorleft",bg);
	bordCol("colorright",bg);

	SLS(true,"lTBg","rTBg","tTBg","tleftBg","trightBg","bTBg","bleftBg","brightBg")
	SLS(true,"lT","mT","rT","tT","bT","tright","tleft","tm","bleft","bm","bright","logo","logoLnk")
			
	for (var i=0;i<gui.imgs.length;i++)
		SL(true,"imgs"+i)
}

function gBook_resize(init,force,toolbar)
{
	if(!init) GetGlobalSizes(this)
	showElems(false)
	this.resizeBook(init)	
	this.resizePages(init)
	this.resizeElems(init,force,toolbar)
	showElems(true)
}
function gBook_resizeBook(init)
{
	if (this.bg) this.bg.resize()
	with(gui)
	{
		if (!this.centered&&((wb==oldW)&&(hb==oldH))) return;
		oldW=wb;oldH=hb

		ML("tleftBg",x0t,y1-ceil.h+bgceil.t)
		RL("tTBg",x7t-(x0t+bgceil.lw),bgceil.h)
		ML("tTBg",x0t+bgceil.lw,y1-ceil.h+bgceil.t)
		ML("trightBg",x7t,y1-ceil.h+bgceil.t)		
		
		RL("lTBg",bgmid.lw,h1); ML("lTBg",x0)
		RL("rTBg",bgmid.rw,h1); ML("rTBg",x7)
		MLS("lTBg","rTBg",null,y1)

		if ( toolbar.dynamic!=true )
		{
			RL("bleftBg",bgbase.lw,toolbar.show?bgbase.h:Math.min(base.h-bgbase.t,bgbase.h))
			ML("bleftBg",x0b,y2+bgbase.t)

			RL("bTBg",x7b-(x0b+bgbase.lw),toolbar.show?bgbase.h:Math.min(base.h-bgbase.t,bgbase.h))
			ML("bTBg",x0b+bgbase.lw,y2+bgbase.t)

			RL("brightBg",bgbase.rw,toolbar.show?bgbase.h:Math.min(base.h-bgbase.t,bgbase.h))
			ML("brightBg",x7b,y2+bgbase.t)
		}
		else
		{
			SCR(layerCSS("bleftBg"),0,(toolbar.show?0:toolbar.h),bgbase.lw,bgbase.h)
			ML("bleftBg",x0b,y2+bgbase.t+(toolbar.show?0:-toolbar.h))

			RL("bTBg",x7b-(x0b+bgbase.lw),bgbase.h)
			ML("bTBg",x0b+bgbase.lw,y2+bgbase.t+(toolbar.show?0:-toolbar.h))

			SCR(layerCSS("brightBg"),0,(toolbar.show?0:toolbar.h),bgbase.rw,bgbase.h)
			ML("brightBg",x7b,y2+bgbase.t+(toolbar.show?0:-toolbar.h))
		}

		ML("tleft",x1t)
		RL("lT",kmid.lw,h1)
		ML("lT",x1)
		RL("lTLnk",lm+kmid.lw,h1)
		WL(trLnk("lnk",lm+kmid.lw,h1,"return changePageCB(\"p\",\"bord\")","trLnkMouseOver(\"prev\")","setHelpText()"),"lTLnk")
		ML("bleft",x1b,y2)

		RL("colorleft",fill.lcb+wL+fill.mlcb,h1+fill.ch+fill.bh)
		ML("colorleft",xL-fill.lcb,y1-fill.ch)
		RL("patternleft",fill.lcb+wL+fill.mlcb,h1+fill.ch+fill.bh)
		ML("patternleft",xL-fill.lcb,y1-fill.ch)
		
		ML("tright",x5t,null)
		RL("rT",kmid.rw,h1)
		ML("rT",x5,ceil.h)
		RL("rTLnk",rm+kmid.rw,h1)
		WL(trLnk("lnk",rm+kmid.rw,h1,"return changePageCB(\"n\",\"bord\")","trLnkMouseOver(\"next\")","setHelpText()"),"rTLnk")				
		ML("bright",x5b,y2)
	
		if ( this.mode==2 )
		{
			RL("colorright",fill.mrcb+wR+fill.rcb,h1+fill.ch+fill.bh)
			ML("colorright",xR-fill.mrcb,y1-fill.ch)
			RL("patternright",fill.mrcb+wR+fill.rcb,h1+fill.ch+fill.bh)
			ML("patternright",xR-fill.mrcb,y1-fill.ch)	
		}
		else
		{
			RL("colorright",fill.lcb+wR+fill.rcb,h1+fill.ch+fill.bh)
			ML("colorright",xR-fill.lcb,y1-fill.ch)
			RL("patternright",fill.lcb+wR+fill.rcb,h1+fill.ch+fill.bh)
			ML("patternright",xR-fill.lcb,y1-fill.ch)	
		}
	
		RL("tT",x5t-x2t,ktop.h)	
		ML("tT",x2t)
		RL("bT",x5b-x2b,kbot.h)	
		ML("bT",x2b,y2)		
		
		ML("tm",x3t)
		RL("mT",kmid.mw,h1+ktop.h+kbot.h)
		ML("mT",x3,y1-ktop.h)
		ML("bm",x3b,y2)

		MLS("lT","rT",null,y1)
		MLS("tleft","tright","tm","tT",null,y1-ktop.h)

		logo.l=x5-logo.w-logo.margin
		MLS("logo","logoLnk",logo.l,y1-ceil.h+logo.t)
	}
	moveImgs(this.l,this.t)
}
function gBook_resizePages(init)
{
	if ( init ) return
	with(gui)
	{
		if (this.mode==2)
		{
			if ( !isAnimated || !left )
			{	
				RL(f_leftpage.id,wL,hp)
				RL(mf_leftpage.id,wL,hp)
				ML(f_leftpage.id,x2,yp)
				ML(mf_leftpage.id,sw,sh)
			}
			RL("leftTitle",wL-2*titles.margin,titles.h)
			ML("leftTitle",x2+titles.margin,y1-ceil.h+titles.t)
			ML("leftFolio",x3-(titles.margin+titles.pgw),y1-ceil.h+titles.t)
		}
		else
			MLS(f_leftpage.id,mf_leftpage.id,"leftTitle","leftFolio",sw,sh)
		
		if ( !isAnimated || !right )
		{
			RL(f_rightpage.id,wR,hp)
			RL(mf_rightpage.id,wR,hp)
			ML(f_rightpage.id,xR,yp)
			ML(mf_rightpage.id,sw,sh)
		}
		RL("rightTitle",wR-2*titles.margin,titles.h)
		ML("rightTitle",xR+titles.margin,y1-ceil.h+titles.t)
		ML("rightFolio",x5-(titles.margin+titles.pgw),y1-ceil.h+titles.t)
	}
	updtPages()
}
function gBook_resizeElems(init,force,toolbar)
{
	if ( init )
	{
		for (var i=0;i<gElems.length;i++ )
			gElems[i].resize(init)
	}
	else
	{
		updateElems()
	}
}
function showElems(f)
{
	for (var i=0;i<gElems.length;i++ )
		gElems[i].show(f)
}
function updateElems( toolbar )
{
	for (var i=0;i<gElems.length;i++ )
		gElems[i].resize(false,toolbar)
	updtLinks()
}

function loadCB()
{
	_Book.load()
	process.preloadRefresh(true)
	book.load()
	parent.document.getElementById("Process").style.left = -2*screen.availWidth
	setTimeout( "showDelayed()", 100 )
}
function showDelayed()
{	
	_Book.resizePages()
	parent.document.getElementById("KeeBook").style.left = 0
	parent.document.getElementById("KeeBook").style.top = 0
	parent.document.getElementById("KeeBook").style.visibility = "visible"
	
	foc()
}
var resizeTO 
function resizeCB() 
{ 
	if ( resizeTO )
	{
		clearTimeout( resizeTO )
		resizeTO = null
	}
	resizeTO = setTimeout( "doResize()", 250 )
}
function doResize() { _Book.resize(); }

document.ondragstart=new Function('return false')
document.onselectstart=new Function('return false')
document.oncontextmenu=new Function('return false')

window.onload=loadCB
parent.onresize=resizeCB

_Book.init();
process.preloadRefresh(true)
