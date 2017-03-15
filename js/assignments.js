var timer = true;
var firstStartClick = 0;
var sleepingHoursGl = 0;
var sleepStartTimeGl = 0;
var startHandler;
var hideInactiveAssignments = function(node,obj_id) {
  var currentAssignmentTimerContId = $(node).attr("rel");
  $.cookie("currentAssignmentTimerContIdCookie",currentAssignmentTimerContId); //Assignment Container id for saving time into parse
  clearInterval(startHandler);
  
  $("#assignmentList tr").each(function(el){
    if ($(this).attr("id") !== $(node).parent().attr("id")){
      $(this).hide();
    } else {
      var timeRemaining = $('#'+currentAssignmentTimerContId).text();
	  
	  //split time and seconds if user has saved time in minutes and seconds
	  var tmpMinSecArr = timeRemaining.split(" : ");
	  
	  
      tmpMinSecArr[0].trim();
	  $.cookie("currentAssignmentTimerContID_cookie",'#'+currentAssignmentTimerContId);
      var numberOfLetters = tmpMinSecArr[0].length;
      var finalTimeWithSpaces="";
      for ( var i = 0; i < numberOfLetters; i ++ ) {
        if(timeRemaining[i] == timeRemaining[i]/1) {
            finalTimeWithSpaces= finalTimeWithSpaces + timeRemaining[i];
        }
      }
      //removes extra space
      var finalTime= parseInt(finalTimeWithSpaces.replace(/\s+/g, ''));

      var display = $($(this).find('td')[1]);
      
      if(parseInt(tmpMinSecArr[1])>0){
			var seconds = parseInt(tmpMinSecArr[1]);		  
	  }else{
			var seconds = 59;
	  }
	  document.cookie="assignmentTtime=" + finalTime; //Added Synsynoia
      startTimer(finalTime, seconds, display);
      console.log(finalTime+"::"+display);
    }
  });
  document.getElementById("addMinutes").style.display = "block";
  document.getElementById("addMinutesButton").style.display = "block";
  
  		//Updating lap details on parse  start and stop click starts - Synsynoia
		updateLapDetails("StartStop","InProcess");        

        $('#countDown').attr('disabled',true);
        $('#pause').attr('disabled',false);  
  		//Code for tracking time between start and stop click ends - Synsynoia

		var checkIfAssAlreadyStarted = $.cookie('sessionStartTimeCookie');
		var curTime = new Date();

		if(typeof checkIfAssAlreadyStarted == 'undefined'){
			var curTime = new Date();
			hours = curTime.getHours() > 12 ? curTime.getHours() - 12 : curTime.getHours();
			if(curTime.getMinutes()<10){
				currTimeHHMM = hours + ":0" + curTime.getMinutes();
			}else{
				currTimeHHMM = hours + ":" + curTime.getMinutes();
			}
			$.cookie("assignmentStartTime", currTimeHHMM);
			$.cookie("sessionStartTimeCookie", curTime.getTime());
		}
		
		var currSrc = $("#clockIframe").attr("src");
		$("#clockIframe").attr("src", currSrc);
  
}

