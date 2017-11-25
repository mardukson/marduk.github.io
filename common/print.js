// Event handler
_disableKeyEvent = true
document.ondragstart = new Function('return false;');
document.onselectstart = new Function('return false;');
//document.oncontextmenu = new Function('return false;');

// Functions defintion
//----------------------------
function Init()
{
	// Initialize window
	InitWindow()
	
	// Initialize pdf
	setTimeout( "InitPdf()", 100 )
}

function InitPdf()
{
	if ( _ie )
	{
		var s=""
		s += '<OBJECT id="mypdf" height=0 width=0 border=0 classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" VIEWASTEXT>'
		s += '<param name="src" value="' + book.printingfile + '">'
		s += '</OBJECT>'
		document.body.insertAdjacentHTML('beforeEnd',s)

		layerElem( "CheckAcrobat" ).style.display = "none"
		if ( document.all.mypdf.object )	
		{
			layerElem( "IfAcrobat" ).style.display = "block"
			layerElem( "PrintButton" ).disabled = false
		}
		else
			layerElem( "IfNoAcrobat" ).style.display = "block"
	}
	else
	{
		var pdf = false
		for ( var i=0; i<navigator.mimeTypes.length; i++ )
		{
			var plugin = navigator.mimeTypes[i]
			if ( plugin.type == "application/pdf" )
			{
				pdf=true
				break;
			}
		}
		layerElem( "CheckAcrobat" ).style.display = "none"
		if ( pdf )
		{
			layerElem( "IfAcrobat" ).style.display = "block"
			layerElem( "PrintButton" ).disabled = false
			WL( '<iframe frameborder="0" width=10 height=10 src="' + book.printingfile + '"></iframe>', 'PdfContainer')
		}
		else
			layerElem( "IfNoAcrobat" ).style.display = "block"
	}
}


function InitWindow()
{
	var console = layerElem( "Console" )
	console.style.visibility = "visible"
}

function printCB()
{
	if ( _ie )
		mypdf.object.print()
	else
		self.location.reload()
}

function cancelCB()
{
	window.close()
}