trigger CategoryTrigger on Product2 (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('Beverages', 50);
 oppMap.put('Chips', 51);
 oppMap.put('Detergent', 52);
 oppMap.put('Frozen', 53);
 oppMap.put('Hygiene', 54);
 oppMap.put('Snacks', 55);

 for(Product2 prod: trigger.new ) {
    if(prod.cgcloud__Category__c != null) {
       prod.CategoryId__c=  oppMap.get(prod.cgcloud__Category__c);
     }
  }
}