function updateLapDetails(buttonMode,lapStatus){
		var uname = $.cookie("username");
		Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
				
		var query = new Parse.Query("LoginDetails");
		query.equalTo("UserName", uname);
		query.descending("SessionStartedOn");
		query.first({
		   success: function(result){
		   		var currentSessionObjId = result.id;
				if(lapStatus == "InProcess"){
					//Update Current Active lap if there is already one istance of start is in process >>
					if(result.get("LastLapDetails")!=undefined){
						var lastActiveLap = $.parseJSON(result.get("LastLapDetails"));
					}else{
						var lastActiveLap = {"buttonMode":"","lapStatus":"","startTime":0};
					}
					if(lastActiveLap.buttonMode == "StopStart" && lastActiveLap.lapStatus == "Ended"){
						var e = new Date().getTime();
						var newbandDetails = {};
						newbandDetails.title = "Blank";
						var stTime = lastActiveLap.startTime;
						newbandDetails.timeSpent = e - parseInt(stTime);
						newbandDetails.lapStartTime = parseInt(stTime);
						if(result.get("LapData")){
							var objLapData = $.parseJSON(result.get("LapData"));
							objLapData.push(newbandDetails);
							var objLapDataString = JSON.stringify(objLapData);
						}else{
							var objLapData = [];
							objLapData.push(newbandDetails);
							var objLapDataString = JSON.stringify(objLapData);
						}
						
						var lapUpdateClass = Parse.Object.extend("LoginDetails");
						var lapUpdate = new lapUpdateClass();
						lapUpdate.id = currentSessionObjId;
					
						lapUpdate.set("LapData",objLapDataString);
						// Save
						lapUpdate.save(null, {
						  success: function(lapUpdate) {
							// Saved successfully.
							console.log("LapData Updated Successfully");
						  },
						  error: function(point, error) {
							// The save failed.
							console.log("LapData Update failed");
						  }
						});	
					}
					//Update Current Active lap if there is already one istance of start is in process << 
					
					
					var lastActiveLap = {};
					lastActiveLap.buttonMode = buttonMode;
					lastActiveLap.lapStatus = lapStatus;
					s = new Date().getTime();
					lastActiveLap.startTime = s;
					var tmpStringifyStr = JSON.stringify(lastActiveLap);
					
					var lapUpdateClass = Parse.Object.extend("LoginDetails");
					var lapUpdate = new lapUpdateClass();
					lapUpdate.id = currentSessionObjId;
				
					lapUpdate.set("LastLapDetails",tmpStringifyStr);
					// Save
					lapUpdate.save(null, {
					  success: function(lapUpdate) {
						// Saved successfully.
						console.log("LastLapDetails Updated Successfully - Start Stop");	
					  },
					  error: function(point, error) {
						// The save failed.
						console.log("LastLapDetails Update failed");
					  }
					});
				}else if(lapStatus == "Ended"){
					var lastActiveLap = $.parseJSON(result.get("LastLapDetails"));
					var e = new Date().getTime();
					var newbandDetails = {};
					newbandDetails.title = "Study";
					var stTime = lastActiveLap.startTime;
					newbandDetails.timeSpent = e - parseInt(stTime);
					newbandDetails.lapStartTime = parseInt(stTime);
					if(result.get("LapData")){
						var objLapData = $.parseJSON(result.get("LapData"));
						objLapData.push(newbandDetails);
						var objLapDataString = JSON.stringify(objLapData);
					}else{
						var objLapData = [];
						objLapData.push(newbandDetails);
						var objLapDataString = JSON.stringify(objLapData);
					}
					
					var lapUpdateClass = Parse.Object.extend("LoginDetails");
					var lapUpdate = new lapUpdateClass();
					lapUpdate.id = currentSessionObjId;
				
					lapUpdate.set("LapData",objLapDataString);
					// Save
					lapUpdate.save(null, {
					  success: function(lapUpdate) {
						// Saved successfully.
						console.log("LapData Updated Successfully");
						var lastActiveLap = {};
						lastActiveLap.buttonMode = buttonMode;
						lastActiveLap.lapStatus = lapStatus;
						s = new Date().getTime();
						lastActiveLap.startTime = s;
						var tmpStringifyStr = JSON.stringify(lastActiveLap);
						
						var lapUpdateClass = Parse.Object.extend("LoginDetails");
						var lapUpdate = new lapUpdateClass();
						lapUpdate.id = currentSessionObjId;
					
						lapUpdate.set("LastLapDetails",tmpStringifyStr);
						// Save
						lapUpdate.save(null, {
						  success: function(lapUpdate) {
							// Saved successfully.
							console.log("LastLapDetails Updated Successfully - Stop Start");	
						  },
						  error: function(point, error) {
							// The save failed.
							console.log("LastLapDetails Update failed");
						  }
						});						
						
					  },
					  error: function(point, error) {
						// The save failed.
						console.log("LapData Update failed");
					  }
					});
					
				}else if(lapStatus == "SocialInProgress"){
					var lastActiveLap = $.parseJSON(result.get("LastLapDetails"));
					var e = new Date().getTime();
					var newbandDetails = {};
					newbandDetails.title = "SocialSites";
					var stTime = lastActiveLap.startTime;
					newbandDetails.timeSpent = e - parseInt(stTime);
					newbandDetails.lapStartTime = parseInt(stTime);
					if(result.get("LapData")){
						var objLapData = $.parseJSON(result.get("LapData"));
						objLapData.push(newbandDetails);
						var objLapDataString = JSON.stringify(objLapData);
					}else{
						var objLapData = [];
						objLapData.push(newbandDetails);
						var objLapDataString = JSON.stringify(objLapData);
					}
					
					var lapUpdateClass = Parse.Object.extend("LoginDetails");
					var lapUpdate = new lapUpdateClass();
					lapUpdate.id = currentSessionObjId;
				
					lapUpdate.set("LapData",objLapDataString);
					// Save
					lapUpdate.save(null, {
					  success: function(lapUpdate) {
						// Saved successfully.
						console.log("LapData Updated Successfully");
						var lastActiveLap = {};
						lastActiveLap.buttonMode = buttonMode;
						lastActiveLap.lapStatus = lapStatus;
						s = new Date().getTime();
						lastActiveLap.startTime = s;
						var tmpStringifyStr = JSON.stringify(lastActiveLap);
						
						var lapUpdateClass = Parse.Object.extend("LoginDetails");
						var lapUpdate = new lapUpdateClass();
						lapUpdate.id = currentSessionObjId;
					
						lapUpdate.set("LastLapDetails",tmpStringifyStr);
						// Save
						lapUpdate.save(null, {
						  success: function(lapUpdate) {
							// Saved successfully.
							console.log("LastLapDetails Updated Successfully - Stop Start");	
						  },
						  error: function(point, error) {
							// The save failed.
							console.log("LastLapDetails Update failed");
						  }
						});						
						
					  },
					  error: function(point, error) {
						// The save failed.
						console.log("LapData Update failed");
					  }
					});					
				}
				
		   },
		   error: function(error){
			   console.log(error);
		   },
		
		})
}

