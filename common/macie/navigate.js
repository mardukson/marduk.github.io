var _idCnt=1
var _isInit=false
var _wrappers=new Array,_forceexpand=null,_expand=true,_theWins=new Array
var _searchWord='',_found=new Array, _findInTitles=true,_findInPages=true
var _max_tree_lines=40

var _currDomain=document.location.hostname,_prot=document.location.protocol
if( document.location.href.match( /^sevenix:\((.*)\)(.*)$/ ) )
{
	var tab = RegExp.$2.split('/')
	_prot=tab[0]
	_currDomain=tab[2]
}
var _currLocation=_prot+"//"+_currDomain
var _isWebKeeBook=true,_neu='',_localized='',_contents='',_common='',bannCnt=0,_inc='',_resources=''
var _partner=null,_mode=0,_dyn=false,_engineVersion='2.4',_docVersion='2.4',_docVersionLabel='2.4',_fromFind=-1
var _basePath=_root=getPath(parent.document)
var _langName='',_lookName='',_keebooTopFrameset='here',_closePopups=true

var EnginePath = parent.EnginePath, GenerateTOC = parent.GenerateTOC;

function _KB_Book(title,id)
{
	this.title=convStr(title);this.oldTitle=title;this.id=id?id:"NULL";this.author=new _KB_Author;
	this.initialize=true;this.pages=new Array;this.tabs=new Array;this.tabs[0]=1
	this.params=new Array

	this.setParam=setPar
	
	this.KBSetAuthor=setAuthor
	this.KBSetTitle=setTitle
	this.KBSetBookID=this.KBSetBookId=setId
	this.KBSetSkin=this.KBSetDefaultSkin=setDSkin
	this.KBSetLanguage=this.KBSetDefaultLanguage=setDLang
	this.KBSetPreloadKBK=setPreloadKBK
	this.KBSetToolbarMode=setToolbarMode
	this.KBSetPageMode=this.KBSetDefaultPageMode=this.KBSetDefaultModePage=setDMode
	this.KBDisableToolbar=disToolbar
	this.KBSetPreloadMode=setDPre
	this.KBSetDefaultPreloadMode=setDPreOld
}
function _KB_Author(){this.name=this.email=this.comment=this.photo=this.url=this.tip=null}

function setPar(name,val,force){with(this){params[name]=new Array;params[name]["val"]=val;params[name]["force"]=force?true:false}}
function setDLang(l,force){this.setParam("language",l,false)}
function setDSkin(s){this.setParam("skin",s,true)}
function setPreloadKBK(f) {this.setParam("gpreload",f,true)}
function setAuthor(n,m,c,p,u,tp){with (this.author){name=convStr(n);email=m;comment=c;photo=p;url=u;tip=tp}}
function setTitle(s){this.title=convStr(s);this.oldTitle=s}
function setId(id){this.id=id}
function setToolbarMode(f){this.setParam("toolbarmode",f,true)}
function setDMode(m){this.setParam("pagemode",m,true)}
function disToolbar(f){this.setParam("enabletoolbar",!f,true)}
function setDPre(m,dly){this.setParam("preloadmode",m,true);this.delay=dly}
function setDPreOld(m,force,dly){this.setParam("preloadmode",m,force);this.delay=dly}
var params = new Object

function getSessionId()
{
	var dt = new Date()
	var s=""+(""+Math.round(1000*(1+Math.random()))).slice(1,4)+dt.getTime()
	return s	
}
function extrPath(p)
{
	var sep=p.indexOf("?")
	if (sep>=0) p=p.slice(0,sep)
	p=p.replace(/\\/g,"/")
	if (_ns&&(p[p.length-1]=='/')) return p
	p=p.slice(0,p.lastIndexOf("/"))+"/"
	return rplP(p,"'",escape("'"))
}
function calPath(root,p,addSlash)
{
	if (!testStr(p)) return p
	if (addSlash==null) addSlash=true
	var rel=true

	if(p.match(/^(.*):(.*)/)) rel=false
	if ((addSlash)&&(p.slice(p.length - 1,p.length)!='/')) p+='/'
	if (root.slice(root.length - 1,root.length)!='/') root+='/'
	if (p.slice(0,1)=='/')
	{
		rel=false
		p=_currLocation+p
	}
	if (rel) p=root+p
	return rplP(p,"'",escape("'"))
}
function decodeParam(s,p)
{
	if (s)
	{
		var oldN=p.startpagenumber,oldID=p.startpageid,old=true
		p.startpagenumber=p.startpageid=null

		if ((s.length>0)&&(s.charAt(0)=="?")) s=s.slice(1)
		var s1=s.split("&")
		for (var i in s1)
		{
			s2=s1[i].split("=")
			if (s2.length==2) p[(s2[0]).toLowerCase()]=s2[1]
		}

		if (p.startpagenumber) old=false
		if (p.startpageid) {p.startpagenumber=null;old=false}
		if (old) {p.startpagenumber=oldN,p.startpageid=oldID}
	}
}

function rplP(str,par,val){return str.replace(new RegExp(par,"g"),val)}
function putInfoCB(){if (_closePopups&&!_macIE) for (var i in _theWins) if ((_theWins[i]!=null)&&!_theWins[i].closed) _theWins[i].close()}
function getPath(doc){return extrPath(doc.location.href)}

function getBookParams(p)
{
	var oldN=p.startpagenumber,oldID=p.startpageid,old=true
	p.startpagenumber=p.startpageid=null
	var bp=book.params;for (var i in bp) p[i]=bp[i].val
	if (p.startpagenumber) old=false
	if (p.startpageid) {p.startpagenumber=null;old=false}
	if (old) {p.startpagenumber=oldN,p.startpageid=oldID}
}

function setDocVersion(ver,verLab){_docVersion=ver;_docVersionLabel=verLab;if (Generator==null) Generator="KeeBook Publishing&#153; "+_docVersion}


var _vers=parent._engineVer.split(";")
var	AuthorUser,ReaderUser,AuthorSKU,ReaderSKU,AuthorPartner,ReaderPartner,ReaderAutorunCount,Generator
AuthorSKU="DynamicKeeBoo-"+_vers[0]
ReaderSKU="DynamicKeeBoo-"+_vers[0]
ReaderPartner=AuthorPartner
ReaderAutorunCount=0
		
var _slideShowTimer=5

