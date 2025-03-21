trigger ColorTrigger on Product2 (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('Azure', 1);
 oppMap.put('Black', 2);
 oppMap.put('Blue', 3);
 oppMap.put('Brown', 4);
 oppMap.put('Purple', 5);
 oppMap.put('Red', 6);
 oppMap.put('Silver', 7);
 oppMap.put('White', 8);
 oppMap.put('Orange', 9);
 oppMap.put('Pink', 10);
 oppMap.put('Grey', 11);
 oppMap.put('Silver Grey', 12);
 oppMap.put('Yellow', 13);
 oppMap.put('Green', 14);
 oppMap.put('Gold', 15);
 oppMap.put('Transparent', 16);

 for(Product2 prod: trigger.new ) {
    if(prod.Color__c != null) {
       prod.ColorId__c=  oppMap.get(prod.Color__c);
     }
  }
 }