function addMinutes(nom,msgId){
	document.querySelector('#'+msgId).show();
	var timeRemaining = $($.cookie("currentAssignmentTimerContID_cookie")).text();
	var tempArr = timeRemaining.trim().split(":");
	var newMinutes = parseInt(tempArr[0])+nom;

	var newTimeRemaining = newMinutes+tempArr[1].trim();
	$($.cookie("currentAssignmentTimerContID_cookie")).text(newMinutes+" : "+tempArr[1].trim());
	clearInterval(startHandler);
	var display = $($.cookie("currentAssignmentTimerContID_cookie"));

	var seconds = 59;
	document.cookie="assignmentTtime=" + newTimeRemaining;
	startTimer(newTimeRemaining, seconds, display);
}

var showInactiveAssignments = function(node,objID) {
  clearInterval(startHandler);
  timer = false;
  $("#assignmentList tr").each(function(el){
    $(this).show();
  });
  document.getElementById("addMinutes").style.display = "none";
  document.getElementById("addMinutesButton").style.display = "none";
  
  //Code for tracking time between stop and start click starts - Synsynoia
        var uname = $.cookie("username");
		console.log("uname:"+uname);
		Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
				
		var query = new Parse.Query("LoginDetails");
		query.equalTo("UserName", uname);
		query.descending("SessionStartedOn");
		query.first({
		   success: function(result){
				var lastLapDetStr = result.get("LastLapDetails");
				var lastActiveLapObj = $.parseJSON(lastLapDetStr);
				if(lastActiveLapObj.lapStatus=="InProcess"){
					updateLapDetails("StopStart","Ended");					
				}else if(lastActiveLapObj.lapStatus=="SocialInProgress"){
					updateLapDetails("StopStart","SocialInProgress");
				}
		   },
		   error: function(){
			   console.log(response.error());
		   },
		
		})

        $('#countDown').attr('disabled',false);
        $('#pause').attr('disabled',true);  
   
   //Save remaining time to parse starts here
   		var currentAssignmentTimerContId = $(node).attr("rel");
		var rawNewRemTime = $("#"+currentAssignmentTimerContId).html().replace(" : ", ".");
		var newRemainingTime = parseFloat(rawNewRemTime);
		
		Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");

		var Point = Parse.Object.extend("Assignment");
		var point = new Point();
		point.id = objID;
		
		point.set("time", newRemainingTime);

		point.save(null, {
		  success: function(point) {
			console.log("Time Updated Successfully");	
		  },
		  error: function(point, error) {
			console.log("Time Update process failed");
		  }
		});
   //Save remaining time to parse ends here
  //Code for tracking time between stop and start click ends - Synsynoia
  		//Refresh all Bands - 
		var currSrc = $("#clockIframe").attr("src");
		$("#clockIframe").attr("src", currSrc);
}

