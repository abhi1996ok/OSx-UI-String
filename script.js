var baseArr = [];
var finalObj;
var imgObj;

var arr = [
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/1.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/2.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/3.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/4.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/5.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/TAG.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/thumb$1.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/thumb$2.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/thumb$3.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/thumb$4.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/thumb$5.JPG",
    "https://wowfluxstorage.blog.core.windows.net/05t5zxa2/RN INTERNATIONAL$20181201171934/DL-301118-IC1-RNINTER_AMAZON 3000X3000/DL-301118-IC1-RNINTER-001/thumb$TAG.JPG",
];


/* This is a  URL strings manipulation function...(Crawl)
   which returns the array of the objects
   object- has nested object in children property
   which also has the children and so on..
   Each object has same structure
 */

var crawl = function(dir, index) {
    var prev = "hello";

    for (var j = 0; j < dir.length; j++) {
        var regExpr = /[$]/g;
        var piece = dir[j].split("/");
        var newPiece = piece[index].replace(" ", "").replace(regExpr, "");
        if (piece[piece.length - 1].search("thumb") == -1) {
            if (baseArr.length == 0) {
                if (prev.search(newPiece) == -1) {
                    var obj = createObj(piece[index], dir[j], piece);
                    prev = piece[index];
                    childCreator(obj, dir[j], piece, index + 1);
                    baseArr.push(obj);
                } else {
                    for (var i = 0; i < baseArr.length; i++) {
                        var newBase = baseArr[i].parent.replace(" ", "").replace(regExpr, "");
                        if (newBase.search(newPiece) > -1) {
                            existChildCreator(baseArr[i], dir[j], piece, index + 1);
                        }
                    }
                }
            } else {
                var flagg = 0;
                for (var v = 0; v < baseArr.length; v++) {
                    var newBase = baseArr[v].parent.replace(" ", "").replace(regExpr, "");
                    if (newBase.search(newPiece) == -1) {
                        if ((v == (baseArr.length) - 1)) {
                            flagg = 1;
                            break;
                        }

                    } else if (newBase.search(newPiece) > -1) {
                        flagg = 2;
                        break;
                    }
                }

                if (flagg == 1) {
                    var obj = createObj(piece[index], dir[j], piece);
                    prev = piece[index];
                    var thelastObj = childCreator(obj, dir[j], piece, index + 1);
                    baseArr.push(obj);
                } else if (flagg == 2) {
                    existChildCreator(baseArr[v], dir[j], piece, index + 1);
                }
            }

        }

    }
    return baseArr;
}




/* The Create Object function creates object from the 
   parts of the string which is divided by the "/" in the 
   string 
*/



function createObj(data, data2, piece) {
    var orLink = [];
    var temp;
    var temp1 = piece.slice();
    if (piece[piece.length - 1].search("thumb") == -1) {
        temp1[piece.length - 1] = "thumb$" + piece[piece.length - 1];
        for (var jo = 0; jo < temp1.length; jo++) {
            if (jo == 0) {
                orLink.push(temp1[jo]);
            } else {
                orLink.push("/" + temp1[jo]);
            }

        }

        temp = orLink.join("");
    }

    var person = new Object();
    person.parent = data;
    person.uri = data2;
    person.uriOrg = temp;
    person.children = [];
    return person;
}

/* The Child-Creator function 
   insert's the object into the new parent 
   object*/

function childCreator(obj, uridata, piece, index) {
    var regE = /[$]/g;
    if (index != piece.length) {
        if (obj.children.length == 0) {
            var objChild = createObj(piece[index], uridata, piece);
            obj.children.push(objChild);
            childCreator(objChild, uridata, piece, index + 1);
        } else {
            for (var i = 0; i < obj.children.length; i++) {
                var newPiece = piece[index].replace(" ", "").replace(regE, "");
                var newBaseChild = obj.children[i].parent.replace(" ", "").replace(regE, "");
                if (newBaseChild.search(newPiece) == -1) {
                    //console.log(obj.children[i].parent);
                    var objChild = createObj(piece[index], uridata, piece);
                    obj.children.push(objChild);
                    childCreator(objChild, uridata, piece, index + 1);
                }
            }
        }

    } else {
        return obj;
    }
}

