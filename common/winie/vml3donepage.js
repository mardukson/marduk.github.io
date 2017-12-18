function animateOneTitleAndPage(offset,lpg,rpg,olpg,orpg,wait)
{
	leftLoad=false
	rightLoad=false
	setAnimClass(document,"F",(Math.abs(offset)>2?"noOpacity":"withOpacity"))
	if (offset>0)
	{
		mleft=false; left=false
		mright=true; right=true
	}
	else
	{
		mleft=true; left=true
		mright=false; right=false
	}
	startOnePage(offset,lpg,rpg,olpg,orpg,wait)
}
function startOnePage(offset,lpg,rpg,olpg,orpg)
{
	_offset = offset
	_orpg=book.pages[orpg]
	_rpg=book.pages[rpg]
	_olpg=book.pages[olpg]
	_lpg=book.pages[lpg]
	changeside = true
	timeLeft = (2*nbsteps+1)*tempo

	setPageNumSide(f_rightpage.id,"right",_Book.page+1)
	setPageNumSide(mf_rightpage.id,"right",_Book.page-1)
	
	colorOneAnim(null,true)
	
	if ( right ) 
	{
		resizeLayer(f_rightpage.id,w1,hp)
		loadIframe(mf_rightpage,getPageRealUrl('right'))
		moveOneRightPage()
	}
	if ( left ) 
	{
		SLS( false, f_rightpage.id )
		moveIframe(f_rightpage.id,-(w1+gui.kmid.mw),0)
		resizeLayer(f_rightpage.id,w2,hp)
		moveLayer(f_rightpage.id,x4,yp)
		setTimeout( 'SLS( true, f_rightpage.id )', 100 );
		
		loadIframe(mf_rightpage,getPageRealUrl('right'))
		
		moveOneLeftPage()
	}
}
function moveOneLeftPage()
{
	timeLeft-=tempo
	if ( ! mleft ) return
	if ( step>=moves.length ) step = moves.length-1
	if ( step<0 ) step=0
	if ( moves[step] )
	{
		var t=moves[step][2]
		WritePage(moves[step][0],moves[step][1])
		if (step==1) 
		{
			updateSurroundAnim("right")
			if ( _ieVer >= 5.5 )
			{
				moveIframe(mf_rightpage.id,0,0)
				resizeLayer(mf_rightpage.id,w1,hp)
				moveLayer(mf_rightpage.id,x2,yp)
			}
		}
		if ( left && ++step<moves.length)
		{
			toAnim = setTimeout( "moveOneLeftPage()",t)
			return
		}		
		left = false
		if ( changeside )
		{
			if ( _ieVer < 5.5 )
			{
				moveIframe(mf_rightpage.id,0,0)
				resizeLayer(mf_rightpage.id,w1,hp)
				moveLayer(mf_rightpage.id,x2,yp)
				moveLayer(f_rightpage.id,sw,sh)
			}
			colorOneAnim("left")
		}
		if ( ! right )
		{
			right = true
			changeside = false
		}
		if ( right && --step>=0 )
			toAnim = setTimeout( "moveOneLeftPage()",t)
		else
			toAnim = setTimeout( "moveOneLastPage()",t)
	}
}
function moveOneRightPage()
{
	timeLeft-=tempo
	if ( ! mright ) return
	if ( step>=moves.length ) step = moves.length-1
	if ( step<0 ) step=0
	if ( moves[step] )
	{
		var t=moves[step][2]
		WritePage(moves[step][0],moves[step][1])
		if (step==1) 
		{
			//updateSurroundAnim("right")
			
			if ( _ieVer >= 5.5 )
			{
				moveIframe(mf_rightpage.id,-(w1+gui.kmid.mw),0)
				resizeLayer(mf_rightpage.id,w2,hp)
				moveLayer(mf_rightpage.id,x4,yp)
			}
		}
		if ( right && ++step<moves.length)
		{
			toAnim = setTimeout( "moveOneRightPage()",t)
			return
		}		
		right = false
		if ( changeside )
		{
			if ( _ieVer < 5.5 )
			{
				resizeLayer(mf_rightpage.id,w2,hp)
				moveIframe(mf_rightpage.id,-(w1+gui.kmid.mw),0)
				moveLayer(mf_rightpage.id,x4,yp)
				moveLayer(f_rightpage.id,sw,sh)
			}
			colorOneAnim("right")
		}
		if ( ! left )
		{
			left = true
			changeside = false
		}
		if ( left && --step>=0 )
			toAnim = setTimeout( "moveOneRightPage()",t)
		else
			toAnim = setTimeout( "moveOneLastPage()",t)
	}
}
function moveOneLastPage(force)
{
	if ( ! mright && ! mleft ) return
	if ( toAnim ) { clearTimeout(toAnim); toAnim=null }
	endAnim()

	updateNavigation()
	
	moveIframe(mf_rightpage.id,0,0)
	resizeIframe(mf_rightpage.id,wR,hp)
	resizeLayer(mf_rightpage.id,wR,hp)
	moveLayer(mf_rightpage.id,xR,yp)

	step = -2
	var tmp = f_rightpage
	f_rightpage = mf_rightpage
	mf_rightpage = tmp	
	
	moveLayer(mf_rightpage.id,sw,sh)
	loadIframe(mf_rightpage,null)
	
	updateSurroundAnim("right")
	
	right=left=mright=mleft=false
}
function colorOneAnim(side,old)
{
	var pgn=_Book.page
	if ( side )
		pgn+=(side=="left"?-_offset:0)
	else
		pgn+=(old?-_offset:0)
	var pg=book.pages[pgn]
	var u=null,c=bg
	if (pg ) { u=pg.pattern_url; c=pg.getCol(); }
	if (u!=null)
		setFillPattern(document,"F",u);
	else
		setFillColor(document,"F",c);
}
