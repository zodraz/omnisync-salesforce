trigger StoreTypeTrigger on RetailStore__c (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('Store',1);
 oppMap.put('Catalog',2);
 oppMap.put('Online',3);
 oppMap.put('Reseller',4);


 for(RetailStore__c store: trigger.new ) {
    if(store.StoreType__c != null) {
       store.StoreTypeId__c =  oppMap.get(store.StoreType__c);
     }
  }
}