// Timer function
function startTimer(minutesRemaining, secondsRemaining, display) {
	timer = true;
	minutesRemaining = minutesRemaining.toString();
	
	if(firstStartClick ==1) {
		if(minutesRemaining.length>=4){
			secondsRemaining = minutesRemaining.slice(-2);
			var minutesRemaining = minutesRemaining.substring(0, minutesRemaining.length - 2);
		}else{
			if(secondsRemaining==59){
				minutesRemaining--;
			} 
			firstStartClick = 1;
		}
	}
	
	//Below code is for first time click on Start button.
	if(firstStartClick == 0 ) {
		if(secondsRemaining==59){
			minutesRemaining--;
		}
		firstStartClick = 1;
	}
	
  	startHandler = setInterval(function () {
    // actual minutes algorithm

		if(minutesRemaining >= 0) {
		  if(timer == true) {
              secondsRemaining--;
			  if(secondsRemaining>0){
				 if(parseInt(secondsRemaining)>=1 && parseInt(secondsRemaining)<10){
			  		display.text(parseInt(minutesRemaining) + " : 0" + parseInt(secondsRemaining));
				 }else{
					display.text(parseInt(minutesRemaining) + " : " + parseInt(secondsRemaining));
				 }
			  }else{
				display.text(parseInt(minutesRemaining) + " : 00");
			  }
			
			if(secondsRemaining == 0) {
			  minutesRemaining--;
			  secondsRemaining = 60;
			}
		  } else {
			// do nothing
		  }
		  
		} else {
		  display.text("Finished!");
		  console.log("Finished!");
		  //Update assignment to completed on parse starts
			var objID = display.attr("id");
			objID = objID.replace("timeInput_","")
			console.log("Current Finished assignment object id:"+objID);			
			Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
	
			var Point = Parse.Object.extend("Assignment");
			var point = new Point();
			point.id = objID;
			
			point.set("completed", 1);
	
			point.save(null, {
			  success: function(point) {
				console.log("Time Updated Successfully");
				updateLapDetails("StopStart","Ended");
			  },
			  error: function(point, error) {
				console.log("Time Update process failed");
			  }
			});
	  		clearInterval(startHandler);
		  //Update assignment to completed  on parse ends
		}
  	}, 1000);
}

