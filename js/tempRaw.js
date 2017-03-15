// JavaScript Document
chrome.cookies.get({"url": 'http://localhost/time_m/Oct2015/', "name": 'eventTimeTrackArrStr'}, function(cookie) {
            arrayString = cookie.value;
			var eventTimeTrackArrExt = JSON.parse(decodeURIComponent(arrayString));
            
			chrome.cookies.get({"url": 'http://localhost/time_m/Oct2015/', "name": 'currentLap'}, function(cookie) {
				curLap = cookie.value;
				console.log("Time spent - Before:"+eventTimeTrackArrExt[curLap][5]);
				eventTimeTrackArrExt[curLap][4] = "SocialInProgress";
				eventTimeTrackArrExt[curLap][5] = parseInt(eventTimeTrackArrExt[curLap][5])+timeSeconds;
				console.log("Time spent - After:"+eventTimeTrackArrExt[curLap][5]);
				var arrString = JSON.stringify(eventTimeTrackArrExt);
				chrome.cookies.set({"name":"eventTimeTrackArrStr","url":"http://localhost/time_m/Oct2015/assignments.html","value":arrString},function (cookie){
					console.log("Time spent on SS added in the Lap Array");
				});
				chrome.cookies.set({"name":"eventTimeTrackArrStr","url":"http://localhost/time_m/Oct2015/load_timer.html","value":arrString},function (cookie){
					console.log("Time spent on SS added in the Lap Array");
				});
				
				chrome.cookies.get({"url": 'http://localhost/time_m/Oct2015/', "name": 'trackingSitesArrStr'}, function(cookie) {
					arrayString1 = cookie.value;
					console.log("trackingSitesExt[arrString1]"+arrayString1);
					var trackingSitesExt = JSON.parse(decodeURIComponent(arrayString1));
					trackingSitesExt[theSite] = parseInt(trackingSitesExt[theSite])+timeSeconds;
					var arrString2 = JSON.stringify(trackingSitesExt);
					console.log("trackingSitesExt[arrString2]"+arrString2);
					chrome.cookies.set({"name":"trackingSitesArrStr","url":"http://localhost/time_m/Oct2015/assignments.html","value":arrString2},function (cookie){
						console.log("Time spent on SS added in the tracking site Array");
					});
					chrome.cookies.set({"name":"trackingSitesArrStr","url":"http://localhost/time_m/Oct2015/load_timer.html","value":arrString2},function (cookie){
						console.log("Time spent on SS added in the tracking site Array");
					});
				});
			})
        });	





function updateLapDetails(updateInsert,currentLap,buttonMode,lapStatus,curLapObjId){
		var uname = $.cookie("username");
		Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
		if(updateInsert==1){
			var lapUpdateClass = Parse.Object.extend("Websites");
			var lapUpdate = new lapUpdateClass();
			
			lapUpdate.set("currentLap",currentLap);
			lapUpdate.set("buttonMode",buttonMode);
			lapUpdate.set("UserName",uname);
			lapUpdate.set("lapStatus",lapStatus);
			
			lapUpdate.save(null,{
			  success:function(lapUpdate) { 
				var curLapId = lapUpdate.id;
				$.cookie("currentLapObjectId",lapUpdate.id);
			  },
			  error:function(error) {
				response.error(error);
			  }
			});
		}else if(updateInsert==0){
			var n = new Date().getTime();
			var lapUpdateClass = Parse.Object.extend("Websites");
			var lapUpdate = new lapUpdateClass();
			lapUpdate.id = curLapObjId;
			console.log("curLapObjId::::"+curLapObjId);
			
			/*var Point = Parse.Object.extend("Assignment");
			var point = new Point();
			point.id = objID;*/
			
			// Set a new value on quantity
			lapUpdate.set("buttonMode",buttonMode);
			lapUpdate.set("lapEndTime",n);
			lapUpdate.set("lapStatus",lapStatus);
			
			// Save
			lapUpdate.save(null, {
			  success: function(lapUpdate) {
				// Saved successfully.
				console.log("Lap Updated Successfully");	
			  },
			  error: function(point, error) {
				// The save failed.
				console.log("Lap Update failed");
			  }
			});
		}
}



	/*var Point = Parse.Object.extend("Assignment");
		var point = new Point();
		point.id = objID;*/
		
		// Set a new value on quantity
		lapUpdate.set("buttonMode",buttonMode);
		lapUpdate.set("lapEndTime",n);
		lapUpdate.set("lapStatus",lapStatus);
		
		// Save
		lapUpdate.save(null, {
		  success: function(lapUpdate) {
			// Saved successfully.
			console.log("Lap Updated Successfully");	
		  },
		  error: function(point, error) {
			// The save failed.
			console.log("Lap Update failed");
		  }
		});