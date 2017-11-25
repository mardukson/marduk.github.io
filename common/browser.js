// Browser related functions

function GetBrowserRoot()
{
	if (_moz||_ns) return "moz";
	if (_saf) return "safari";
	if (_macIE) return "macie";
	if (_opera) return "opera";
	return "winie";
}

function GetBrowserEngineRoot()
{
	return GetBrowserRoot();
}
