// simple mongo streamer
var twitter = require('ntwitter');
var util = require('util');
var credentials = require('./credentials.js');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var moment = require('moment'); 
    
// Twitter Stream Topics
var arrayOfTopics = ['pie','summer', 'mongodb','bigdata','gpu','tensorflow']; // topics

// oauth twitter client
var twit = new twitter({
  		consumer_key: credentials.consumer_key,
  		consumer_secret: credentials.consumer_secret,
  		access_token_key: credentials.access_token_key,
  		access_token_secret: credentials.access_token_secret
});


// MongoDB Client Connection - To your Local or remote MongoDB Database
// NOTE: The name is at the end of the connection : streamland
MongoClient.connect('mongodb://127.0.0.1:27017/btstream', function(err, db) {
    if(err) {console.log(err);}     
    
    // create mongodb collection
    var collection = db.collection('tsentstrm');
	  	
    // outside loop into stream
    twit.stream('statuses/filter',  { track: arrayOfTopics }, function(stream) {
            // console.log(arrayOfTopics);
            stream.on('data', function (data) {
                // look for your topic, write that tweet to mongodb
                arrayOfTopics.forEach(function (arrayOfTopics) {
                        var myRegExp = new RegExp(arrayOfTopics)
                        if (data.text.match(myRegExp)) {

                        // insert mongodb record
                        // insert tweet -- mongo collection
                        collection.insert({'dt': moment().format('YYYY-MM-DD HH:MM:SS'), // GEO?
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
            });
    });
});
//
//
