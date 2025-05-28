trigger FamilyTrigger on Product2 (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('Audio', 50);
 oppMap.put('TV and Video', 51);
 oppMap.put('Computers', 52);
 oppMap.put('Cameras and camcorders', 53);
 oppMap.put('Cell phones', 54);
 oppMap.put('Music, Movies and Audio Books', 55);
 oppMap.put('Games and Toys', 56);
 oppMap.put('Home Appliances', 57);
 

 for(Product2 prod: trigger.new ) {
    if(prod.Family != null) {
       prod.FamilyId__c=  oppMap.get(prod.Family);
     }
  }
}