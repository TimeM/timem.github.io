// Get all setting attributes
//get settings attributes starts here
	  var username = $.cookie("username");
	  Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
      var SettingsId = Parse.Object.extend("Settings");
      var objectId = new Parse.Query(SettingsId);
      objectId.equalTo("username", username);
      objectId.first({
        success: function(objectId) {
          var userId = objectId.id;
          var SettingsData = Parse.Object.extend("Settings");
          var preSettingsData = new Parse.Query(SettingsData);
          preSettingsData.get(userId, {
            success: function(userId) {             
              var sleepHourData = userId.get("sleepHour");
              var sleepMinuteData = userId.get("sleepMinute");
			  var sleepAmpmData = userId.get("sleepAmpm");
			  var wakeUpHourData = userId.get("wakeUpHour");
              var wakeUpMinuteData = userId.get("wakeUpMinute");
			  var wakeupAmpmData = userId.get("wakeupAmpm");
			  $('#idsleepHour').val(sleepHourData+":00").attr("selected", "selected");
			  $('#idsleepMin').val(sleepMinuteData).attr("selected", "selected");
			  $('#idsleepAmpm').val(sleepAmpmData).attr("selected", "selected");
			  $('#idwakeUpHR').val(wakeUpHourData+":00").attr("selected", "selected");
			  $('#idwakeUpMin').val(wakeUpMinuteData).attr("selected", "selected");
			  $('#idwakeupAmpm').val(wakeupAmpmData).attr("selected", "selected");
			  var timeDiffereceCal = computeTimeDifference(sleepHourData,sleepMinuteData,sleepAmpmData,wakeUpHourData,wakeUpMinuteData,wakeupAmpmData);
			  var tmpHHMMArr = timeDiffereceCal.split(":");
			  var secs1 = parseInt(tmpHHMMArr[0])*60*60;
			  var secs2 = parseInt(tmpHHMMArr[1])*60;
			  sleepingHoursGl = secs1+secs2;
			  document.cookie="slHourCk=" + sleepingHoursGl;
			  document.cookie="slStratTimeCk=" + timeSetsArr[sleepHourData+":"+sleepMinuteData];
			  document.cookie="sleepStartTimeForRedBand=" + sleepHourData+":"+sleepMinuteData;
			  
			  	//Determine wakeup time for checking if band is created after wakeup time >> 
				
				var dt = new Date();
				var curDay = dt.getDate();
				var curMonth = dt.getMonth();
				var curYear = dt.getFullYear();
				var curHour = dt.getHours();
				var curMin = dt.getMinutes();
				console.log(curHour);
				if(curHour>0 && curHour<wakeUpHourData){
					var wakeUpDay  = new Date(curYear,curMonth,curDay,wakeUpHourData,wakeUpMinuteData);
					wakeUpDay.setDate(wakeUpDay.getDate()-1);
				}else{
					var wakeUpDay  = new Date(curYear,curMonth,curDay,wakeUpHourData,wakeUpMinuteData);
				}
				var wakeTimeStamp = wakeUpDay.getTime();
				document.cookie="LastWakeUpTime=" + wakeTimeStamp;
				//Determine wakeup time for checking if band is created after wakeup time <<
            },
            error: function(userId) {
              console.log(error + " --> incorrect. MUST FIX!");
            }
          });
        },
        error: function(error) {
          console.log(error + " --> error");
        }
      });
	//get settings attributes ends here
	


	
function computeTimeDifference(hh1,mm1,ampm1,hh2,mm2,ampm2) {
	h1 = hh1;
	m1 = mm1;
	h2 = hh2;
	m2 = mm2;
	var er3a = 1;
	var er3b = 0;
	if ((er3a==0) && (h1==12)) {h1=0}

	if ((er3a==0) && (er3b==1)) {
	t1= (60*h1) + m1;
	if (h2==12) {
	t2= ((h2) * 60) + m2;}
	else {
	t2= ((h2+12) * 60) + m2;}
	t3= t2-t1;
	t4= Math.floor(t3/60)
	t5= t3-(t4*60)
	}
	else if ((er3a==1) && (er3b==0)) {
	if (h2==12) {h2=0}
	if (h1==12) {h1=0}
	t1= (60*h1) + m1;
	t2= ((h2+12) * 60) + m2;
	t3= t2-t1;
	t4= Math.floor(t3/60)
	t5= t3-(t4*60)
	}
	else if ((er3a==0) && (er3b==0)) {
	t1= (h1*60) + m1;

	if (h2==12) {h2=0}	

	t2= (h2*60) + m2;
		if (t2>t1) {
		t3= t2-t1;
		t4= Math.floor(t3/60)
		t5= t3-(t4*60)
		}
		else {
		t2= ((h2+24)*60) + m2;
		t3= t2-t1;
		t4= Math.floor(t3/60)
		t5= t3-(t4*60)
		}
	}
	else if ((er3a==1) && (er3b==1)) {
		if (h1!=12) {h1=h1+12}
		if (h2!=12) {h2=h2+12}
		t1= (h1*60) + m1;
		t2= (h2*60) + m2;
		if (t2>t1) {
		t3= t2-t1;
		t4= Math.floor(t3/60)
		t5= t3-(t4*60)
		}
		else {
		t2= ((h2+24)*60) + m2;
		t3= t2-t1;
		t4= Math.floor(t3/60)
		t5= t3-(t4*60)
		}
		}
	
	//alert("  " + t4  + "  hours  " + "  " + t5 + "  minutes");
   return t4+":"+t5;
}