with(_KB_Book )
{
	var p = prototype
	p.audience=true;p.pagetracking=true;
	p.branding=new _KB_Branding;p.chapter=new _KB_Chapter(null,'');
	p.currCh=p.chapter;
	p.extCount=p.intCount=0;p.flip=2;p.inc=1,p.extendedUrl=null;
	p.customData=new Array;p.delay=null;p.color=null;p.colTitle=null;p.pattern_url=null;p.preloadmode=false;p.preload=null;
	p.titleVis=null;p.framed=false;p.printing=false;p.printingfile="";
	p.bg=new _KB_Background();p.slideShow=new _KB_SlideShow;p.flipAnimation=new _KB_Animation;
	p.Buttons=new Array
	p.sessionid=getSessionId()
	
	p.KBSetBranding=setBrand
	p.KBSetBrandTocSize=setBrandSize
	p.KBPushChapter=pushCh 
	p.KBPopChapter=popCh
	p.KBSetPrinting=setPrinting
	p.KBInsertPage=insPage
	p.KBInsertPicture=insPict
	p.KBInsertMultimediaDocument=insMult
	p.KBInsertTemplatePage=insTpl
	p.KBSetAudience=setAud
	p.KBSetPageTracking=setPgTrack
	p.KBAddBrandingData=setBrDat
	p.KBAddCustomData=addCust
	p.KBSetStartPageID=p.KBSetDefaultStartPageID=p.KBSetDefaultPage=setDPage
	p.KBSetStartPageNumber=p.KBSetDefaultStartPageNumber=setDPageN
	p.KBRelPath=relPath
	p.getPageById=getPgById
	p.commonInsPg=commInsPg
	p.KBSetDefaultBorderColor=setCol
	p.KBSetDefaultBorderPattern=setBorderPattern
	p.KBSetDefaultTitleColor=setTitleColor
	p.KBSetFlipPageMode=setFlip
	p.KBDisableSystemPage=disSysPage
	p.KBGetSystemPage=getSysPage
	p.KBSetSystemPageUrl=setSysPageUrl
	p.KBHideAllTitles=hideTi
	p.KBSetFrame=setFrame
	p.KBSetTabFont=setTabFont
	p.KBSetSlideShow=setSlideShow
	p.KBSetFlipAnimation=setFlipAnim
	p.KBSetDimensions=setDim
	p.KBSetBackground=setBg
	p.getCol = getCol
	p.getPat = getPat
	p.KBAddToolbarButton=TB_AddButton

	p.generate=Book_generate
	p.load=Book_load
}

function _KB_Branding(){this.logoPath=this.logoUrl=this.indexPath=this.indexUrl=this.tocPath=this.tocUrl=this.logoTip=this.idxTip=this.tocTip=null;this.tocW=this.tocH=0;this.tocFit=true}
function _KB_Chapter(parent,title,tp)
{
	this.parent=parent;this.items=new Array;this.title=convStr(title)
	this.oldTitle=title;this.isChapter=true;this.internal='chapter';this.tab=null
	this.page=0;this.addItem=_KBC_addItem;this.enhanced=false;this.tip=convStr(tp,true)
	this.isInDomain=true;this.id="_KBinternal"+(_idCnt++);this.color=null;this.colTitle=null;this.side=null;this.pattern_url=null;
	this.KBSetID=setId
	this.KBGetID=getId
	this.KBSetBorderColor=setCol
	this.KBSetBookSide=setSide
	this.titleVis=null
	this.KBHideTitle=hideTi
	this.KBShowTitle=showTi
	this.KBSetTab=setTab
	this.TOCRef=true
	this.KBSetBorderPattern=setBorderPattern
	this.KBSetTitleColor=setTitleColor

	this.getCol = getCol
	this.getPat = getPat
}
function _KB_Page(title,url,file,internal,enhanced,tp,biblio)
{
	this.oldurl=url;
	
	if (url)
	{
		url=rplP(url,"'",escape("'"))
		url=rplP(url," ",escape(" "))
	}

	this.title=convStr(title);this.oldTitle=title;this.url=url;this.file=file;this.color=null;this.colTitle=null;this.cap=new Object;this.tab=null
	this.isChapter=false;this.internal=internal;this.enhanced=enhanced;this.tip=convStr(tp,true)
	this.biblio=convStr(biblio);this.page=0;this.isInDomain=sameDomain(this);this.side=null;this.parent=null
	this.TOCRef=true;this.titleVis=null;this.preload=true;this.pattern_url=null;
	this.moved=false;this.loaded=false;this.error=false;this.sticker=new Array;
	this.sysVisible=false;
		
	this.KBAddSticker=addSti
	this.KBFillTemplatePage=fillTpl
	this.KBSetID=setId
	this.KBGetID=getId
	this.id="_KBinternal"+(_idCnt++)
	this.KBSetBorderColor=setCol
	this.KBSetBookSide=setSide
	this.KBAddCaption=addCap
	this.KBSetTab=setTab
	this.KBHideTitle=hideTi
	this.KBShowTitle=showTi
	this.KBDisableReferencing=disTOCRef
	this.KBDisableBackgroundLoading=disPreload
	this.KBSetBorderPattern=setBorderPattern
	this.KBSetTitleColor=setTitleColor
	this.KBSetFrame=setFrame

	this.getCol = getCol
	this.getPat = getPat
}

function _KB_SlideShow(timer,loop)
{
	this.timer=(timer==null?_slideShowTimer:timer);
	this.loop=(loop==null?true:loop)
	this.running=false		
	this.startpage=0
	this.curpage=0
	this.nextpage=0
	this.nbPagesToLoad=0
	this.privateTimer=60000
	this.privateTO=null
	this.publicTO=null
	this.start=startSlideShow
	this.stop=stopSlideShow
	this.next=nextSlideShow
	this.loadpageEvent=loadPageEventSlideShow
}
function startSlideShow() {
	if (TB) TB.GetIcon("ico_slideshow").SetState("ON")
	this.startpage=_Book.page
	this.curpage=this.startpage
	this.interval=null
	this.running=_T
	this.next()
}
function stopSlideShow() {
	this.running=false
	if (this.privateTO) {clearTimeout(this.privateTO);this.privateTO=null;}
	if (this.publicTO) {clearTimeout(this.publicTO);this.publicTO=null;}
	if (TB)	TB.GetIcon("ico_slideshow").SetState("OFF")
}
function nextSlideShow() 
{
	var t = ( typeof(animTimeLeft)=="undefined"?0:animTimeLeft() )
	if(t) 
	{
		setTimeout("book.slideShow.next()",t);
		return
	}
	if ( this.curpage==book.pages.length-_Book.mode )
		this.nextpage=0
	else
	{
		this.nextpage=_Book.page
		this.nextpage=Math.min(this.nextpage+book.inc,book.pages.length-_Book.mode)
	}
	
	this.nbPagesToLoad=_Book.mode
	changePage(this.nextpage,_T,null,null,"np","slid")

	this.curpage=this.nextpage
	if (this.loop==_T||this.curpage!=this.startpage ) {
		if (this.privateTO!=null) {
			clearTimeout(this.privateTO);
			this.privateTO=null;
		}
		this.privateTO=setTimeout("book.slideShow.next()",this.privateTimer);
	}
	else
		this.stop()
}
function delayedNext()
{
	book.slideShow.next()
}
function loadPageEventSlideShow(side) 
{
	if ( this.running )
	{
		this.nbPagesToLoad--
		if (this.nbPagesToLoad==0) {
			if (this.privateTO) {
				clearTimeout(this.privateTO)
				this.privateTO=null
			}
			this.publicTO=setTimeout("delayedNext()",(this.timer+(typeof(animTimeMinDuration)=="undefined"?0:animTimeMinDuration()))*1000);
		}
	}
}