/* The ExistChild-Creator function 
   insert's the object into the existing parent 
   object
*/


function existChildCreator(obj, uriData, piece, index) {
    var regE = /[$]/g;

    if (index != piece.length) {
        if (obj.children.length == 0) {
            var objChild = createObj(piece[index], uriData, piece);
            obj.children.push(objChild);
            childCreator(objChild, uriData, piece, index + 1);
        } else {
            var flag = 0;
            for (var i = 0; i < obj.children.length; i++) {
                var newPiece = piece[index].replace(" ", "").replace(regE, "");
                var newBaseChild = obj.children[i].parent.replace(" ", "").replace(regE, "");
                if (newBaseChild.search(newPiece) > -1) {
                    flag = 1;
                    break;

                } else if (newBaseChild.search(newPiece) == -1 && (i == (obj.children.length) - 1)) {
                    flag = 2;
                    break;

                }
            }
            if (flag == 1) {
                existChildCreator(obj.children[i], uriData, piece, index + 1);
            } else {
                var objChild = createObj(piece[index], uriData, piece);
                obj.children.push(objChild);
                childCreator(objChild, uriData, piece, index + 1);
            }
        }

    } else {
        return obj;
    }
}

/* ImgFun function is for the image modal
   which shows the original image(because in the
   right section there is thumbnail image.). 
*/


function imgFun(modal, modalImg) {
    //alert(finalObj.uriOrg);
    //var imgUri = "'" + "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/12/31/10/lion-face.jpg" + "'";
    modal.style.display = "block";
    modalImg.src = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/12/31/10/lion-face.jpg";

}

/*CloseBigImg Used for the closing the 
  Modal Section.
*/

function closeBigImg() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

/* ImgZoom function is used 
   for scaling the size of the 
   image on Click.
*/

function imgZoom(modalImg) {
    modalImg.classList.toggle("out");
}



document.addEventListener('contextmenu', event => event.preventDefault());

/* Adder function is used for making the 
   left most section which contain the list of
   the items
*/

window.onload = function adder() {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var span = document.getElementById("band");
    span.addEventListener("click", closeBigImg.bind(null));
    modal.addEventListener("click", imgZoom.bind(null, modalImg));
    imgObj = document.getElementById("imge");
    imgObj.src = "gallery.png";
    imgObj.addEventListener("click", imgFun.bind(null, modal, modalImg));

    var data = crawl(arr, 4);
    var outerDiv = document.getElementById("division");
    var addMainUl = document.createElement("ul");
    var addMain2 = document.createElement("ul");
    addMain2.setAttribute("id", "mainCallUl");
    addMain2.setAttribute("style", "border: 0px; margin: 0px; list-style:none; width:0;height:auto;");
    addMainUl.setAttribute("style", "border: 2px solid #ededed;background-color: #F6F6F6; border-top: 0; overflow: auto; border-bottom: 0; border-left: 0; height: 80vh; width: 280px; list-style-type: none; padding-left: 0")
    outerDiv.appendChild(addMainUl);
    outerDiv.appendChild(addMain2);

    for (var i = 0; i < data.length; i++) {
        var addLi = document.createElement("li");
        addLi.setAttribute("style", "text-align:left; background-color: #fff;  padding : 1em 0 1em 0.5em; background-size: 2em 2em; width: 100%; background-color: #f6f6f6; border: 1px solid #ededed; border-top: 0; border-right: 0; border-left: 0; font-size: 0.9em; color: #191211; font-family: Arial, Helvetica, sans-serif; cursor: pointer;");
        addLi.setAttribute("id", "Id" + data[i].parent);
        addLi.setAttribute("class", "liHoverEffect")
        addLi.appendChild(document.createTextNode(data[i].parent));
        addLi.addEventListener("click", adder2.bind(null, data[i], addMain2, addMainUl));
        addMainUl.appendChild(addLi);
    }

}


