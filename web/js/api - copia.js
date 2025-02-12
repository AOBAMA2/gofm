/*-BY("ID")							PARA OBTENER ELEMENTO POR ID-*/
/*-BY("CLASE","c")					PARA OBTENER ELEMENTOS[] POR CLASE-*/
/*-BY("TAG","t")					PARA OBTENER ELEMENTOS[] POR TAG-*/
/*-BY("NAME","n")					PARA OBTENER ELEMENTOS[] POR NAME DE FORMULARIO-*/
/*-BY("CLASE",X)					PARA OBTENER ELEMENTO[X] POR CLASE-*/
/*-BY("CLASE",X,"a","class")		PARA QUITAR EL ATRIBUTO DE NOMBRE class DEL ELEMENTO[X] DE LA CLASE LLAMADA CLASE-*/
/*-BY("CLASE",X,"r")				PARA QUITAR EL ELEMENTO[X] POR CLASE-*/
const $=selector=>document.querySelector(selector);
const $$=selector=>document.querySelectorAll(selector);
function $View(e,dp="inherit"){
    if(e instanceof NodeList){
        e.forEach(element=>{
            switch(dp){
                case "inherit":
                    element.style.display=(element.style.display==="none") ? "inherit" : "none";
                    break;
                default:
                    element.style.display=dp;
                    break;
            }
        });
        return true;
    }else if(e){
        switch(dp){
            case "inherit":
                e.style.display=(e.style.display === "none") ? "inherit" : "none";
                break;
			default:
				e.style.display=dp;
                break;
        }
        return true;
    }else{
        return false;
    }
}
function By(i,p,a,v)
{
	let r;
	switch(true)
	{
		case (p==null):{r=document.getElementById(i);break;}
		case (p=="c"):{r=document.getElementsByClassName(i);break;}
		case (p=="t"):{r=document.getElementsByTagName(i);break;}
		case (p=="n"):{r=document.getElementsByName(i);break;}
		case (p>=0):{r=document.getElementsByClassName(i)[p];break;}
		default:{r=document.getElementById(i);break;}
	}
	if(a==null){return r;}
	if(a=="a"){
		if(r.length>0)
        {
        	for(let etc=0;etc<r.length;etc++)
            {
				r[etc].removeAttribute(v);
            }
        }
        else
        {
        	r.removeAttribute(v);
		}
		return true;
	}
	if(a=="r"){return r.parentNode.removeChild(r);}
	else
	{
		if(v==null){return r.getAttribute(a);}//////OBTENER VALOR DEL ATRIBUTO DE NOMBRE A
		else
		{
			if(p==null || p>=0){r.setAttribute(a,v);}/////ASIGNAR VALOR V AL ATRIBUTO A
			else
			{
				for(let c=0;c<r.length;c++)
				{
					r[c].setAttribute(a,v);//////////////ASIGNAR A TODOS LOS ELEMENTOS EL VALOR V AL ATRIBUTO A
				}
			}
		}
	}
}
//View(ID/$I) ahora return: true=>inherit;false=>none
function View(i,p)
{
	if(p==null || p>=0)
	{
		if(By(i,p).style.display=="none")
		{
			By(i,p).style.display="inherit";
			return true;
		}
		else
		{
			By(i,p).style.display="none";
			return false;
		}
	}
	if(p=="c" || p=="t")
	{
		let e=By(i,p);
		for(let c=0;c<e.length;c++)
		{
			if(e[c].style.display=="none")
			{
				e[c].style.display="inherit";
			}
			else
			{
				e[c].style.display="none";
			}
		}
	}
}
function restime(str1,str2)
{
	let fechaIni=new Date(str1).getTime();
	let fechaFin=new Date(str2).getTime();

	let diff=fechaFin-fechaIni;

	return diff/(1000*60*60*24);//sin "*24"->muestra en horas
}
/*----PARA LEER VARIABLES DE NAVEGADOR----*/
//setC("namec",value,caducidad_en_dias);
function setC(cname,cvalue,days)
{
	let d=new Date();
	d.setTime(d.getTime()+(days*24*60*60*1000));
	let expires="expires="+d.toGMTString();
	document.cookie=cname+"="+cvalue+";"+expires+";path=/";
}
//let valuecookie=getC("namec");return value
function getC(cname)
{
	let name=cname+"=";
	let decodedCookie=decodeURIComponent(document.cookie);
	let ca=decodedCookie.split(';');
	for(let i=0;i<ca.length;i++)
	{
		let c=ca[i];
		while(c.charAt(0)==' ')
		{
			c=c.substring(1);
		}
		if(c.indexOf(name)==0)
		{
			return c.substring(name.length,c.length);
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