function TreeListWrapper(ch,par)
{
	this.chapter=ch;this.sub=new Array;this.parent=par;this.expanded=_expand;this.x=0;this.y=0
	if (par==null) this.selection=new Array
	with (ch) {
		
		this.expanded=_forceexpand
		if (this.expanded==null)
			this.expanded=!(book.pages.length > _max_tree_lines)

		for (var i=0; i<items.length; i++) 
			if (items[i].isChapter) 
				this.sub[this.sub.length]=new TreeListWrapper(items[i],this)
	}
}
function getChapterByPage(pg)
{
	var i=book.pages[pg]
	if (i.internal=='toc') return book.chapter
	if (i.isChapter) return i
	return null
}
function getWrapper(pg,ext)
{
	if (pg==null) return null
	var ch=getChapterByPage(pg)
	if (ch==null) return null
	var id=(ext?"E":"W")+pg
	if (_wrappers[id]==null) _wrappers[id]=new TreeListWrapper(ch)
	return _wrappers[id]
}


function addThumbnailImage(url,id,tip)
{
	var thumb = new Object
	thumb.url = url; thumb.id=id; thumb.tip = tip
	this.args[this.args.length] = thumb
}

function TB_AddButton(id,cb,st) {
	var btn = new _KB_Icon(id,cb,st)
	this.Buttons[this.Buttons.length] = btn
	return btn
}
function _KB_Icon(id,cb,st) {
	this.id=id
	this.callback=cb
	this.State=st
	this.States=new Array
	this.KBAddState=iconAddState
}
function iconAddState(sid,text,info,img,dx,dy,w,h) {
	var st = new _KB_State(sid,text,info,img,dx,dy,w,h)
	this.States[this.States.length]=st
}
function _KB_State(sid,text,info,img,dx,dy,w,h)
{
	this.sid=sid
	this.text=text
	this.info=info
	this.img=img
	this.dx=dx
	this.dy=dy
	this.w=w
	this.h=h
}

with(_KB_Book)
{
	prototype.trackBook = trackBook
	prototype.trackPage = trackPage
	prototype.trackLink = trackLink
}

var maxcar=100
function trackBook()
{
	return true
	if (this.audience)
	{
		var u=(parent._AudienceUrl==null?"http://keebooks.keeboo.com/redirect/bookaudience.php":parent._AudienceUrl)
		u+="?sid="+this.sessionid+"&Lang="+_langName+"&Look="+_lookName+"&BookTitle="+escape(book.oldTitle.slice(0,maxcar))+"&WebBookVersion="+escape(_docVersion)
		u+="&BookID="+(testStr(this.id)?escape(this.id):"")
		u+="&AuthorUser="+(testStr(AuthorUser)?escape(AuthorUser):"")
		u+="&AuthorPartner="+(testStr(AuthorPartner)?escape(AuthorPartner):"")
		u+="&ReaderUser="+(testStr(ReaderUser)?escape(ReaderUser):"")
		trackImg(u)
	}
}

function trackPage(ope,trig,target,old1,old2,d1,d2)
{
	return true
	if (this.pagetracking)
	{
		var u=(parent._PageTrackingUrl==null?"http://keebooks.keeboo.com/redirect/pageaudience.php":parent._PageTrackingUrl)
	
		if ( ope=="np"||ope=="pp"||(ope=="gp"&&trig=="nav") ) target=-1

		u+="?sid="+this.sessionid
		u+="&ope="+(testStr(ope)?ope:"")
		u+="&trig="+(testStr(trig)?trig:"")
		u+="&d1="+(testStr(d1)?escape(d1):"")
		u+="&d2="+(testStr(d2)?escape(d2):"")
		u+="&mod="+_Book.mode
		if(_Book.mode==2)
			with(book.pages[_page["left"].idx])
				u+="&ln="+page+"&lid="+escape(id)+"&lin="+(old1==page||old2==page?0:1)
		else
			u+="&ln=&lid=&lin="
		with(book.pages[_page["right"].idx])
			u+="&rn="+page+"&rid="+escape(id)+"&rin="+(old1==page||old2==page?0:1)
		if ( target != -1 )
		{
			var tp = _page["left"].idx==target?_page["left"].idx:_page["right"].idx
			with(book.pages[tp])
				u+="&tn="+page+"&tid="+escape(id)+"&tin="+(old1==page||old2==page?0:1)
		}
		else 
			u+="&tn=&tid=&tin="
		u+="&ver="+escape(_docVersion)+"&api="+escape(Generator)
		u+="&bid="+(testStr(book.id)?escape(book.id):"")
		u+="&aut="+(testStr(AuthorUser)?escape(AuthorUser):"")
		u+="&par="+(testStr(AuthorPartner)?escape(AuthorPartner):"")
		u+="&tit="+escape(book.oldTitle.slice(0,maxcar))
		trackImg(u)
	}
}
function trackLink(typ,pg,url)
{
	return true
	if (this.pagetracking)
	{
		var u=(parent._PageTrackingUrl==null?"http://keebooks.keeboo.com/redirect/externallinkaudience.php":parent._PageTrackingUrl),p=""
		p+="LinkType="+typ
		p+="&Url="+escape(url)
		p+="&PageID="+pg
		p+="&BookID="+(testStr(this.id)?escape(this.id):"")
		p+="&SessionID="+this.sessionid
		trackImg(u+"?"+p)
	}
}
var tImg 
function trackImgLoad() { tStack.pop(); }
function trackElem(u)
{
	this.u = u
	this.next = null
}
function trackStackLoad()
{
	with( tStack )
	{
		if ( root && root.u )
		{
			tImg = new Image
			tImg.onload=trackImgLoad
			tImg.src=root.u
			to = setTimeout("tStack.pop()",10000)
		}
	}
}
function trackStackPush(u)
{
	if (u==null||u=="") return
	with( this )
	{
		if ( root==null )
		{
			root = new trackElem(u)
			last = root
			trackStackLoad()
		}
		else
		{
			last.next = new trackElem(u)
			last = last.next
		}
	}
}
function trackStackPop()
{

	with( this )
	{
		if ( to ) { clearTimeout(to); to=null; }
		if ( root )
		{
			root = root.next
			trackStackLoad()
		}
	}		
}
function trackStack()
{
	this.root = null
	this.last = null
	this.push = trackStackPush
	this.pop = trackStackPop
	this.to = null
}
var tStack = new trackStack()
function trackImg(u) { tStack.push(u); }





