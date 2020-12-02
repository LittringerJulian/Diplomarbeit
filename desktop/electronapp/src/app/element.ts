
export class Element
 {
    
     identifier : string;
     specification : string;
     posx : number;
     posy : number;
     percentagex : number;
     percentagey : number;
     width : number;
     height:number;


    constructor(identifier:string,specification:string,posx:number,posy:number,percentagex : number,percentagey : number,width:number,height:number) {
        this.identifier = identifier;
        this.specification = specification;
        this.posx=posx;
        this.posy=posy;
        this.percentagex=percentagex;
        this.percentagey=percentagey;
        this.width=width;
        this.height=height;


      }
}