/*onClick of the item of the left most
  section's item the Adder2 function is 
  called.
  Which makes the new section of list
*/

function adder2(dataAdd2, sec, secMain) {
    //imgObj = document.getElementById("imge");
    imgObj.src = "gallery.png";
    var outerDiv = document.getElementById("division");
    var right = document.getElementById("rightMainDiv");
    //right.innerHTML="";
    var flag = true;
    while (flag) {
        //alert("hello");
        if (secMain.nextSibling != outerDiv.lastChild) {
            outerDiv.removeChild(secMain.nextSibling);
        } else if (secMain.nextSibling == outerDiv.lastChild) {
            outerDiv.removeChild(secMain.nextSibling);
            flag = false;
        }
    }

    sec.innerHTML = "";
    if (dataAdd2.children.length === 0) {
        finalObj = dataAdd2;

        right.setAttribute("style", "background-color:powderblue");
        right.innerHTML = dataAdd2.uriOrg;
    } else {
        var addMainUl = document.createElement("ul");
        addMainUl.setAttribute("id", "callSecond");
        sec.setAttribute("style", "border: 2px solid #ededed; border-top: 0; border-bottom: 0; border-left: 0; height: 80vh; width: 280px; list-style-type: none; padding-left: 0");
        outerDiv.appendChild(sec);
        //outerDiv.appendChild(addMainUl);

        for (var i = 0; i < dataAdd2.children.length; i++) {

            var addLi = document.createElement("li");
            // addLi.setAttribute("maxlength", "20");
            addLi.setAttribute("style", "text-align:left; width: 100%; border: 2px solid #ededed; border-top: 0; border-right: 0; border-left: 0; font-size: 0.9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding : 4% 0 4% 3%; cursor: pointer;");
            addLi.setAttribute("id", "Id" + dataAdd2.children[i].parent);
            addLi.setAttribute("class", "liHoverEffect");
            addLi.appendChild(document.createTextNode(dataAdd2.children[i].parent));
            addLi.addEventListener("click", adder3.bind(null, dataAdd2.children[i], addMainUl, sec));
            sec.appendChild(addLi);
        }
    }

}

/*onClick of the item of 2nd section besides the left most
  section's item the Adder3 function is 
  called.
  Which makes the new section of list
*/




function adder3(data2, sec, secMain) {
    //imgObj = document.getElementById("imge");
    imgObj.src = "gallery.png";
    var outerDiv = document.getElementById("division");
    var right = document.getElementById("rightMainDiv");
    //right.innerHTML="";
    var flag = true;
    if (secMain != outerDiv.lastChild) {
        while (secMain != outerDiv.lastChild) {
            outerDiv.removeChild(outerDiv.lastChild);
        }
    }
    sec.innerHTML = "";
    if (data2.children.length === 0) {

        finalObj = data2;
        document.getElementById("imge").src = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/12/31/10/lion-face.jpg";
    } else {
        var addMainUl = document.createElement("ul");
        sec.setAttribute("style", "border: 2px solid #ededed; border-top: 0; overflow: auto; border-bottom: 0; border-left: 0; height: 80vh; width: 280px; list-style-type: none; padding-left: 0");
        outerDiv.appendChild(sec);

        //outerDiv.appendChild(addMainUl);


        for (var i = 0; i < data2.children.length; i++) {
            var addLi = document.createElement("li");
            addLi.setAttribute("style", "text-align:left; width: 100%; border: 2px solid #ededed; border-top: 0; border-right: 0; border-left: 0; font-size: 0.9em; padding : 4% 0 4% 3%; cursor: pointer;");
            addLi.setAttribute("id", "Id" + data2.children[i].parent);
            addLi.setAttribute("class", "liHoverEffect");
            addLi.appendChild(document.createTextNode(data2.children[i].parent));
            addLi.addEventListener("click", adder3.bind(null, data2.children[i], addMainUl, sec));
            sec.appendChild(addLi);
        }
    }
}