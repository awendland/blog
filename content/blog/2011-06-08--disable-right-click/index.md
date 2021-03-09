---
title: Disable Right Click
date: 2011-06-08T22:31:49
layout: post
visibility: public
---

Here is some code I modified from DynamicDrive to disable right clicking on my school website:

```js
<script language=JavaScript>
<!--

//Disables the ability to right click this webpage
//By Alex Wendland modified from Maximus @ DynamicDrive
//For full source code, visit http://www.dynamicdrive.com/dynamicindex9/noright.htm
//To enable popup messages remove "//" from in front of "alert(message);"
//After enabling popups, change "var message" to = whatever you want the popup to say

var message="Function Disabled!";

///////////////////////////////////
function clickIE4(){
  if (event.button==2){
    //alert(message);
    return false;
  }
}

function clickNS4(e){
  if (document.layers||document.getElementById&&!document.all){
    if (e.which==2||e.which==3){
      //alert(message);
      return false;
    }
  }
}

if (document.layers){
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown=clickNS4;
}
else if (document.all&&!document.getElementById){
  document.onmousedown=clickIE4;
}

document.oncontextmenu=new //Function("alert(message);return false")
Function("return false")

// -->
</script>
```

To use this script you put it anywhere in the `<BODY>` of your webpage. It succesfully disables right clicking on the whole page!
