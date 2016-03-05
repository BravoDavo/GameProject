/**
 * Created by admin on 17.11.2015.
 */
function setCookie(cname, cvalue, expHours){
    var d = new Date();
    d.setTime(d.getTime() + (expHours*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function delCookie(cname){
    var d = new Date();
    //now
    d.setTime(d.getTime());
    var expireNow = "expires="+d.toUTCString();
    document.cookie = cname + "= ; " + expireNow;
}


function getCookie(c_name){
    var cookie = document.cookie.split('; ');
    for(var i=0;i<cookie.length;i++){
        var splitcookie = cookie[i].split('=');
        if(splitcookie[0] == c_name){
            return splitcookie[1];
        }
    }
    return null;
}