function getSysPage(type)
{
	type=type.toLowerCase()
	if (type=="private") type="_private"
	return this.sysPage?this.sysPage[type]:null
}

function disSysPage(type)
{
	var p=this.KBGetSystemPage(type)
	if  (p!=null) p.sysVisible=false;
}

function setSysPageUrl(type,url)
{
	var p=this.KBGetSystemPage(type)
	if  (p!=null) p.url=urlDecode(url)
	return p
}

function intPage(book,itnl,pgid) 
{
	with(book)
	{
		var p=new _KB_Page(null,null,null,itnl,false);
		p.id=(pgid?pgid:p.id);
		return p
	}
}

function hideTi() {this.titleVis=false}
function showTi() {this.titleVis=true}

function disTOCRef(ref){this.TOCRef=false}
function disPreload(){this.preload=false}
function setBorderPattern(url) {this.pattern_url = url}
function setTitleColor(color) {this.colTitle = color;}

function setBrandSize(fit,w,h) {with (this.branding){tocW=w;tocH=h;tocFit=fit}}
function pushCh(t,tp)
{
	var c;with (this)
	{
		c=new _KB_Chapter(currCh,t,tp);
		//c.KBSetBorderColor(bg)
		if (!this.sysPage.contents.sysVisible) return c;
		//if(currCh.parent==null) c.KBSetTab(getTitle(c))
		currCh.addItem(this,c);
		currCh=c
	}
	return c
}

function popCh(){if (!this.sysPage.contents.sysVisible) return;with (this) if (currCh.parent) currCh=currCh.parent}
function setAud(b){this.audience=b}
function setPgTrack(b){this.pagetracking=b}
function setBrDat(key,urlType,val){var c=this.customData;if (!c[key]) c[key]=new Array;c[key][urlType]=val}
function addCust(key,val){this.KBAddBrandingData(key,"ImageURL",val);this.KBAddBrandingData(key,"ClickURL",val)}

function setDPage(p){this.setParam("startpageid",p,true);}
function setDPageN(p){this.setParam("startpagenumber",p,true);}

function relPath(u){return calPath(_basePath,u,false)}
function getId(){return this.id}
function fillTpl(){var a1=fillTpl.arguments,a2=new Array;for (var i=0;i<a1.length;i++) a2[a2.length]=a1[i];if(this.args==null)this.args=new Array; this.args[this.args.length]=a2}
function getPageTitle(index,old){return getTitle(book.pages[index],old)}
function setCol(col,colTitle){this.color=col;if (colTitle) this.colTitle=colTitle}
function getCol(){return (this.color==null?(book.color==null?bg:book.color):this.color);}
function getPat(){return this.pattern_url;}
function setFlip(flip){this.flip=(flip.toLowerCase()=="fliptwopages")?2:1}
function setFrame(f){this.framed=f;}

function setSide(s)
{
	switch(this.internal)
	{
		case "author": 
		case "advert": 
		case "biblio": 
		case "toc": 
		break;
		default:
			this.side=s;
		break;	
	}
}
function getPgById(id,lastid,lastdt)
{
	id=id.toLowerCase()
	switch(id)
	{
		case "toc": 
			id="kbidtocpage";
			break;
		case "last":
		case "kbidlastpage":
			id=lastid
			break;
		case "kbidlastpageifrecent":
			if ( lastdt )	
			{
				var dt = new Date()
				var _lastdt = new Date(lastdt)
				if( dt-_lastdt < 1000*60*60*24 )
					id=lastid
			}
			break;
	}
	var p=this.pages
	for (var i in p) if (p[i].id.toLowerCase()==id) return p[i]
	return null
}

function _KBC_addItem(book,item)
{
	item.parent=this
	this.items[this.items.length]=item;book.pages[book.pages.length]=item;item.page=book.pages.length
	if (item.isChapter&&item.parent==book.chapter) book.tabs[book.tabs.length]=book.pages.length-1
	if (item.enhanced) for (var chapter=this; chapter; chapter=chapter.parent) chapter.enhanced=true
}

function sameDomain(page)
{
	with (page)
	{
		if (file!="") return true
		if (_prot=="file:") return false
		return (((_currDomain!="")&&(url.indexOf(_currDomain)==0))||(url.indexOf(_currLocation)==0))
	}
}

function setBrand(logoP,logoU,idxP,idxU,tocP,tocU,logT,idxT,tocT)
{
	with (this.branding)
	{
		logoPath=logoP;logoUrl=logoU;indexPath=idxP
		indexUrl=idxU;tocPath=tocP;tocUrl=tocU
		logoTip=logT;idxTip=idxT;tocTip=tocT
	}
}

function urlDecode(u)
{
	u=rplP(u,"%KBKEnginePath%",EnginePath)
	u=rplP(u,"%KeeBookEnginePath%",calPath(_root,_dyn?"../..":".",false))
	u=rplP(u,"%KeeBookRootPath%",calPath(_basePath,".",false))
	u=calPath(_basePath,u,false)
	return u
}

function commInsPg(t,f,u,itl,sti,tp,bib)
{
	sti=sti?sti:false
	with (this)
	{
		var pg=new _KB_Page(t,u,f,itl,sti,tp,bib)
		currCh.addItem(this,pg)
		pg.url=urlDecode(pg.url)
		pg.isInDomain=sameDomain(pg)
		return pg
	}
}

function setPrinting(f)
{
	if ( testStr(f) )
	{
		f=rplP(f,"'",escape("'"))
		f=rplP(f," ",escape(" "))
		with(this)
		{
			printing=true;
			printingfile=f;
		}	
	}
}

function insPage(t,f,u,sti,tp,bib)
{
	with (this)
	{
		var pg=commonInsPg(t,f,u,null,sti,tp,bib)
		if (!pg.isInDomain) extCount++
		else intCount++
		return pg
	}
}

function insPict(t,f,u,sti,tp,w,h,fit,bib)
{
	with (this)
	{
		var pg=commonInsPg(t,f,u,"pict",sti,tp,bib)
		pg.w=(isNaN(parseInt(w))?null:parseInt(w));pg.w=(pg.w==0?null:pg.w);
		pg.h=(isNaN(parseInt(h))?null:parseInt(h));pg.h=(pg.h==0?null:pg.h);
		if( pg.w!=null && pg.h!=null) pg.loaded=true;
		intCount++;pg.isInDomain=true;pg.fit=(fit==null?true:fit)
		margeV=margeH=0
		return pg
	}
}

function insMult(t,f,u,sti,tp,bib,pl)
{
	with (this)
	{
		var pg=commonInsPg(t,f,u,"mult",sti,tp,bib)
		intCount++;pg.isInDomain=true;pg.play=pl
		return pg
	}
}

function insTpl(t,f,u,sti,tp,bib)
{
	var pg=this.KBInsertPage(t,f,u,sti,tp,bib)
	pg.internal="tpl"
	pg.args=new Array
	
	return pg
}

