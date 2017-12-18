function Toolbar(name,g) 
{
	t=this
	t.Name=name
	t.gui=g.toolbar
	t.bg=g.bgtools
	t.showText=null

	t.Icons=new Array
	t.maxw=0
	t.availw=0

	t.GetIndex=Toolbar_GetIndex
	t.GetIcon=Toolbar_GetIcon
	t.AddIcon=Toolbar_AddIcon

	t.css=Toolbar_Css
	t.source=Toolbar_Source
	t.load=Toolbar_Load
	t.resize=Toolbar_Resize
	t.update=Toolbar_Update
	t.show=Toolbar_Show
}

function Toolbar_GetIndex(id) {for (var i in this.Icons) {if (this.Icons[i].id==id) return i};return -1}
function Toolbar_GetIcon(id) {var i=this.GetIndex(id);return i>=0?this.Icons[i]:null}
function Toolbar_AddIcon(id,cb,ist) {
	if (this.GetIndex(id)==-1) {
		var icon=new Icon(this,id,this.Icons.length,cb,ist)
		this.Icons[this.Icons.length]=icon
		return icon
	}
	return null
}
function Toolbar_Css()
{
	// Add book defined buttons
	for (var b in book.Buttons) 
	{
		butt=book.Buttons[b]
		user_ico=this.AddIcon(butt.id, eval(butt.callback), butt.State)
		for (var s=0; s<butt.States.length; s++) 
		{
			var st = butt.States[s]
			user_ico.AddState(st.sid, st.text,st.info,st.img,st.dx,st.dy,st.w,st.h)
		}
	}
 
	return _sty2['.toolbar']; 
}
function Toolbar_Source() 
{
	var s="",w=0,h=0,l=0
	with (this.bg)	
	{
		s+=SK("htile.gif","bgtools_middle",sw,sh,0,h,0,dy)
		s+=SK("notile.gif","bgtools_left",sw,sh,lw,h,dx,0)
		s+=SK("notile.gif","bgtools_right",sw,sh,rw,h,dx+lw,0)
	}
	for (var i in this.Icons) 
		s+=this.Icons[i].source()
	var BT = gui.btntoolbar
	s+=lyr(0,gui.toolbar.y,'<A class="nocursor" onfocus=this.blur() href="javascript:void(0)" ondblclick="_Book.showToolbar()">'+getImg(_neu+'menu_pixel.gif',sw,gui.base.h+gui.toolbar.h)+'</A>','',true,"toolbarBgLnk",sw,gui.toolbar.h)
	s+=lyr(sw,sh,"","class=z100",_T,"btntoolbarH",mw,mh)
	s+=lyr(sw,sh,"","class=z100",_T,"btntoolbarV",mw,mh)
	s+=lyr(sw,sh,"","class=z1000",_T,"btntoolbarLnk",mw,mh)
	return s
}
function Toolbar_Load() 
{
	WriteToggle()
	px=this.l
	for (var i in this.Icons)
	{
		with( this.Icons[i] )
		{
			load() 
			this.maxw+=tb.gui.margin+imgw+tb.gui.itspacing+txtw+tb.gui.margin+tb.gui.icspacing
		}
	}
	this.maxw-=this.gui.icspacing
}
function Toolbar_Resize(init)
{	
	if ( init ) return
	if ( this.gui.show )
	{
		var x=0, y=y2+this.gui.t
		w=wb; h=hb

		this.availw=lb+w-(x0+this.gui.lmargin+this.gui.rmargin)
		if (this.showText==null) doresize=true
		if ( this.availw>this.maxw )
			if(this.showText==false) { this.showText=true; doresize=true; }
			else this.showText=true;
		else
			if(this.showText==true) { this.showText=false; doresize=true; }
			else this.showText=false;
		for (var i in this.Icons)
		{
			with( this.Icons[i] )		
			{
				if (doresize) resize(); 
				if ( x+w<=this.gui.lmargin+this.availw )
				{
					move(x+x0+this.gui.lmargin,y);
					x+=w+this.gui.icspacing
				}
				else
					move(sw,sh);
			}
		}
		with (this.bg)	
		{
			var offx=l-this.gui.lmargin

			ML("bgtools_left",x0+l,y2+t)
			RL("bgtools_middle",x,h);
			ML("bgtools_middle",x0+l+lw,y2+t)
			ML("bgtools_right",x0+l+lw+x,y2+t)
		}
		
	}
	else
	{
		ML("btntoolbarH",sw,sh); ML("btntoolbarV",x0+BT.l,y2+BT.t)
		for (var i in this.Icons)
			with( this.Icons[i] )		
				move(sw,sh);
	}
	ML("btntoolbarLnk",x0+BT.l,y2+BT.t)
	this.show(true)
	var dt1 = new Date
}
function Toolbar_Show(f)
{
	SLS(f,"bgtools_left","bgtools_middle","bgtools_right")
	if (f)
	if (this.gui.show) { ML("btntoolbarH",x0+BT.l,y2+BT.t); ML("btntoolbarV",sw,sh) }
	else { MLS("bgtools_left","bgtools_middle","bgtools_right",sw,sh) }
	else MLS("btntoolbarV","btntoolbarH","btntoolbarLnk",sw,sh)
	for (var i in this.Icons)
		with( this.Icons[i] )		
			show(f);
}
function Toolbar_Update()
{
	this.resize();
	if (this.GetIcon("ico_pagemode")) 
		this.GetIcon("ico_pagemode").SetState("page_mode_"+(_Book.mode==1?2:1));	
}

