$import("jobs/2.js");
$import("jobs/weibo/w1.js");
$import("jobs/1.js");
$import("jobs/weibo/w2.js");
function main(){
	job.add('w1',3);
	job.add('w2',3);
    job.start();
}