function addSti(text,x,y,w,h,color,ff,fs,fsty,fw,fc)
{
	if (color==null) color="#FFFFA0"
	if (w==null) w=200;if (h==null) h=100;
	if (x==null) x=0;if (y==null) y=0;
	var l=this.sticker.length
	var sti=new Object
	sti.id="keeStick"+l+this.id
	sti.text=convStr(text,true);sti.x=x;sti.y=y;sti.w=w;sti.h=h;sti.color=color
	sti.ff=ff;sti.fs=fs;sti.fsty=fsty;sti.fw=fw;sti.fc=fc
	this.sticker[l]=sti;this.enhanced=true
	for(var chapter=this.parent;chapter;chapter=chapter.parent) chapter.enhanced=true
	return sti
}
function addCap(s,pos,constr,ff,fs,fsty,fw,fc)
{
	with (this)
	{
		var marge=(pos=="top")||(pos=="bottom")?50:150
		if ( cap[pos]==null ) (pos=="top")||(pos=="bottom")?margeV+=marge:margeH+=marge
		c=new Object; c.w=150; c.txt=convStr(s,true); c.pos=pos; this.constr=constr
		c.ff=ff;c.fs=fs;c.fsty=fsty;c.fw=fw;c.fc=fc
		cap[pos]=c
		return c
	}
}

function arrayInsert(ar,idx,itm){for (var i=ar.length-1;i>=idx;i--) ar[i+1]=ar[i];ar[idx]=itm}
function arrayFind(ar,itm){for (var i in ar) if (ar[i]==itm) return i;return null}

function insertItemBefore(n,newItem)
{
	with (book)
	{
		var it=pages[n],ch=it.parent,chidx=arrayFind(ch.items,it)
		insertItemInChapter(newItem,ch,chidx,n)
	}
}

function insertItemInChapter(newItem,ch,chidx,pageIdx)
{
	with (book)
	{
		arrayInsert(ch.items,chidx,newItem)
		arrayInsert(pages,pageIdx,newItem)
		newItem.page=pageIdx
		for (var i=pageIdx;i<pages.length;i++) pages[i].page=i+1
		tabs.length=1
		var bch=chapter.items
		for (var j=0;j<bch.length;j++) if (bch[j].isChapter) tabs[tabs.length]=bch[j].page-1
	}
}

function setTabFont(fontname) { gui.tabs.addedfont=fontname; }
function setTab(txt,bgc,sbgc,txtc,stxtc)
{
	if (txt==null&&bgc==null&&sbgc==null&&txtc==null&&stxtc==null)
		this.tab = null
	else
	{	
		if (this.tab==null) this.tab=new _KB_TAB(this)
		with(this.tab)
		{
			if(txt) text=txt;
			if(bgc) bgcolor=bgc;if(sbgc) sbgcolor=sbgc;
			if(txtc) textcolor=txtc;if(stxtc) stextcolor=stxtc;
		}
	}
}
function setSlideShow(enable,timer,loop){if (enable) {this.slideShow=new _KB_SlideShow(timer,loop)}else{this.slideShow=null}}
function setFlipAnim(_enable,_withtrans) 
{ 
	with( this.flipAnimation )
	{
		enable=_enable; 
		trans=(_withtrans==true);
	}
}
function _KB_Animation() {this.enable=true;this.trans=false;}
function setDim(l,t,r,b,w,h,centered)
{
	this.setParam("l",(l==null?0:l),true);
	this.setParam("t",(t==null?0:t),true);
	this.setParam("r",(r==null?l:r),true);
	this.setParam("b",(b==null?t:b),true);
	this.setParam("w",w,true);
	this.setParam("h",h,true);
	this.setParam("centered",centered,true);
}

function setBg(_typ,_src,_color,_w,_h,_l,_t){ with(this.bg){ typ=_typ;src=calPath(_root,_src,false);color=_color;w=_w;h=_h;l=_l;t=_t;} }

function Book_generate()
{
	this.setParam("language","enu")
	this.setParam("skin","classic")
	this.setParam("pagemode",2)
	this.setParam("enabletoolbar",true)
	this.setParam("toolbarmode",false)
	
	// System pages
	var sp=this.sysPage=new Object;
	sp.author=intPage(this,"author","KBIDAuthorPage")
	sp.author.sysVisible=true
	sp.contents=intPage(this,"toc","KBIDTocPage")
	sp.contents.KBSetTab(getTitle(sp.contents))
	sp.contents.sysVisible=true
	sp.sources=intPage(this,"biblio","KBIDSourcesPage")
	sp.sources.KBSetTab(getTitle(sp.sources))
	sp.sources.sysVisible=true
	
	// Read table of oontents
	GenerateTOC(this)

	getBookParams(params)
	decodeParam(parent.location.search,params)
	
	_common=calPath(EnginePath,"common"); _localized=calPath(EnginePath,"langs/"+params.language);
	_inc=calPath(EnginePath,"include/"); _neu=calPath(EnginePath,"skins/"+params.skin);
	_contents=calPath(_root,"contents");_langName=params.language;_lookName=params.skin;
	
	with(this)
	{
		if (audience==null) audience=_dyn

		with(author)
		{
			if(!name) name="Unknown"
			if (!email) email=""
		}

		var ch=chapter,pg
		pg=sysPage.contents;if (pg.sysVisible) insertItemInChapter(pg,ch,0,0)
		pg=sysPage.author;if (pg.sysVisible) insertItemInChapter(pg,ch,0,0)
		pg=sysPage.sources;if (pg.sysVisible) insertItemInChapter(pg,ch,ch.items.length,pages.length)
		
		if (flip==2)
		{
			for (var i=0;i<pages.length;i++)
			{
				var p=pages[i];s=p.side
				if (((s=="left")&&(i%2==1))||((s=="right")&&(i%2==0))) insertItemBefore(i,new _KB_Page(null,null,null,"blank",false))
			}
			if ((pages.length-1)%2==0) 
				insertItemInChapter(new _KB_Page(null,null,null,"blank",false),chapter,chapter.length,pages.length)
		}

		while (pages.length<2) insertItemInChapter(new _KB_Page(null,null,null,"blank",false),chapter,chapter.length,pages.length)
	}
	if (params.slideshowinterval!=null)
	{
		_slideShowTimer=parseInt(params.slideshowinterval)
		if (this.slideShow!=null) this.slideShow.timer=_slideShowTimer
	}
	if (params.flipanimation!=null) this.flipAnimation.enable=(params.flipanimation=="1")||(params.flipanimation=="true")
	if (this.flip==1) this.flipAnimation.enable=false
	this.preloadmode = (params.preloadmode=="1")||(params.preloadmode=="true")
	if (params.expand) _forceexpand=(params.expand=="1")||(params.expand=="true")
	if (!_dyn) 
		with (this.branding)
		{
			logoPath=calPath(_contents,logoPath,false)
			indexPath=calPath(_contents,indexPath,false)
			tocPath=calPath(_contents,tocPath,false)
			if (testStr(logoUrl)) logoUrl=parseBrand(logoUrl)
			if (testStr(indexUrl)) indexUrl=parseBrand(indexUrl)
			if (testStr(tocUrl)) tocUrl=parseBrand(tocUrl)
		}
	for (var i in _theWins) updateSubWin(i)
	this.trackBook()
	
	// Toolbar initialisation
	if ( params.enabletoolbar )
	{
		var gbtn=gui.toolbar.btn_pagemode, btn
		btn = this.KBAddToolbarButton("ico_pagemode",TBCB_PageMode,"page_mode_1")
		btn.KBAddState("page_mode_2",_lab.twoPages,_lab.twoPagesH+" "+_lab.accOneTwoPage,null,gbtn.ox1,0,gbtn.imgw)
		btn.KBAddState("page_mode_1",_lab.onePage,_lab.onePageH+" "+_lab.accOneTwoPage,null,gbtn.ox2,0,gbtn.imgw)
		
		var p=book.KBGetSystemPage("contents")
		if ((p!=null)&&p.sysVisible)
		{
			gbtn=gui.toolbar.btn_toc
			btn = this.KBAddToolbarButton("ico_toc",toc,"default")
			btn.KBAddState("default",_lab.contents,_lab.contentsH,null,gbtn.ox1,0,gbtn.imgw)
		}
		if (book&&book.slideShow) {
			gbtn=gui.toolbar.btn_slideshow
			btn = this.KBAddToolbarButton("ico_slideshow",TBCB_SlideShow,"OFF")
			btn.KBAddState("OFF",_lab.startSlideshow,_lab.startSlideshowH,null,gbtn.ox1,0,gbtn.imgw)
			btn.KBAddState("ON",_lab.stopSlideshow,_lab.stopSlideshowH,null,gbtn.ox2,0,gbtn.imgw)
		}
		
		gbtn=gui.toolbar.btn_find
		btn = this.KBAddToolbarButton("ico_find",find,"default")
		btn.KBAddState("default",_lab.find,_lab.findH,null,gbtn.ox1,0,gbtn.imgw)
		
		gbtn=gui.toolbar.btn_prefs
		btn = this.KBAddToolbarButton("ico_pref",pref,"default")
		btn.KBAddState("default",_lab.prefs,_lab.prefsH,null,gbtn.ox1,0,gbtn.imgw)
	
		if ( this.printing )
		{	
			gbtn=gui.toolbar.btn_print
			btn = this.KBAddToolbarButton("ico_print",KBPrint,"default")
			btn.KBAddState("default",_lab.print,_lab.printH,null,gbtn.ox1,0,gbtn.imgw)
		}
	}
}

