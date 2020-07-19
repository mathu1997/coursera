
class ratingClass{
    constructor(id,raterId,feedback){
        this.id = id; 
        this.raterId = raterId;
        this.feedback = feedback;
    }
    display(){
        console.log(this.raterId);
    }
}


class profile{
    constructor(id,name,address,location,phno,type){
        this.id = id;
        this.name = name;
        this.address = address;
        this.location = location;
        this.phno = phno;
        this.type = type;
    }
    rating(raterId,feedback="") {
        rate = new ratingClass(this.id,raterId,feedback);
        rate.display();
    }
    
    display(){
        console.log(this.id,this.name,this.location);
    }
}

class farmer{
    constructor(id,name,address,location,phno,type){
        this.id = new profile(id,name,address,location,phno,type);
        this.prodID = [];
        inc = 0;
    }
    createProd(id,name,type,spec,value){
        this.prodID.append(new product(id,name,type,spec,value));
        inc++;
    }
    

}

class product{
    constructor(id,name,type,spec,value){
        this.id = id;
        this.name = name;
        this.type = type;
        this.spec = spec;
        this.basevalue = value;
        this.maxbid = value;
        this.bidder = '';
    }

    bitProd(id,value){
        
    }

}
// farmer

farmer1 = new farmer(1,"mathu","namakkal","namakkal","4575889","Farmer");
farmer1.display();

// retailer
retailer1 = new retailer(4,"mithran","chennai","chennai","4579889","Retailer");
retailer1.display();
retailer1.rating(1,"Good quantity");


farmer1.createProd('p1','mango','fruit','10','100');

