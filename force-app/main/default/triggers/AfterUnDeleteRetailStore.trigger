trigger AfterUnDeleteRetailStore on RetailStore (after undelete) 
{
    List<RetailStoreUnDeletedEvent__c> co = new List<RetailStoreUnDeletedEvent__c >();
    for(RetailStore o : Trigger.new)
    {
        RetailStoreUnDeletedEvent__c c = new RetailStoreUnDeletedEvent__c();
        c.Name = o.Name;
        c.DeletedId__c = o.Id;
        c.StoreCode__c = o.StoreCode__c;

        co.add(c);
    }

    insert co;
}