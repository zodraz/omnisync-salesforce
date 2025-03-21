trigger SizeUnitOfMeasureTrigger on Product2 (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('meters', 1);
 oppMap.put('centimeters', 2);
 oppMap.put('millimeters', 3);
 oppMap.put('feet', 4);
 oppMap.put('inches', 5);
 oppMap.put('yards', 6);

 for(Product2 prod: trigger.new ) {
    if(prod.SizeUnitOfMeasure__c != null) {
       prod.SizeUnitOfMeasureId__c=  oppMap.get(prod.SizeUnitOfMeasure__c);
     }
  }
 }