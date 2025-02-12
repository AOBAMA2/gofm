const $=selector=>document.querySelector(selector);
const $$=selector=>document.querySelectorAll(selector);
function $View(elements,e_display="inherit"){
	if (!elements || elements.length === 0) return false;//FILTRO
    if(elements instanceof NodeList){
        elements.forEach(element=>{
            switch(e_display){
                case "inherit":
                    element.style.display=(element.style.display==="none") ? "inherit" : "none";
                    break;
                default:
                    element.style.display=e_display;
                    break;
            }
        });
        return true;
    }else{
        switch(e_display){
            case "inherit":
                elements.style.display=(elements.style.display==="none") ? "inherit" : "none";
                break;
			default:
				elements.style.display=e_display;
                break;
        }
        return true;
    }
}
function $By(elements,action,attribute,value=true){//solo usar $$("selector") para elements
	if (!elements || elements.length === 0) return false;//FILTRO
	switch(action){
		case "set":{elements.forEach(element=>element.setAttribute(attribute,value));break;}
		case "rem":{elements.forEach(element=>element.removeAttribute(attribute));break;}
	}
	return true;
}
function restime(str1,str2)
{
	const fechaIni=new Date(str1).getTime();
	const fechaFin=new Date(str2).getTime();

	const diff=fechaFin-fechaIni;

	return diff/(1000*60*60*24);//sin "*24"->muestra en horas
}
/*----PARA LEER VARIABLES DE NAVEGADOR----*/
//setCookieValue("namec",value,caducidad_en_dias);
function setCookieValue(cname,cvalue,days)
{
	const  today=new Date();
	today.setTime(today.getTime()+(days*24*60*60*1000));
	const  expires="expires="+today.toGMTString();
	document.cookie=cname+"="+cvalue+";"+expires+";path=/";
}
//let valuecookie=getCookieValue("namec");return value
function getCookieValue(cname)
{
	const name=cname+"=";
	const decodedCookie=decodeURIComponent(document.cookie);
	const cookieList=decodedCookie.split(';');
	for(let i=0;i<cookieList.length;i++)
	{
		let varCookie=cookieList[i];
		while(varCookie.charAt(0)==' ')
		{
			varCookie=varCookie.substring(1);
		}
		if(varCookie.indexOf(name)==0)
		{
			return varCookie.substring(name.length,varCookie.length);
		}
	}
  return "";
}
/*----PARA LEER VARIABLES DE NAVEGADOR----*/
function x_html(str)//			UTILIZADO PARA PONER EL VALOR DE LOS CARACTERES REALES EN UNA ESTRUCTURA HTML; QUE ESTE STRING "<>" PASE A ESTO &lt;&gt; PARA QUE SE VEA ASI <> EN UN HTML Y NO SEA TRATADA COMO ETIQUETA
{
	return str.replace(/&/gi,"&amp;").replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/"/gi,"&#34;").replace(/'/gi,"&#39;").split("\n").join(" <br/>");
}
function html_x(str)//			UTILIZADO PARA PASAR UN ESTRUCTURA DE SIMBOLOS HTML A STRING; QUE ESTO &lt;&gt; SE VEA ASI <> EN UN INPUT
{
	return str.split(" <br/>").join("").replace(/&#39;/gi,"'").replace(/&#34;/gi,"\"").replace(/&gt;/gi,">").replace(/&lt;/gi,"<").replace(/&amp;/gi,"&");
}
function vincular(str)
{
	let html="";
    for(let i=0;i<str.length;i++)
    {
    	if(str.substring(i,i+7)=="http://" || str.substring(i,i+8)=="https://")
        {
        	let res=str.substring(i,str.length).split(" ",1);
            html+="<a target='_blanck' href='"+res[0]+"'>"+res[0]+"</a> ";
            i=i+res[0].length;
        }
        else
        {
        	html+=str.substring(i,i+1);
        }
    }
	return html;
}
function utf8_b64(str)
{
	return btoa(unescape(encodeURIComponent(str)));
}
function b64_utf8(b64)
{
	return decodeURIComponent(escape(window.atob(b64)));
}
function bytes_to_text(bytes){
	let str=" bytes";
	if(bytes>1024){bytes=parseFloat(bytes/1024).toFixed(1);str=" Kb";}
	if(bytes>1024){bytes=parseFloat(bytes/1024).toFixed(1);str=" Mb";}
	if(bytes>1024){bytes=parseFloat(bytes/1024).toFixed(1);str=" Gb";}
	return ""+bytes+str;
}
function API(){
	//llamadas al servidor
}