function WriteToggle() 
{
	var B=BT
	
	B.w=B.lvw+GetTextWidth(_lab["tools"],"toolbar")+B.rw
	WL("","tmp")
	
	var lw,ldx
	lw=B.lhw; ldx=B.dx

	RL("btntoolbarLnk",B.w,B.h)
	WL(trLnk("btntoolbarLnk",B.w,B.h,"_Book.showToolbar()","trLnkMouseOver(\"toggle\")","setTextInfo()"),"btntoolbarLnk")

	WL(skinImg("notile.gif","bl",0,0,lw,B.h,ldx,0)+
		skinImg("htile.gif","btn",lw,0,B.w-lw-B.rw,B.h,0,B.dy)+
		skinImg("notile.gif","br",B.w-B.rw,0,B.rw,B.h,B.dx+B.lvw+B.lhw,0)+
		wriTxt(_lab["tools"],"toolstext",null,B.lvw,B.txtt,"toolbar")
	,"btntoolbarH")	

	lw=B.lvw; ldx=B.dx+B.lvw
	WL(skinImg("notile.gif","bl",0,0,lw,B.h,ldx,0)+
		skinImg("htile.gif","btn",lw,0,B.w-lw-B.rw,B.h,0,B.dy)+
		skinImg("notile.gif","br",B.w-B.rw,0,B.rw,B.h,B.dx+B.lvw+B.lhw,0)+
		wriTxt(_lab["tools"],"toolstext",null,B.lvw,B.txtt,"toolbar")
	,"btntoolbarV")	
}
function IconState(iconid,id,txt,info,img,dx,dy,w,h)
{
	t=this
	t.iconid=iconid
	t.id=id
	t.txt=txt
	t.info=info
	t.img=img
	t.dx=dx
	t.dy=dy
	t.imgw=w
	t.imgh=h
	
	t.button=IconState_Button
}

function ButtonMouseOver( id )
{
	var I=TB.GetIcon(id),st=I.States[I.State]
	setHelpText(st.info)
	var txt = layerElem( "stButTxt"+st.id )
	txt.style.color = "blue"
	return false
}
function ButtonMouseOut( id )
{
	var I=TB.GetIcon(id),st=I.States[I.State]
	setHelpText()
	var txt = layerElem( "stButTxt"+st.id )
	txt.style.color = gui.toolbarfg
	return false;
}
function ButtonClick( id )
{
	var I=TB.GetIcon(id)
	I.CB(I);
	return false;
}
function IconState_Button()
{
	var s=""
	with( this )
	{
		s+='<a href="javascript:void(0)" style="position:absolute;background-color:transparent;border:none;cursor:c:pointer;" id="stBut' + id + '"' 
			+ ' onmouseover="ButtonMouseOver(\'' + iconid + '\')"'
			+ ' onmouseout="ButtonMouseOut(\'' + iconid + '\')"'
			+ ' onclick="ButtonClick(\'' + iconid + '\')"'
//			+ ' onfocus="this.blur()"'
			+ '>'
		s+='<table cellpadding="0" cellspacing="0" border="0"><tr valign="middle">'
		s+='<td>' + relImg(img,"stButImg"+id,imgw,imgh,dx,dy) + '</td>'
		s+='<td class="toolbar" width="3">&nbsp;</td>'
		s+='<td><div id="stButTxt'+id+'" style="position:relative;" class="toolbar"><nobr>' + txt + '</nobr></div></td>'
		s+='<td class="toolbar" width="4">&nbsp;</td>'
		s+='</tr></table>'
		s+='</a>'
	}
	return s;
}
function Icon(tb,id,idx,cb,st) 
{
	t=this
	
	t.tb=tb
	t.id=id
	t.idx=idx
	t.CB=cb
	t.State=st
	
	t.l=0
	t.t=0
	t.w=0;t.h=0
	t.imgw=0;t.imgh=0
	t.txtw=0;t.txth=0
	t.States=new Array

	t.AddState=Icon_AddState
	t.SetState=Icon_SetState
	t.source = Icon_Source
	t.load = Icon_Load
	t.move = Icon_Move
	t.resize = Icon_Resize
	t.show = Icon_Show
}

