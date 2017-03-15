	var uname = $.cookie("username");
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
	var tempHtml = '';	
	var query = new Parse.Query("LoginDetails");
	query.equalTo("UserName", uname);
	query.descending("SessionStartedOn");
	query.first({
	   success: function(result){
			allLapsDataString = result.get("LapData");
			sessionStartTime = result.get("SessionStartedOn");
			lastLapDetailsParse = result.get("LastLapDetails");

			$.cookie("allLapsDataString",allLapsDataString);
			$.cookie("lastLapDetailsCookie",lastLapDetailsParse);
			
			//Get social sites spent time for graph generation
			if (typeof result.get("SocialSitesTime") != 'undefined'){
				var SocialSitesTimeObj = $.parseJSON(result.get("SocialSitesTime"));
				for (var key in SocialSitesTimeObj){
					var m = parseFloat(SocialSitesTimeObj[key])/60;
					m = m.toFixed(2);
					var a = m*100/275; // 275 is the 100% height of the bar, adjusted seconds as per the height
					a = a.toFixed(2);
					tempHtml += '<div class="bar"><div class="title">'+key+'</div><div class="value" title="Time spent on '+key+': '+m+' mins">'+a+'%</div></div>';
				}
				$.cookie('tempHtmlCk',tempHtml);
			}
	   },
	   error: function(){
		   console.log('Parse Error');
	   },
	
	})// JavaScript Document