function Book_load()
{	
	with(this.author) photo=(testStr(photo))?calPath(_contents,photo,false):_neu+"menu_pixel.gif"
	_isInit=true
	changePage(_Book.page,true,null,null,"gp","init")
	_isInit=false
	setTimeout('_Book.refresh("load");',0)
}

function setInc()
{
	if ((_Book.mode==2)&&(book.flip==2))
	{
		book.inc=2;if (_Book.page%2!=0)
		{
			_Book.page++;
			return true
		}
	}
	else book.inc=1
	return false
}

function updateSubWin(i)
{
	if (_macIE) return

	if (i&&(i!="Win"))
	{
		var theWin=_theWins[i]
		
		if ((i!="prldWin")&&(theWin!=null)&&(!theWin.closed))
		{
			if (theWin._subWinId)
			{
				var pg=book.getPageById(theWin._subWinId)
				if (pg)
				{
					theWin._page=pg.page-1
					var doc=_ns?theWin:theWin.document,nb=theWin.frames.length
					//for (var i=0;i<nb;i++) doc.frames[i].location.replace(doc.frames[i].location.href)
					doc.location.reload()
					//if (nb==0) changeUrl(theWin,theWin.document.location)
				}
				else theWin.close()
			}
			else changeUrl(theWin,theWin.document.location)
		}
	}
}

function reloadPg(side,how,p)
{
	var pg=book.pages[_page[side].idx]
	if (((how=="ID")&&(pg.id.toLowerCase()==p.toLowerCase()))||((how!="ID")&&((pg.page)==p)))
	{
		getPageInfo()	
		writeTitleAndPage(side)
		updateSurround()
	}
}

function KBKReloadPage(how,pg)
{
	if (_Book.mode==2) reloadPg("left",how,pg)
	reloadPg("right",how,pg)
}


function showTab(pos,index,show)
{
	var f=getFrame(pos=='left'?'f_lefttab':'f_righttab')
	if (f&&(f.showTab)) f.showTab(index,show)
}

function currentChapterTab()
{
	var ch=0,pageNum=(_Book.mode==2)?_Book.page:_Book.page-1
	for (var i=0; i<book.tabs.length; i++)
	{
		if (book.tabs[i] > pageNum) break
		else ch++
	}
	return ch
}

function goToWebViaImage(url)
{
	if (testStr(url)) openWin(url+(_dyn?"":"&ReaderSKU="+ReaderSKU+"&ReaderPartner="+ReaderPartner+"&ReaderUser="+ReaderUser+"&ReaderAutorunCount="+ReaderAutorunCount))
}

function goTo7x(ClickSource,Redirect)
{
return;
	url="http://"+(_dyn?"engine.keeboo.com/redirect/click.asp":"www.keeboo.com/redirect/click.asp")+"?ClickSource="
	openWin(url+ClickSource+"&WebBookID="+book.id+"&AuthorUser="+AuthorUser+"&ReaderSKU="+ReaderSKU+"&ReaderPartner="+ReaderPartner+"&AuthorSKU="+AuthorSKU+"&AuthorPartner="+AuthorPartner+"&ReaderUser="+ReaderUser+"&ReaderAutorunCount="+ReaderAutorunCount+"&Redirect="+Redirect+"&BookTitle="+escape(book.title))
}

function getTitle(item,old)
{
	with(_lab) switch(item.internal)
	{
		case "author": return authorPageTitle
		case "biblio": return biblio
		case "blank": return ""
		case "advert": return whatIs
		case "toc": return toc
		case "thumbnails": return thumbnails
	}
	return old?item.oldTitle:item.title
}