$(document).ready(function(){
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
  // delete the assignment from the table
  window.deleteAssignment = function deleteAssignment(elem) {
    $(elem).parent().remove();

    var rowId = Parse.Object.extend("Assignment");
    var queryRemove = new Parse.Query(rowId);
    var obj = $(elem).parent();
    queryRemove.get($(elem).parent().attr('id'), {
      success: function(obj) {
        console.log(obj + " got it");
        obj.destroy({
          success: function() {
            console.log("Deleted!");
          },
          error: function () {
            console.log("Deleted fail!");
          }
        });
      },
      error: function(obj ,error) {
        console.log("error.");
      }
    });
  }

  //Returns the Username of the current user by accessing a cookie
	var getUsername = function (){
		var username = getCookie("usernameext");
		return username;
	}

  //Returns user to registration if no username/cookie present
  var username = getCookie("username");
  if (username == "") {
	 console.log("Username not found");
	 window.location.replace("registration.html");
	 //document.location = "registration.html";
  }

  var currentAssignmentId;

  $("#" + currentAssignmentId).addClass();

  //Creates a New assignment
  $("#addNewAssignment").on('click', function(){
    var username = getCookie("username");
    var assignment = $("#assignment").val();
    var time = parseInt($("#mins").val());
    if (time == null || assignment == "") {
      window.alert("Please input an assigment and how long you think it will take!");
    } else if (time > 0) {
      createNewAssignment(assignment, username, time);
      console.log(time);
    }
    // remove the add buttons
    document.getElementById("addMinutes").style.display = "none";
    document.getElementById("addMinutesButton").style.display = "none";
  });

  //  making the list of assignment in the ui from the assignments pulled from the database
  var createNewTR = function (result, objectId){
      var tr = $('<tr></tr>');
      //adding assignment id to the row
      $(tr).attr("id", objectId);

     //Table element values
	   var td = '<input type="button" value="\u00D7" id="remove" class="remoteButtons" style="position: relative; right: -15%; margin-top: 8px; background: transparent; border-color: transparent; color: white" onclick="deleteAssignment(this)">';
      var td2 = $('<td></td>').text(result.get("assignment"));
	  var tmpTime = result.get("time");
	  tmpTime = tmpTime.toFixed(2);
	  tmpTime = tmpTime.toString().replace("."," : ");
      var td3 = $('<td id="timeInput_'+objectId+'" class="centerMin" ></td>').text(tmpTime);
	  //var td3 = $('<td id="timeInput'+objectId+'"></td>').text(result.get("time"));
      // Start Button
      var td4 = '<input type="button" value="Start" id="countDown" class="remoteButtons" style="font-size: 16px; font-weight: 10px; background: white; width: 65px; border-radius: 4px; height: 30px; color: green;border: 2px solid white;-webkit-transition: .7s; position: relative;left: 95px;" rel="timeInput_'+objectId+'" onclick="hideInactiveAssignments(this)">';
      // Stop Button
      var td5 = '<input type="button" value="Stop" id="pause" class="remoteButtons" style="font-size: 16px; font-weight: 10px; background: white; width: 65px; border-radius: 4px; height: 30px; color: red;border: 2px solid white;-webkit-transition: .7s; position: relative; left: 100px;" rel="timeInput_'+objectId+'" onclick="showInactiveAssignments(this,\''+objectId+'\')" >';
      // Delete Button

      //This makes the list in the table
      $(tr).append(td);
      $(tr).append(td2);
      $(tr).append(td3);
      $(tr).append(td4);
      $(tr).append(td5);

      //This is the date that the assignment is added to Parse
      var seconds = result.get("time");

      var t;
      var count = result.get("time");

      $("#assignmentList").append(tr);
  }

  //Makes the Assignment list by searching for items in parse given the username
  var makeAssignmentList = function(username){
	var totAssignmentTime = 0;
    var query = new Parse.Query("Assignment");
    
    query.equalTo("username", username);
    query.equalTo("completed", 0);
	//console.log(query);
    query.find({
  	  success: function(results){
    	  for(var i = 0; i < results.length; i++ ){
      	   var objectId = results[i].id;
      	   //Query to determine whether or not the Assignment was completed
      	   var completedQuery = results[i].get("completed");
      	   //Determines date of assignment
      	   var createdAt = results[i].get("createdAt");
           // gets the date of assignment in the format below
      	   var date = new Date(createdAt);
      	   var yr = date.getFullYear();
      	   var mo = date.getMonth() + 1;
      	   var day = date.getDate();
      	   var newCreatedAt = yr + '-' + mo  + '-' + day;

           //Adds values to the other table values
           createNewTR(results[i], objectId);
    	   }
		   //document.cookie="assignmentTtime=" + totAssignmentTime;
  	   },
    	error: function( assignment,error) {
    		// Show the error message somewhere and let the user try again.
    		console.log("Error: " + error.code + " " + error.message);
      }
    });
  };

  //Returns the date today
  var todayDate = function(){
  	   //Determines the date today
	   var currentDate = new Date();
	   var dayToday = currentDate.getDate();
	   var month = currentDate.getMonth() + 1;
	   var year = currentDate.getFullYear();
	   var todayDate = year+ '-' + month  + '-' + dayToday;
	   return todayDate;
  }

//Function for creating a new assignment and adding to the database
  var createNewAssignment = function (assignmentName, username, time){
    var Assignment = Parse.Object.extend("Assignment");

    //Creating a new instance of the class
    var assignment = new Assignment();

    var _assignmentName = assignmentName;
    var _time = time;
	console.log("_assignmentName: " + _assignmentName + "_time:" + _time+ "_time:" + username);
    var assignment_data = {assignment: _assignmentName, username: username, time: _time, completed: 0};

    /* Save the Assignment */

    assignment.save(assignment_data,{
      success: function(assignment) {
        //add the newly created assignment to the bottom of the table
        var assignmentList = $("#assignmentList");
        assignmentList.html("");
        makeAssignmentList(username);
     },
      error: function( assignment,error) {
       // Show the error message somewhere and let the user try again.
       console.log("Error: " + error.code + " " + error.message);
      }
    });
	 //things to do after the save takes place
    };

    //var username = getUsername();
	var username = getCookie("username");
    makeAssignmentList(username);

    var done= document.getElementById('done-button');
    //console.log(done);

    $(".done-button").click(function(){
	     console.log(clicked);
    });

    //Function to send settings data to Parse
    //Go to line 200 for reference
    $('#saveButton').on('click', function() {
	  var username = getCookie("username");	
      //console.log("button clicked");
	  var sleepHour = parseInt($('#idsleepHour').val());
      var sleepMinute = parseInt($('#idsleepMin').val());
	  var sleepAmpm = $('#idsleepAmpm').val();
      var wakeUpHr = parseInt($('#idwakeUpHR').val());	
      var wakeUpMin = parseInt($('#idwakeUpMin').val()); 
	  var wakeupAmpm = $('#idwakeupAmpm').val();
	  	 
		 //Sleeping hours should not be greater than 12 hours starts
		 if(sleepAmpm!=wakeupAmpm){
			 var sleepingHoursCheck = computeTimeDifference(sleepHour,sleepMinute,sleepAmpm,wakeUpHr,wakeUpMin,wakeupAmpm);
			 var tmpArrSleepingHours = sleepingHoursCheck.split(":");
			 console.log("tmpArrSleepingHours[0]:"+tmpArrSleepingHours[0]+"---tmpArrSleepingHours[1]"+tmpArrSleepingHours[1]);
			 if(parseInt(tmpArrSleepingHours[0])==12 && parseInt(tmpArrSleepingHours[1])>0){
				 tmpArrSleepingHours[0] = tmpArrSleepingHours[0]+"."+tmpArrSleepingHours[1];
			 }
			 
			 if(parseInt(tmpArrSleepingHours[0])>=12){
				alert('Sleep time can not be more than 12 hours.');
				$("#idwakeUpHR").focus();
				return false;
			 }else{
				//Resetting time cookies for sleep time band
				var tmpHHMMArr = sleepingHoursCheck.split(":");
				var secs1 = parseInt(tmpHHMMArr[0])*60*60;
				var secs2 = parseInt(tmpHHMMArr[1])*60;
				sleepingHoursGl = secs1+secs2;
				document.cookie="slHourCk=" + sleepingHoursGl;
				document.cookie="slStratTimeCk=" + timeSetsArr[sleepHour+":"+sleepMinute];
				document.cookie="sleepStartTimeForRedBand=" + sleepHour+":"+sleepMinute;
			 }
		 }
		 //Sleeping hours should not be greater than 12 hours ends
	 

      console.log(sleepHour + " --> start work (hour)");
      console.log(sleepMinute + " --> start work (min)");
	  console.log(sleepAmpm + " --> ampm");
	  console.log(wakeUpHr + " --> wake up time (hour)!");
      console.log(wakeUpMin + " --> wake up time (min)!");
	  console.log(wakeupAmpm + " --> ampm");
      //console.log(otherActivitiesHr + " --> other activities (hour)");
      //console.log(otherActivitiesMin + " --> other activities (min)");
      console.log(username + " --> current user.");

      //Sending settings data to Parse
      var SettingsId = Parse.Object.extend("Settings");
      // Look for user's objectId in settings Class
      var objectId = new Parse.Query(SettingsId);
      objectId.equalTo("username", username);
	  //alert(username);
      objectId.first({
        success: function(objectId) {
          var objectSettingsId = objectId.id;
          var settingsId = new SettingsId();
          settingsId.id = objectSettingsId;

		  settingsId.set("sleepHour", sleepHour);
          settingsId.set("sleepMinute", sleepMinute);
		  settingsId.set("sleepAmpm", sleepAmpm);
          settingsId.set("wakeUpHour", wakeUpHr);
          settingsId.set("wakeUpMinute", wakeUpMin);
		  settingsId.set("wakeupAmpm",  wakeupAmpm);

          settingsId.save(null, {
            success: function(settingsId) {
              console.log("Saved to Parse");
			  toggleDialog('paper-dialog-transition-center');
			  //Reloading new timings
			  var currSrc = $("#clockIframe").attr("src");
			  $("#clockIframe").attr("src", currSrc);
			  document.querySelector('#toast1').show();
			  checkSettingsSave=1;
            },
            error: function(settingsId, error) {
              console.log(error + " error");
            }
          });
        },
        error: function(error) {
          console.log(error + " --> error");
        }
      });
    });

    $('#settingsButton').on('click', function(){
										  
      var SettingsId = Parse.Object.extend("Settings");
      // Look for user's objectId in settings Class
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
    });
	
});

