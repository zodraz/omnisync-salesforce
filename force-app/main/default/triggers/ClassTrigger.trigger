trigger ClassTrigger on Product2 (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('Economy', 1);
 oppMap.put('Regular', 2);
 oppMap.put('Deluxe', 3);

 for(Product2 prod: trigger.new ) {
    if(prod.Class__c != null) {
       prod.ClassId__c=  oppMap.get(prod.Class__c);
     }
  }
 }