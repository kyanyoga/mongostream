// outside loop into stream
twit.stream('statuses/filter',  { track: arrayOfTopics }, function(stream) {
        // console.log(arrayOfTopics);
        stream.on('data', function (data) {
        
        arrayOfTopics.forEach(function (arrayOfTopics) {
                var myRegExp = new RegExp(arrayOfTopics)
                if (data.text.match(myRegExp)) {
                redisClient.incr('global:dailyHarvCnt');
                redisClient.incr(arrayOfTopics);
                // insert mongodb record
                // insert tweet -- mongo collection
		collection.insert({'dt': moment().format('YYYY-MM-DD HH:MM:SS'), //funded: data.coordinates -geotags
                                'topic': arrayOfTopics, 
				'tweet': data.text}, function(err, result) {
            			if (err) { console.log(err);}
        	});
        	//
        	console.log(moment().format('YYYY-MM-DD HH:MM:SS') + 
        			'|' + arrayOfTopics + 
        			'|' + data.text);    
                //
        	}
		 });
		// console.log(moment().format('YYYY-MM-DD HH:MM:SS') + ' ' + data.text);    	
      });
    });
  });