$( window ).unload(function() {
	if (typeof $.cookie('currentAssignmentTimerContIdCookie') != 'undefined'){
		var currentTimerContId = $.cookie("currentAssignmentTimerContIdCookie");
		console.log("currentTimerContId:"+currentTimerContId);
		var tmpArrForObjId = currentTimerContId.split("_");
		var curTime = $("#"+currentTimerContId).html();
		if(typeof curTime != 'undefined'){
			var rawNewRemTime = curTime.replace(" : ", ".");
			var newRemainingTime = parseFloat(rawNewRemTime);

			if(parseFloat(rawNewRemTime)>0){
				Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
			
				var Point = Parse.Object.extend("Assignment");
				var point = new Point();
				point.id = tmpArrForObjId[1];
				
				// Set a new value on quantity
				point.set("time", newRemainingTime);
				
				// Save
				point.save(null, {
				  success: function(point) {
					// Saved successfully.
					console.log("Time Updated Successfully");	
				  },
				  error: function(point, error) {
					// The save failed.
					console.log("Time Update process failed");
				  }
				});
			}
		}
   }
	
	//Saving lap if user has not clicked on Stop button
        var uname = $.cookie("username");
		console.log("uname:"+uname);
		Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
				
		var query = new Parse.Query("LoginDetails");
		query.equalTo("UserName", uname);
		query.descending("SessionStartedOn");
		query.first({
		   success: function(result){
				var lastActiveLap = $.parseJSON(result.get("LastLapDetails"));
				if(lastActiveLap.lapStatus=="InProcess"){
					updateLapDetails("StopStart","Ended");					
				}else if(lastActiveLap.lapStatus=="SocialInProgress"){
					updateLapDetails("StopStart","SocialInProgress");
				}
		   },
		   error: function(result,error){
			   console.log('Failed to create new object, with error code: ' + error.message);
		   },
		
		})
});

//added by synsynoia
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
