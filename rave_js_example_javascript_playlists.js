
// ObjectArrayToXML converts the container array (Aplaylist below) into XML data.
function ObjectArrayToXML(){
	var xml = "<playlist>";
	for(var i=0; i<xml.length; i++){
		xml += "<item>";
		var Oitem = Aplaylist[i];
		for(var prop in Oitem){
			xml += "<" + prop + ">" + Oitem[prop] + "</" + prop + ">";
		}
		xml += "</item>";

	}
	xml += "</playlist>";
	return xml;
}

// Create a container array, which we will fill with objects:
Aplaylist = Array();

// Create an "item" object and set variables within the object for our data
Oitem = new Object();
Oitem.filename	 = 'example1.flv';
Oitem.artist	 = 'Killeen and Gieson';
Oitem.title		 = 'Example 1';
Oitem.link		 = 'http://www.wimpyplayer.net/';
Oitem.image		 = 'example1.jpg';
Aplaylist.push(Oitem);

Oitem = new Object();
Oitem.filename	 = 'example2.flv';
Oitem.artist	 = 'Killeen and Gieson';
Oitem.title		 = 'Example 2';
Oitem.link		 = 'http://www.gieson.com/';
Oitem.image		 = 'example2.jpg';
Aplaylist.push(Oitem);

Oitem = new Object();
Oitem.filename	 = 'example3.flv';
Oitem.artist	 = 'Killeen and Gieson';
Oitem.title		 = 'Example 3';
Oitem.link		 = 'http://www.plaino.com/';
Oitem.image		 = 'example3.jpg';
Aplaylist.push(Oitem);





// Old-school hard-coded XML:

var myPlaylist = "";
myPlaylist += "<playlist>";
myPlaylist += "		<item>";
myPlaylist += "			<filename>example1.flv</filename>";
myPlaylist += "			<artist>Killeen and Gieson</artist>";
myPlaylist += "			<title>Example 1</title>";
myPlaylist += "			<link>http://www.gieson.com/</link>";
myPlaylist += "			<image>example1.jpg</image>";
myPlaylist += "		</item>";
myPlaylist += "		<item>";
myPlaylist += "			<filename>example2.flv</filename>";
myPlaylist += "			<artist>Killeen and Gieson</artist>";
myPlaylist += "			<title>Example 2</title>";
myPlaylist += "			<link>http://www.wimpyplayer.net/</link>";
myPlaylist += "			<image>example2.jpg</image>";
myPlaylist += "		</item>";
myPlaylist += "		<item>";
myPlaylist += "			<filename>example3.flv</filename>";
myPlaylist += "			<artist>Killeen and Gieson</artist>";
myPlaylist += "			<title>Example 3</title>";
myPlaylist += "			<link>http://www.plaino.com/</link>";
myPlaylist += "			<image>example3.jpg</image>";
myPlaylist += "		</item>";
myPlaylist += "</playlist>";


var addFilesA = "";
addFilesA += "<playlist>";
addFilesA += "	<item>";
addFilesA += "		<filename>example1.flv</filename>";
addFilesA += "		<artist>Killeen and Gieson</artist>";
addFilesA += "		<title>Example 1</title>";
addFilesA += "		<link>http://www.wimpyplayer.net/</link>";
addFilesA += "		<image>example1.jpg</image>";
addFilesA += "	</item>";
addFilesA += "</playlist>";

var addFilesB = "";
addFilesB += "<playlist>";
addFilesB += "	<item>";
addFilesB += "		<filename>example2.flv</filename>";
addFilesB += "		<artist>Killeen and Gieson</artist>";
addFilesB += "		<title>Example 2</title>";
addFilesB += "		<link>http://www.gieson.com/</link>";
addFilesB += "		<image>example2.jpg</image>";
addFilesB += "	</item>";
addFilesB += "</playlist>";

var addFilesC = "";
addFilesC += "<playlist>";
addFilesC += "	<item>";
addFilesC += "		<filename>example1.flv</filename>";
addFilesC += "		<artist>Killeen and Gieson</artist>";
addFilesC += "		<title>Example 1 - XML in Javascript</title>";
addFilesC += "		<link>http://www.wimpyplayer.net/</link>";
addFilesC += "		<image>example1.jpg</image>";
addFilesC += "	</item>";
addFilesC += "	<item>";
addFilesC += "		<filename>example2.flv</filename>";
addFilesC += "		<artist>Killeen and Gieson</artist>";
addFilesC += "		<title>Example 2 - XML in Javascript</title>";
addFilesC += "		<link>http://www.gieson.com/</link>";
addFilesC += "		<image>example2.jpg</image>";
addFilesC += "	</item>";
addFilesC += "	<item>";
addFilesC += "		<filename>example3.flv</filename>";
addFilesC += "		<artist>Killeen and Gieson</artist>";
addFilesC += "		<title>Example 3 - XML in Javascript</title>";
addFilesC += "		<link>http://www.plaino.com/</link>";
addFilesC += "		<image>example3.jpg</image>";
addFilesC += "	</item>";
addFilesC += "</playlist>";