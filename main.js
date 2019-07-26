(function(window){

    /*
      Code is not optimized for speed or practicality :\
     */
    var html2arr=x=>(Array.from(x)||Array.prototype.slice.call(x)),
    c=x=>document.getElementsByClassName(x),
    d=x=>document.getElementById(x),
    n=x=>document.getElementsByTagName(x),
    q=x=>document.querySelectorAll(x),
    isString=x=>typeof x == "string",
    isArray=x=>Array.isArray(x),
    isQS=x=>x.match(/[^\d\w]/) !== null;

    function _(s,o){
        return new Lazy(s,o);
    }

    class Lazy{
        constructor(e, onlyTagName = false){
            var r = [];
            if(isString(e)){
                if(isQS(e)){
                    r = html2arr(q(e));
                }
                else{
                    r = !onlyTagName ? r.concat(html2arr(c(e)), html2arr(n(e)),function(){return d(e)||[];}()) : html2arr(n(e));
                }
            }
            else{
                if(e instanceof Element)r=[e];
                else{r = html2arr(e);}
            }
            this.element = html2arr(new Set(r));
            this.length = this.element.length;
            return this;
        }
        each(fn, pure = false){
            for(let i = 0, n = this.length;i<n;i++){
                fn.call(this.element, (!pure ? _(this.element[i]):this.element[i]),i);
            }
        }
        addClass(...a){
            var a = [...a].join().replace(/ /g, ",").split(/,/g).filter(x=>x.length>0);
            this.each(e=>{e.classList.add(...a);},true);
            return this;
        }
        removeClass(...a){
            var a = [...a].join().replace(/ /g, ",").split(/,/g).filter(x=>x.length>0);
            this.each(e=>e.classList.remove(...a), true);
            return this;
        }
        map(fn, pure = false){
            var a = [];
            for(let i = 0, n = this.length;i<n;i++){
                a.push(fn.call(this.element, (!pure ? _(this.element[i]):this.element[i]),i));
            }
            return a;
        }
        text(s=""){
            if(!s){
                if(this.length == 1) return this.element[0].innerText;
                else return this.map(x=>x.innerText,true);
            }
            else{
                this.each(x=>x.innerText=s,true);
                return this;
            }
        }
        html(s=""){
            if(!s){
                if(this.length == 1) return this.element[0].innerHTML;
                else return this.map(x=>x.innerHTML,true);
            }
            else{
                this.each(x=>x.innerHTML=s,true);
                return this;
            }
        }
    }
    
    if(window._)return;
    else window._ = _;
})(window);
