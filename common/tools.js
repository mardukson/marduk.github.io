function button(lab,cb,x,y,vis,id)
{
	var s=table("BtnNorm",(!_ns4?attr("onclick",cb):""))
	s+="<TR valign=middle><TD>"+getImg(_neu+"button_left.gif",3,20)+"</TD><TD bgcolor='#002878'>"+table(_NULL, " height=20 background='"+_neu+"button_mid.gif'")	
	s+="<TR valign=middle><TD>"+box(1,20)+"</TD><TD>"
	if (_ns4) s+="<A href='javascript:"+cb+"'>"
	s+="<SPAN class=BtnNorm>&nbsp;&nbsp;"+_lab[lab]+"&nbsp;&nbsp;</SPAN>"
	if (_ns4) s+="</A>"
	s+="</TD><TD>"+box(1,20)+"</TD></TR></TABLE></TD><TD>"+getImg(_neu+"button_right.gif",3,20)+"</TD></TR></TABLE>"
	if (x!=_NULL) s=lyr(x,y,s,attr("id",id),vis)	
	document.write(s)
}

function buttonLnk(lab,u)
{
	var s=table("BtnNorm")
	
	s+="<TR valign=middle><TD>"+getImg(_neu+"button_left.gif",3,20)+"</TD><TD bgcolor='#002878'>"+table(_NULL, " height=20 background='"+_neu+"button_mid.gif'")
	s+="<TR valign=middle><TD>"+box(1,20)+"</TD><TD>"
	s+="<A href='"+u+"'"+(_moz?" style='text-decoration:none;'":"")+">"
	s+="<SPAN class=BtnNorm>&nbsp;&nbsp;"+lab+"&nbsp;&nbsp;</SPAN>"
	s+="</A>"
	s+="</TD><TD>"+box(1,20)+"</TD></TR></TABLE></TD><TD>"+getImg(_neu+"button_right.gif",3,20)+"</TD></TR></TABLE>"
	return s
}

function thumb(lab,x,y)
{
	var s=table("Thumb")+"<TR valign=middle>"
	s+="<TD>"+corner("topleft")+"</TD><TD rowspan=2 class=Thumb align=center>"+_lab[lab]+"</TD>"
	s+="<TD class=Thumb width=8>"+corner("topright")+"</TD></TR><TR><TD class=Thumb>"+box(8,19)+"</TD><TD class=Thumb>"+box(8,19)+"</TD></TR></TABLE>"
	if (x!=_NULL) s=lyr(x,y,s)
	document.write(s)
}
