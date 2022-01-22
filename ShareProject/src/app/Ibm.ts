export class Ibm{
   public Difference:number;
   public Avg:number;
   constructor(public Date:string,public OpenPrice:number,public ClousePrice:number,
      public MaxPrice:number,   public MinPrice:number)
      {
this.Difference=this.ClousePrice-this.OpenPrice;
this.Difference= Math.round((this.Difference + Number.EPSILON) * 100) / 100;
this.Avg=(+MinPrice+ +MaxPrice)/2;

   }
  
}