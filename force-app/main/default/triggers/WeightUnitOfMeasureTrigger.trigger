trigger WeightUnitOfMeasureTrigger on Product2 (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('kilograms', 1);
 oppMap.put('grams', 2);
 oppMap.put('milligrams', 3);
 oppMap.put('ounces', 4);
 oppMap.put('pounds', 5);

 for(Product2 prod: trigger.new ) {
    if(prod.WeightUnitOfMeasure__c != null) {
       prod.WeightUnitOfMeasureId__c=  oppMap.get(prod.WeightUnitOfMeasure__c);
     }
  }
 }