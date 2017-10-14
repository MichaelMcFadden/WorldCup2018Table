





var maxNumber;
var timerGlobal;
var xmlhttp;
var url = null;

window.onload = loadPage;


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//Function Load all function when the page is loaded
function loadPage()
{
	maxNumber=3;
	selectNumber();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//Init the option and select the good option
function selectNumber()
{
	var i = 0;
	for(; i<7 ; i++)
	{
		document.getElementById("number").options[i] = new Option(i+2,i);
		if(i == (maxNumber-3)){
			document.getElementById("number").options[i].selected = true;
		}
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//When the option change, we hve to retrieve the rss with the new parameter
function selectChange()
{
	var temp = document.getElementById("number").value;
	maxNumber = eval( temp+"+2");
	launcherTimer();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//Function: create the Object for the request
function GetXmlHttpObject()
{
	if (window.XMLHttpRequest)
	  {
	  // code for IE7+, Firefox, Chrome, Opera, Safari
	  return new XMLHttpRequest();
	  }
	if (window.ActiveXObject)
	  {
	  // code for IE6, IE5
	  return new ActiveXObject("Microsoft.XMLHTTP");
	  }
	return null;
} 


///////////////////////////////////////////////////////////////////////////////////////////////////////////



//Function: give the url in relation with the parameter and launch the timer
function ajaxFunctionPage(urlParam)
{
	if(urlParam == "Breaking News") {
		url = "http://feeds.breakingnews.ie/bntopstories?format=xml";
	}
	else if(urlParam == "RTE News") {
			url = "http://www.rte.ie/rss/news.xml";
	}
	else if(urlParam == "Independent News"){
	    url = "http://www.independent.ie/breaking-news/rss/";
	}
	launcherTimer();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//Function: stop the previous timer and launcher the new timer
function launcherTimer()
{
	clearTimeout(timerGlobal);
	timer();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////



//Function:	retrieve the rss
//			when the state change, call the method stateChanged
//			call this method every 5 min if the page is not changed by the user
function timer()
{
	if(url == null)
	{
		return;
	}
	
	xmlhttp=GetXmlHttpObject();
 	if (xmlhttp==null)
    {
    	alert ("Your browser does not support AJAX");
    	return;
    }
	xmlhttp.onreadystatechange=stateChanged;
	var urlSend = "getRss.php?url="+url;
	xmlhttp.open("GET",urlSend,true);
	xmlhttp.send(null);
	timerGlobal = setTimeout("timer()", 5 * 60 * 1000);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//Function: when the state is 4 and the response is 200, we get the xml and print it on the page
function stateChanged()
{
	if(xmlhttp.readyState==4 && xmlhttp.status ==200) {
		var res = "";
		var node=xmlhttp.responseXML.documentElement;
		var channel=node.getElementsByTagName('channel')[0];
		var title_channel = channel.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		var link_channel = channel.getElementsByTagName("link")[0].childNodes[0].nodeValue;
		
		res = res + "<div class='downTitle_top'></div>";
		res = res + "<div class='downTitle'><a target='_blank' href='" + link_channel  + "'>" + title_channel + "</a>";
		res = res + "<div class='downTitle_bottom'></div>";
    	res = res + "<div class='downRss'><br/>";
	
		var nodeItem=node.getElementsByTagName('item');
		
		lg=nodeItem.length;
		maxLength = maxNumber;
		if(lg<maxLength){
			maxLength = lg;
		}
		
		for(i=0; i < maxLength; i++)
		{
			var title=nodeItem[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
			var date=nodeItem[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
			var desc=nodeItem[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
			var links=nodeItem[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
			var image = nodeItem[i].getElementsByTagName('enclosure')[0].getAttribute('url');			
			res = res + "<div ><a href='" + links  + "'>" + title + "</a>";
			res = res + "<img width='100%' height='10%' style='text-align: center'' src='" + image + "'/><br/>";
			if(i != maxLength-1)
				res = res + "<div class='space'></div>";
		}
			
		res = res + "</div><div class='downRss_bottom'></div>";	
		
		document.getElementById("rss_feed").innerHTML= res;
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

