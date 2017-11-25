<!--

var _preloadPage=false,_searchPage=false,_printPage=false;

function getTop(w)
{
	if (w._preloadPage=="here") _preloadPage=true;
	if (w._searchPage=="here") _searchPage=true;
	if (w._printPage=="here") _printPage=true;

	if (w._keebooTopFrameset=='here') return w
	if (w==top)
	{
		var opr=top.window.opener
		if ((opr)&&(opr._keebooTopFrameset=='here')) return opr
		else return top
	}
	return getTop(w.parent)
}

var _main = getTop(self),_neu=_main._neu,_lab=_main._lab,gui=_main.gui
var _page=_main._page,_Book=_main._Book,_sty=_main._sty,_sty2=_main._sty2
var _ktop=_main, book=_ktop.book
var _side,_page,_ext,_item,_subWinId,_disableKeyEvent=false,_NULL

function writeStyle(opt)
{
	var s="";for (var i in _main._sty) s+=_main._sty[i]
	document.write('<STY'+'LE TYPE="text/css"><!-'+'-'+s+(opt?opt:"")+'-'+'-></STY'+'LE>')
}

document.onkeydown=keyDownCB
if (_main._ns4) document.captureEvents(Event.KEYDOWN)

function foc() {if (_main.top==top)_main.foc()}

function keyDownCB(ev)
{
	if (!_disableKeyEvent&&_ktop.keyDownCB) return _ktop.keyDownCB(_main._ns?ev:event)
	else return true
}

var _inf

function getPageSide()
{
	if (_printPage||_preloadPage||_searchPage) return "undefined"
	_inf=_main.getPageNumSide(self)
	if (_inf) return _inf.side
	else return "undefined"
}

function calcSide()
{
	_side=getPageSide();
	_page=(_inf!=null)?_inf.num:null
	_ext=(_page==null)
	if (_ext)
	{
		if (_preloadPage||_searchPage) 
			_page=_ktop._thePrevId;
		else if ( _printPage )
		{
			s=document.location.search
			if (s.length>0) _page=parseInt(s.slice(1))
		}
		else
		{
			for( var i in _ktop._theWins )
			{
				if( top.name.indexOf(i)!=-1 )
				{
					_page=i.slice(3);
					_ktop._theWins[i]=top;
					break;
				}
			}
			s=document.location.search
			if (s.length>0) _page=parseInt(s.slice(1))
		}
	}
	_item=_ktop.book.pages[_page];_subWinId=_item?_item.id:null;
}

function setHelpText(s) {_main.setHelpText(s)}
function trLnkMouseOver(s) {_main.trLnkMouseOver(s)}

//-->