function pageURL(p)
{
	var pt=parent
	with(p) 
	{
		switch(internal)
		{
			case "author": if  (url!=null) break; return (_dyn&&pt._AuthorPage)?rplP(pt._AuthorPage,"%Lang%",_langName):_common+"../systempages/author.htm"
			case "biblio": if  (url!=null) break; return (_dyn&&pt._BiblioPage)?rplP(pt._BiblioPage,"%Lang%",_langName):_common+"../systempages/sources.htm"
			case "blank": return _common+"blank.htm"
			case "pict": return _common+"photo.htm"
			case "mult": return _common+"mult.htm"
			case "advert": if  (url!=null) break;  return _common+"../systempages/private.htm"
			case "chapter": return _common+'sum_fram.htm'
			case "toc": return _common+'sum_fram.htm'
		}
		var u=file?(_contents+(internal=="tpl"?"../templates/":""))+file:url
		if (book.extendedUrl=="mode1") u=u+((u.indexOf("?")>=0)?"&":"?")+"BookID="+book.id+"&PageID="+p.id
		return u
	}
}

function getPageURL(i){return pageURL(book.pages[i])}

function fillPageInfo(side,i)
{
	var p=book.pages[i]
	with(_page[side]){
		col=p.color;colTitle=p.colTitle;if (col==null) col=book.color;if (colTitle==null) colTitle=book.colTitle;if (p.pattern_url==null) p.pattern_url=book.pattern_url;
		idx=i;title=getPageTitle(i);url=getPageURL(i);external=!p.isInDomain;light=(p.file=="")&&(p.internal==null)
	}
}

function getPageInfo()
{
	with (_Book)
	{
		if (mode==2){fillPageInfo("left",page);fillPageInfo("right",page+1)}
		else fillPageInfo("right",page)
	}
}

function getPageRealUrl(side,init)
{
	var rnd=_moz?"?"+Math.random():""
	if ((side=="left")&&(_Book.mode==1)) return _common+"blank.htm"
	var pg=book.pages[_page[side].idx]
	var ur=pageURL(pg)
	pg.post=(pg.args!=null)&&(pg.args.length>0)&&(!((ur.length>3)&&(ur.slice(ur.length-4)=="html")||(ur.slice(ur.length-3)=="htm")))
	if (pg.post) return _common+side+"post.htm"+rnd
	if (isAnimated&&!_ns4) return _common+side+"iframe.htm"
	return _common+side+"page.htm"+rnd
	return ur
}

var _offset
function changePage(target,force,sel,side,ope,trig,leftonly,d1,d2)
{
	with (_Book)
	{
		var i = target
		_fromFind=sel?i:-1
		if (book.inc==2) side=(i%2==0)?"left":"right"
		if ((side=="right")&&(mode==2))i--
		var i=Math.min(Math.max(0,i),book.pages.length-mode)
		if ((i!=page)||force)
		{
			var wait = false
			if ( isAnimated && (mright||mleft) ) { moveLastFlipping(true); wait=true; }
			if (leftonly)
			{
				var oldl=(_isInit?-1:_page["left"].idx+1), oldr=(_isInit?-1:_page["right"].idx+1)
				page=i;getPageInfo();
				book.trackPage(ope,trig,target,oldl,oldr,d1,d2)
				writeTitleAndPage('left'); 
				if(!_isInit) updateSurround() 
				wriInf()
			}
			else if ( mode==1 || !(_ie||_moz) )
			{
				var oldr=(_isInit?-1:_page["right"].idx+1)
				var offset=i-page
				var olpg=_page["left"].idx, orpg=_page["right"].idx
				page=i;getPageInfo();
				book.trackPage(ope,trig,target,null,oldr,d1,d2)
				if( mode==2 ) writeTitleAndPage('left'); 
				if ( !_isInit && _ie && isAnimated )
					animateOneTitleAndPage(offset,_page["left"].idx,_page["right"].idx,olpg,orpg,wait)
				else
					writeTitleAndPage('right');
				if(!_isInit) updateSurround() 
				wriInf()
			}
			else
			{
				var oldl=(_isInit?-1:_page["left"].idx+1), oldr=(_isInit?-1:_page["right"].idx+1)
				if((book.slideShow==null) || !book.slideShow.running || (book.slideShow.nbPagesToLoad==0||force) )
				{
					var offset=i-page
					if (Math.abs(offset)>=2&&isAnimated)
					{
						if ( !( (offset>0&&mright)||(offset<0&&mleft) ) ) 
						{ 
							if (mright||mleft)
							{
								offset=-_offset
								i=page+offset
							}
							var olpg=_page["left"].idx, orpg=_page["right"].idx
							page=i;getPageInfo();
							book.trackPage(ope,trig,target,oldl,oldr,d1,d2);
							animateTitleAndPage(offset,_page["left"].idx,_page["right"].idx,olpg,orpg,wait)
							wriInf()
							_offset=offset
						}
						else
						{
							if(!_isInit) updateSurround() 
							wriInf()
						}
					}
					else if ( !mright && !mleft )
					{
						if ((offset==1&&rightLoad)||(offset==-1&&leftLoad))
						{
							if(!doChange()) return
							page=i;getPageInfo();
							book.trackPage(ope,trig,target,oldl,oldr,d1,d2);
							changeTitleAndPage(offset,getPageRealUrl('left'),getPageRealUrl('right'))
						}
						else
						{	
							page=i;getPageInfo();
							book.trackPage(ope,trig,target,oldl,oldr,d1,d2);
							if(_isInit) updateSurround() 	
							writeTitleAndPage('left'); 
							writeTitleAndPage('right'); 
						}	
						if(!_isInit) updateSurround()
						wriInf()
					}
				}
			}
		}
	}
}
function parseBrand(u)
{
	if (!_dyn&&(u.indexOf("WebBookID=")==-1)) return u+((u.indexOf("?")==-1) ? "?" : "&")+"WebBookID="+ book.id
	else return u
}

function mustOpenWin(w)
{
	if (_macIE||_saf) return true
	var r=(w==null)||((w)&&w.closed)
	if (!r) w.focus()
	return r
}

var _noDeco="statusbar=no,toolbar=no,menubar=no",winCnt=0,randBase=Math.ceil(Math.random()*100000),_thePrevId=0

function winID(base) {return ""+base+randBase+"_"+(winCnt++)}

function openWin(u,n,p)
{
	if (_ie&&(typeof(window.external)=="object")&&(typeof(window.external.callback)=="object"))
	   return external.callback.OpenWin(u,n,p);
	if (_macNS){var w=self.open("",n,p);changeUrl(w,u);return w}
	else return self.open(u,n,p)
}

var _initAbout=true

function fixDlg(w,h){return _noDeco+",height="+h+",width="+w+",left="+((screen.width-w)/2)+",top="+((screen.height-h)/2)+",resizable=no"}

function about(disc)
{
	if (mustOpenWin(_theWins["aboutWin"]))
		_theWins["aboutWin"]=openWin(_common+'about_frameset.htm',"about",fixDlg(500,300))
}

function pref()
{
	if (mustOpenWin(_theWins["prefWin"]))
		_theWins["prefWin"]=openWin(_common+'pref.htm',"pref",fixDlg(370,250))
}

