/*
 * fdserver
 * https://github.com/xiaoyue3/gruntplugin
 *
 * Copyright (c) 2014 xiaoyue
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var Path = require('path');
var rootpath = process.cwd();
var utils = require('js-combine-pack');
var tool = utils.tool;
var toolOptions = tool.config;

var findFiles = tool.findFiles;
var byline = tool.lineStream;
var dStream = tool.depsStream;

var md5Cache = tool.md5Cache;

function isJs(path) {
	return Path.extname(path) === '.js';
}

function isDirPath(path) {
	return Path.lastIndexOf('/') === path.length - 1;
}

module.exports = function(grunt) {
	grunt.registerMultiTask('fdserver', 'a simple, efficient, convenient RIA development environment', function() {
	    var done = this.async();

	    var options = this.options({
		   	// baseUrl : 'test/',
	     //    projectName : 'blog7',
	     //    reset : true,
	     //    minify: true
	    });

	    if (options.baseUrl) {
			toolOptions.baseUrl = Path.resolve(rootpath, options.baseUrl);
		}
		if (options.projectName) {
			toolOptions.projectName = options.projectName;
		}

	    this.files.forEach(function(f) {
	      	var confList, jsListCon, jsList;
	      	//打包后的地址传给配置文件
	      	toolOptions.publishUrl = f.dest;

		    f.src.filter(function(path) {
		        if (grunt.file.exists(path)) {
					return true;
				} else {
					return false;
				}
		    }).forEach(function(path) {
		    	if(grunt.file.isDir(path)){
		    		toolOptions.srcUrl = Path.resolve(rootpath,path);
		    		if (options.projectName) {
		    			path = Path.resolve(path,options.projectName);
		    		}
		    		jsList = findFiles.allFilesList(path);
		    		jsListCon = findFiles.allFilesCon(jsList, path);
		    		confList = findFiles.confList(jsList);
					var loadDeps = function(config,confList,jsMap,jsDepsMap){
						if(confList && confList.length){
							var confFile = confList.shift();
							var lineStream = new byline();
							var depsStream  = new dStream(done);
							var confStream = fs.createReadStream(Path.join(config.baseUrl,confFile));
							confStream.pipe(lineStream);
							lineStream.pipe(depsStream);
							depsStream.pipe(lineStream,config,confFile,jsMap,confList,jsDepsMap,loadDeps);
						}
					};	
					//此处查找依赖还需要在拆分，或者在不拆分的基础上，传入参数，将合并后的文件写入到f.dest地址
					var changedFile = md5Cache(toolOptions,jsListCon);
					if(changedFile){
						console.log('111');
						var jsDepsMap = {};
						confList.forEach(function(value,key){	
							confList[key] = value;
						});
						loadDeps(toolOptions,confList,jsListCon,jsDepsMap);
					}
		    		
		    	}
		    });
		        
			// Write the destination file.
			// grunt.file.write(f.dest + "index.js","11");

			// Print a success message.
			// grunt.log.writeln('File "' + f.dest + '" created.');
	    });
	});
};










	    // function combine(filepath){
		    // 	//读取文件
		    // 	src = grunt.file.read(filepath);
		    // 	grunt.log.writeln(src);
		    // 	//去掉块注释
		    // 	src = comment.stripBanner(src);
		    	
		    // 	//解析每个import引进来的数据
		    // 	return src.replace(reg,function(){
		    // 		//文件import 引入文件的路径 
	     //    		var key = arguments[2];
	     //    		if(key){
	     //    			//获取当前文件所在路径
			   //  		var con = grunt.file.read(path.resolve("test/conf/" + key));
			   //  		//在此解析导入进来的文件里面引入的import
			   //  		if(reg.test(con)){
			   //  			// grunt.log.writeln("111111111111");
			   //  			return combine(path.resolve("test/conf/" + key));
			   //  		}else{
			   //  			// grunt.log.writeln(con);
			   //  			return con;
			   //  		}	
			   //  	}	
	     //    	});
		    // }