function Icon_AddState(sid,text,info,img,dx,dy,w,h) 
{
	img=(img==null?_neu+"menucorners.gif":img);
	dx=(dx==null?0:dx);
	dy=(dy==null?0:dy);
	w=(w==null?this.tb.gui.imgw:w);
	h=(h==null?this.tb.gui.imgh:h);
	this.States[sid] = new IconState(this.id,this.id+"_"+sid,text,info,img,dx,dy,w,h)
}

function Icon_SetState(sid) 
{
	this.State=sid
	this.move()
}
function Icon_Source()
{
	var s="",w=0,h=0,img_cnt=""
	with(this)
	{		
		for ( var sid in States )
		{
			with(States[sid])
				s+=button()
		}
	}
	return s
}
function Icon_Load()
{
	with(this)
	{
		for ( var sid in States )
		{
			var st = States[sid]
			imgw = Math.max(imgw,st.imgw )
			st.txtw=GetTextWidth(st.txt,"toolbar")+7
			txtw = Math.max(txtw,st.txtw)
			imgh = Math.max(h,st.imgh )
			st.txth=layerHeight("stButTxt"+st.id)
			txth = Math.max(h,st.txth)
		}
	}
}
function Icon_Resize()
{
	with(this)
	{
		if ( tb.showText )
		{
			w = tb.gui.margin+imgw+tb.gui.itspacing+txtw+tb.gui.margin+2
			h = tb.gui.margin+Math.max(imgh,txth)+tb.gui.margin
		}
		else
		{
			w = tb.gui.margin+imgw+tb.gui.margin
			h = tb.gui.margin+imgh+tb.gui.margin
		}
		for ( var sid in States )
		{
			var st = States[sid]
			RL("stBut"+st.id,w,h+4)
		}
	}
}
function Icon_Show(f) { with( this ) f?move():move(sw,sh,true) }
function Icon_Move(l,t,save)
{
	var _l,_t
	if ( save ) { _l=this.l;_t=this.t; }
	if(l!=null) this.l=l; 
	if(t!=null) this.t=t;
	with(this)
	{
		for ( var sid in States )
		{
			var st = States[sid]
			if(State==sid)
				ML("stBut"+st.id,l+tb.gui.margin,t+tb.gui.margin-2); 
			else
				ML("stBut"+st.id,sw,sh); 
		}
	}
	if (save) { this.l=l;this.t=t; }
}


function TBCB_PageMode(obj)
{
	changePageModeCB("tbar")
}

function TBCB_SlideShow(obj) {
	switch(obj.State) {
		case "ON":	
			if(book.slideShow) book.slideShow.stop()
		break
		case "OFF":
			if(book.slideShow) book.slideShow.start()
		break
	}
}

function relImg(u,id,w,h,dx,dy,st,att)
{
	if(u.match(/^(.*):(.*)/)==null&&u.match(/^\//)==null) u=_neu+u; 
	if (u.match(/^file/)) u=u.substring(7)
	return '<div '+(att?att:'')+' id="'+id+'" style="position:relative;width:'+w+'px;height:'+h+'px;background-image:url('+u+');background-position:'+((-1)*dx)+'px '+((-1)*dy)+'px;'+(st?st:"")+'"></div>';
}


var TB=new Toolbar("TB",gui)
if ( gElems ) gElems[gElems.length] = TB