function toc()
{
	var idx=book.sysPage.contents.page-1
	popWin(idx)
}

function find()
{
	if (mustOpenWin(_theWins["findWin"]))
		_theWins["findWin"]=openWin(_common+'find_frameset.htm',"find",_noDeco+",resizable,width=480,height=400,left=0,top=0")
}

function KBPrint()
{
	var title = "printWin"
	if (mustOpenWin(_theWins[title]))
		_theWins[title] = openWin(_common+'print.php',winID(title),fixDlg(350,160) + ",scrollbars=no")
	else
		_theWins[title].location.reload();
}

function openPh(idx,p,t)
{
	var f=_noDeco,sz=false
	if ((p.w!=null)&&(p.h!=null)&&(p.w<screen.width-20)&&(p.h<screen.height-50)) f+=",width="+p.w+",height="+p.h+",scrollbars=no,resizable=no"
	else f+=",scrollbars,resizable"
	return openWin(_common+"photo.htm?"+idx,t,f)
}

function popWin(idx)
{
	var url=getPageURL(idx),pg=book.pages[idx],intl=pg.internal
	if (intl)
	{
		var title="win"+idx
		_thePrevId=idx
		if (pg.internal=="tpl") url=_common+"poptpl.htm"

		if (mustOpenWin(_theWins[title]))
		{
			_theWins[title]=(pg.internal=="pict")?openPh(idx,pg,winID(title)):openWin(url+"?"+idx,winID(title),"scrollbars,statusbar=no,toolbar=no,menubar=no,left=0,top=0,resizable,height=580,width=350")
		}
	}
	else openWin(url)
}

function setClosed(idx) {_theWins[idx]=null}

var leftLoad, rightLoad
function onLoadPageCB(side,f)
{
	if ((_searchWord!="")&&(!_page[side].external)&&(_page[side].idx==_fromFind)&&f&&!_macIE&&!_moz) frameSearch(f,_searchWord,true)
	if (book.slideShow&&book.slideShow.running) book.slideShow.loadpageEvent()
	eval( side+'Load=true' )
}

function frameSearch(f,s,sel)
{
	s=s.toLowerCase();sel=sel?sel:false
	var doc=_ns?f:f.document,nb=doc.frames.length
		
	if (nb>0) for (var i=0;i<nb;i++) if (frameSearch(doc.frames[i],s,sel)) return true

	if (_moz||_macIE)
	{
		var inr
		
		if (_moz && document.createRange)
		{
			var r=doc.document.createRange(),b=doc.document.body;r.setStartBefore(b);r.setEndAfter(b)
			inr=r.toString()
		}
		else inr=doc.document.body?doc.document.body.innerText:null
		if (inr)
		{
			inr=inr.toLowerCase()
			return (inr.indexOf(s)>=0)
		}
	}
	else if (_ns) return doc.find(s,false)	
	else if (_ie)
	{
		if (doc.body.createTextRange)
		{
			var r=doc.body.createTextRange()
			if (r&&(r.findText(s)))
			{
				if (sel) r.select()
				return true
			}
		}
	}
	return false
}

document.onkeydown=keyDownCB
function keyDownCB(ev)
{
	var bk=_Book,b=book
	switch (_ns?ev.which:(ev?ev:event).keyCode)
	{
		case 32: changePageModeCB("key");break;
		case 35: changePage(book.pages.length-1,null,null,"right","gp","end");break;
		case 36: changePage(0,null,null,null,"gp","frst");break;
		case 37: changePage(bk.page-b.inc,null,null,null,"pp","key");break;
		case 39: changePage(bk.page+b.inc,null,null,null,"np","key");break;
		case 84: if(!_ns4) _Book.showToolbar();break;
		case 116: if(_ns4) _Book.showToolbar();break;
		default: 
		return true;
	}
	foc();
	return false;
}

function KBKGoToPage(how,pg) 
{
	var n=-1;
	if (how=="ID")
	{	
		var p=book.getPageById(pg);
		if (p) n=p.page;
	}
	else n=pg; 
	if ((n>=0)&&(n<=book.pages.length)) {changePage(n-1,false,false,false,"gp","api"); }
}

function returnToBook(side){fillPageInfo(side,_Book.page+_Book.mode-(side=="left"?2:1));writeTitleAndPage(side)}

function BuidBrandParams(u,isClick,src)
{
	var _lang=_langName,cust=book.customData[src]
	if (cust) cust=isClick?cust.ClickURL:cust.ImageURL
	u=rplP(u,"%Lang%",_lang)
	
	if (u.indexOf("%AllParam%")>=0)
	{
		var s=(isClick?"ClickSource=":"Source=")+src
		s+="&AuthorUser="+AuthorUser+"&AuthorPartner="+AuthorPartner+"&BookTitle="+escape(book.title)+"&Lang="+_lang
		if (testStr(ReaderUser)) s+="&ReaderUser="+ReaderUser
		if (testStr(book.id)) s+="&WebBookID="+book.id
		s+="&Generator="+escape(Generator)
		if (cust) s+="&"+cust
		u=rplP(u,"%AllParam%",s)
	}
	u=rplP(u,"%ClickSourceParam%","ClickSource="+src);u=rplP(u,"%SourceParam%","Source="+src)
	u=rplP(u,"%AuthorUserParam%","AuthorUser="+AuthorUser);u=rplP(u,"%AuthorPartnerParam%","AuthorPartner="+AuthorPartner)
	u=rplP(u,"%BookTitleParam%","BookTitle="+escape(book.title));u=rplP(u,"%LangParam%","Lang="+_lang)
	if (testStr(ReaderUser)) u=rplP(u,"%ReaderUserParam%","ReaderUser="+ReaderUser)
	if (testStr(book.id)) u=rplP(u,"%WebBookIDParam%","WebBookID="+WebBookID)
	u=rplP(u,"%GeneratorParam%","Generator="+escape(Generator));u=rplP(u,"%CustomDataParam%",cust?cust:"")
	return u
}
function brandingUrl(desc,src)
{
	if (testStr(desc.ImageSrc))
	{
		var s=BuidBrandParams(desc.ImageSrc,false,src)
		return s+(s.indexOf("?")>=0?"&":"?")+"RndCounter="+(bannCnt++)
	}
	return ""
}
function brandingClickUrl(desc,src){return BuidBrandParams(desc.Url,true,src)}

function wriInf(resize)
{
	/*
	var dt = new Date(), t = new Array
	t[t.length]="lastpageid="+book.pages[_Book.page].id.toLowerCase()
	t[t.length]="lastpagedt="+dt.toLocaleString()
	t[t.length]="pagemode="+_Book.mode
	setCookie('book_'+book.id,t.join('&'),30)
	*/
}

setDocVersion("2.7.5.1","2.7");
var book=new _KB_Book("","")
book.generate()

var process = getFrame("Process", parent );
process.preloadRefresh(true)
