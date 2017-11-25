<!--

var _gaugeCounter=0

function progressBar(x,y)
{
	this.x=x;this.cnt=_gaugeCounter++;this.set=setPrs;this.show=false
	var s=imgLyr(_neu+"gauge_bg.gif",x,y,_NULL,false,"gaugebg"+this.cnt)+imgLyr(_neu+"gauge.gif",x+4,y+1,_NULL,false,"gauge"+this.cnt)
	s+=imgLyr(_neu+"gauge_left.gif",x+1,y+1,_NULL,false,"gaugeleft"+this.cnt)+imgLyr(_neu+"gauge_right.gif",x+4,y+1,_NULL,false,"gaugeright"+this.cnt)

	this.Show = progressBar_Show
	this.Hide = progressBar_Hide

	document.write(s)
}

function progressBar_Show() {
		showLayer(true, "gaugebg"+this.cnt);
}

function progressBar_Hide() {
		showLayer(false, "gaugebg"+this.cnt);
}

function setPrs(percent)
{
	with(this)
	{
		var sh=percent>0
		if (show!=sh){showLayer(sh,"gauge"+cnt);showLayer(sh,"gaugeright"+cnt);showLayer(sh,"gaugeleft"+cnt);show=sh}
		if (sh)
		{
			var offset=Math.round(percent*200/100)
			moveLayer("gaugeright"+cnt,x+4+offset,_NULL)
			if (_macIE&&_ie4) layerElem("gauge"+cnt).width=offset
			else setClipRect(layerCSS("gauge"+cnt),0,0,offset,13)
		}
	}
}

//-->
