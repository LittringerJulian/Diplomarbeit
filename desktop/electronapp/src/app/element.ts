export class Element
 {
    
     identifier : string;
     specification : string;
     posx : number;
     posy : number;
     percentagex : number;
     percentagey : number;


    constructor(identifier:string,specification:string,posx:number,posy:number,percentagex : number,percentagey : number) {
        this.identifier = identifier;
        this.specification = specification;
        this.posx=posx;
        this.posy=posy;
        this.percentagex=percentagex;
        this.percentagey=percentagey;

      }
}
