      var jg = null; 
      var polypoints = [];
      var boxpoints = [];
      var drawingchoice = 1;
      var showtoolbool = false;
      var coordinates = [];
      var oldpolypointsX=null;
      var oldpolypointsy=null;
      var boxnum =0;
      var polynum = 0;
      const canv = document.getElementById("canvas");
      var jsonString='';
      var obj=[]; //= JSON.parse(jsonString);

      // var ctx = canv.getContext("2d");

      initDraw(canv);


      function drawFunction(ax,ay,bx,by){
          jg.setColor("#000000"); // blue
          jg.drawLine(ax,ay,bx,by);
          jg.paint();

      }

      function initDraw(canvas) {
        function setMousePosition(e) {
          var ev = e || window.event; //Moz || IE
          if (ev.pageX) {
            //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
          } else if (ev.clientX) {
            //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
          }
        }

        var mouse = {
          x: 0,
          y: 0,
          startX: 0,
          startY: 0
        };
        var element = null;

        canvas.onmousemove = function(e) {
          setMousePosition(e);
          if (element !== null) {
            element.style.width =
              Math.abs(mouse.x - mouse.startX - window.pageXOffset) + "px";
            element.style.height =
              Math.abs(mouse.y - mouse.startY - window.pageYOffset) + "px";
            element.style.left =
              mouse.x - mouse.startX - window.pageXOffset < 0
                ? mouse.x - window.pageXOffset + "px"
                : mouse.startX + "px";
            element.style.top =
              mouse.y - mouse.startY - window.pageYOffset < 0
                ? mouse.y - window.pageYOffset + "px"
                : mouse.startY + "px";
          }
        };


        canvas.ondblclick = function(e){
            drawFunction(polypoints[polypoints.length-1][0],polypoints[polypoints.length-1][1],polypoints[0][0],polypoints[0][1]);
            coordinates.pop();
            polypoints.pop();
            polynum++;

            var polyname = "poly "+polynum;

            obj.push({"item":polyname,"coordinates":polypoints});
            // obj.push({"\"poly \""+polynum.toString():polypoints});
             polypoints = [];

        };

        canvas.onclick = function(e) {

          var position = getPosition(e);

          if(document.getElementById("toolbox").style.display== "block"){
          document.getElementById("toolbox").style.display = "none";
           }
          if(drawingchoice==1){
          if (element !== null) {
            element = null;
            canvas.style.cursor = "default";
            boxpoints.push([position.x, position.y]);

            console.log("finsihed.");
            boxnum++;
            var boxname = "box "+boxnum;
          //  obj.push({"box \""+boxnum.toString(): boxpoints});
            obj.push({"item":boxname,"coordinates":boxpoints});

            boxpoints=[];

                      } else {

            coordinates.push(["box",boxnum]);
            boxpoints.push([position.x, position.y]);
            console.log("begun.");


            mouse.startX = mouse.x - window.pageXOffset;
            mouse.startY = mouse.y - window.pageYOffset;
            element = document.createElement("div");
            element.className = "rectangle";
            element.style.left = mouse.x - window.pageXOffset + "px";
            element.style.top = mouse.y - window.pageYOffset + "px";
            // element.style.left = Math.abs(mouse.x - mouse.startX-2*window.pageXOffset) + "px";
            // element.style.top =  Math.abs(mouse.y - mouse.startY-2*window.pageYOffset) + "px";
            canvas.appendChild(element);
            canvas.style.cursor = "crosshair";
          }

        }else{

                jg= new jsGraphics("canvas");

            // mouse.startX = mouse.x - window.pageXOffset;
            // mouse.startY = mouse.y - window.pageYOffset;
            var position = getPosition(e);
            mouse.startX = mouse.x - window.pageXOffset;
            mouse.startY = mouse.y - window.pageYOffset;


          if(polypoints.length==0){
              // ctx.beginPath();
              // ctx.moveTo(mouse.startX, mouse.startY);
              // polypoints.push([position.x,position.y]);
              coordinates.push(["poly",polynum]);

              polypoints.push([mouse.startX,mouse.startY]);

          }else{

            // ctx.lineTo(mouse.startX, mouse.startY);
            // ctx.stroke();

            // polypoints.push([position.x,position.y]);



              polypoints.push([mouse.startX,mouse.startY]);

            console.log(polypoints[0][1])
            // console.log(polypoints[polypoints.length-2][0],polypoints[polypoints.length-2][1],polypoints[polypoints.length-1][0],polypoints[polypoints.length-1][1]);

            drawFunction(polypoints[polypoints.length-2][0],polypoints[polypoints.length-2][1],polypoints[polypoints.length-1][0],polypoints[polypoints.length-1][1]);

          }


        }
        };
      }




      //choose file
      // document
      //   .getElementById("getval")
      //   .addEventListener("change", readURL, true);



        // 
      // function readURL(){
      //     var file = document.getElementById("getval").files[0];
      //     var reader = new FileReader();
      //     reader.onloadend = function(){
      //         document.getElementById('canvas').style.backgroundImage = "url(" + reader.result + ")";
      //     }
      //     if(file){
      //         reader.readAsDataURL(file);
      //     }else{
      //     }
      // }

      var imgheight;
      var imgwidth;
      var filename = "";

      // function readURL() {
      //   var file = document.getElementById("getval").files[0];
      //   var reader = new FileReader();
      //   reader.onloadend = function() {
      //     coordinates = [];
      //     var mypastdrawing = document.getElementById("canvas");
      //     while (mypastdrawing.firstChild) {
      //       mypastdrawing.removeChild(mypastdrawing.firstChild);
      //     }
      //     var img = new Image(); 
      //     img.onload = function() {
      //       document.getElementById("canvas").style.backgroundImage =
      //         "url(" + reader.result + ")";
      //       filename = "url(" + reader.result + ")";
      //     };

      //     img.src = reader.result;
      //     imgheight = img.height;
      //     imgwidth = img.width;
      //     document.getElementById("canvas").style.minHeight = imgheight + "px";
      //     document.getElementById("canvas").style.minWidth = imgwidth + "px";
      //   };
      //   if (file) {
      //     reader.readAsDataURL(file);
      //   } else {
      //   }
      // }

    var fileInput = document.getElementById('getval');
    var fileDisplayArea = document.getElementById('canvas');
    fileInput.addEventListener('change',readURL, true); 


    function readURL() {
      var file = fileInput.files[0];
      var imageType = /image.*/;

      if (file.type.match(imageType)) {
        var reader = new FileReader();

                  coordinates = [];
          var mypastdrawing = document.getElementById("canvas");
          while (mypastdrawing.firstChild) {
            mypastdrawing.removeChild(mypastdrawing.firstChild);
          }

        reader.onload = function(e) {
          fileDisplayArea.innerHTML = "";

          var img = new Image();
          img.src = reader.result;



          imgheight = img.height;
          imgwidth = img.width;

          if(imgheight==0 || imgwidth==0){
            readURL();
          }

          document.getElementById("canvas").style.minHeight = imgheight + "px";
          document.getElementById("canvas").style.minWidth = imgwidth + "px";
      //    document.getElementById("navmenu").style.width=imgwidth+"px";
          document.getElementById("instruction").style.display="none";

            fileDisplayArea.appendChild(img);

        }

        reader.readAsDataURL(file); 
      } else {
        fileDisplayArea.innerHTML = "File not supported!"
      }
    }

  


   






      //       function readURL() {
      //   var file = document.getElementById("getval").files[0];
      //   var reader = new FileReader();
      //   reader.onloadend = function() {
      //     coordinates = [];
      //     canv.style.minWidth=null;
      //     canv.style.minHeight =null;
      //     var mypastdrawing = document.getElementById("canvas");
      //     while (mypastdrawing.firstChild) {
      //       mypastdrawing.removeChild(mypastdrawing.firstChild);
      //     }
      //     var img = new Image(); 
      //     img.onload = function() {
      //       document.getElementById("canvas").style.backgroundImage =
      //         "url(" + reader.result + ")";
      //       filename = "url(" + reader.result + ")";
      //     };

      //     img.src = reader.result;
      //     imgheight = img.height;
      //     imgwidth = img.width;
      //     document.getElementById("canvas").style.minHeight = imgheight + "px";
      //     document.getElementById("canvas").style.minWidth = imgwidth + "px";
      //   };
      //   if (file) {
      //     reader.readAsDataURL(file);
      //   } else {
      //   }
      // }

  


      document
        .getElementById("canvas")
        .addEventListener("click", printPosition);

      // document.getElementById('relative-rect').addEventListener('click', printPosition)

      function getPosition(e) {
        var rect = document.getElementById("canvas").getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        return {
          x,
          y
        };
      }

      function printPosition(e) {
        var position = getPosition(e);
        document.getElementById("area").value =
          "X: " + position.x + " Y: " + position.y;
        coordinates.push([position.x, position.y]);
      }

      // const canv = document.getElementById("canvas");

      document.getElementById("undoBut").addEventListener("click", function() {
        const select = document.getElementById("canvas");

        select.removeChild(select.lastChild);
        if(drawingchoice==1){
        coordinates.pop();
        coordinates.pop();
      }else{

        coordinates.pop();
      }
      });

      document.getElementById("saveBut").addEventListener("click", function() {
        var node = document.getElementById("canvas");

        domtoimage
          .toPng(node)
          .then(function(dataUrl) {
            var img = new Image();
            img.src = dataUrl;

            var url = img.src.replace(
              /^data:image\/[^;]+/,
              "data:application/octet-stream"
            );
            //enable this if need to download image

            window.open(url);

            // window.open(url);
            // console.log(dataUrl);

            // document.getElementById('saveBut').href=dataUrl;
            // document.body.appendChild(img);
          })
          .catch(function(error) {
            console.error("oops, something went wrong!", error);
          });
      });


      //save json
       function downloadObjectAsJson(exportObj, exportName){
          var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
          var downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href",     dataStr);
          downloadAnchorNode.setAttribute("download", exportName + ".json");
          document.body.appendChild(downloadAnchorNode); // required for firefox
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
  }

      //save csv

      var csvContent = "";
      document
        .getElementById("savecsvBut")
        .addEventListener("click", function() {
          csvContent = coordinates.map(e => e.join(",")).join("\n");
    

          download(csvContent, "dowload.csv", "text/csv;encoding:utf-8");


        });

        document.getElementById("saveJsonBut").addEventListener('click',function(){

                        downloadObjectAsJson(obj,"coordinates");
                        console.log(jsonString);



        });

      coordinates.forEach(function(infoArray, index) {
        dataString = infoArray.join(";");
        csvContent +=
          index < coordinates.length ? dataString + "\n" : dataString;
      });

      // The download function takes a CSV string, the filename and mimeType as parameters
      // Scroll/look down at the bottom of this snippet to see how download is called
      var download = function(content, fileName, mimeType) {
        var a = document.createElement("a");
        mimeType = mimeType || "application/octet-stream";

        if (navigator.msSaveBlob) {
          // IE10
          navigator.msSaveBlob(
            new Blob([content], {
              type: mimeType
            }),
            fileName
          );
        } else if (URL && "download" in a) {
          //html5 A[download]
          a.href = URL.createObjectURL(
            new Blob([content], {
              type: mimeType
            })
          );
          a.setAttribute("download", fileName);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          location.href =
            "data:application/octet-stream," + encodeURIComponent(content); // only this mime type is supported
        }
      };

      document
        .getElementById("showtoolbox")
        .addEventListener("click", function() {
          if (showtoolbool) {
            document.getElementById("toolbox").style.display = "none";
          } else {
            document.getElementById("toolbox").style.display = "block";
          }

          showtoolbool = !showtoolbool;
        });


        //choose rect or poly
        function recdrawer(){
          drawingchoice = 1;
        }

        function polydrawer(){
          drawingchoice = 2;
        }

        document.getElementById('clearBut').addEventListener('click',function(){

            oldpolypointsy = null;
            oldpolypointsX = null;
        })


