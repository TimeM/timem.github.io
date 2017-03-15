	if($.cookie("eventTimeTrackArrStr")){
        var eventTimeTrackArrTest = $.parseJSON($.cookie("eventTimeTrackArrStr"));
        if(eventTimeTrackArrTest[eventTimeTrackArrTest.length-1][4]=="InProcess" && eventTimeTrackArrTest[eventTimeTrackArrTest.length-1][1]=="StartStop"){
            $('#countDown').attr('disabled',true);
        }else if(eventTimeTrackArrTest[eventTimeTrackArrTest.length-1][4]=="InProcess" && eventTimeTrackArrTest[eventTimeTrackArrTest.length-1][1]=="StopStart"){
            $('#pause').attr('disabled',true);
        }
    }
    
    
    $("#idStart").click(function(){
        var d = new Date();
        var n = d.getTime();
        if(!$.cookie("currentLap")){
            var eventTimeTrackArr = new Array(); //[lapNumber,mode,StartTime,Endtime,lapStatus]
			eventTimeTrackArr[0] = [0,'StartStop',n ,0, 'InProcess'];
            $.cookie("eventTimeTrackArrStr", JSON.stringify(eventTimeTrackArr));
            $.cookie("currentLap", 0);
        }else{
            var curLap = parseInt($.cookie("currentLap"));
			console.log("Current Lap:"+curLap);
			var eventTimeTrackArr = $.parseJSON($.cookie("eventTimeTrackArrStr"));
			if(curLap>=1){
				eventTimeTrackArr[curLap][3] = n;
				eventTimeTrackArr[curLap][4] = "Ended";
				curLap = curLap+1;
			}else{
				curLap = curLap+1;
			}
            eventTimeTrackArr[curLap] = [curLap,'StartStop',n ,0, 'InProcess'];
            $.cookie("eventTimeTrackArrStr", JSON.stringify(eventTimeTrackArr));
            $.cookie("currentLap", curLap);
        }
        var currentLap = parseInt($.cookie("currentLap"));
        $('#idStart').attr('disabled',true);
        $('#idStop').attr('disabled',false);
        
    })
    
    $("#idStop").click(function(){
        var eventTimeTrackArr = $.parseJSON($.cookie("eventTimeTrackArrStr"));
        var d = new Date();
        var n = d.getTime();
        var curLap = parseInt($.cookie("currentLap"));
        console.log("Current Lap:"+curLap);
        eventTimeTrackArr[curLap][3] = n;
		eventTimeTrackArr[curLap][4] = "Ended";
		eventTimeTrackArr[curLap+1] = [curLap+1,'StopStart',n ,0, 'InProcess'];
		
		$.cookie("currentLap", curLap+1);
        $.cookie("eventTimeTrackArrStr", JSON.stringify(eventTimeTrackArr));

        $('#idStart').attr('disabled',false);
        $('#idStop').attr('disabled',true);
        
    })