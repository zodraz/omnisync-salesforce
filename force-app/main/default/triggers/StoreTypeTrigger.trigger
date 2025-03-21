trigger StoreTypeTrigger on RetailStore (before insert,before Update) {
map<string,integer> oppMap = new  map<string,integer>();
 oppMap.put('Regular Store',1);
 oppMap.put('Flagship Store',5);
 oppMap.put('Virtual Store ',6);
 oppMap.put('Van Store',7);
 oppMap.put('Catalog',2);
 oppMap.put('Online',3);
 oppMap.put('Reseller',4);


 for(RetailStore store: trigger.new ) {
    if(store.StoreType != null) {
       store.StoreTypeID__c =  oppMap.get(store.StoreType);
     }
  }
}