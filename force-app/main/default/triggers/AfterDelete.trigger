trigger AfterDelete on RetailStore (after delete) 
{
    List<RetailStoreDeletedEvent__c > co = new List<RetailStoreDeletedEvent__c >();
    for(RetailStore o : Trigger.old)
    {
        RetailStoreDeletedEvent__c c = new RetailStoreDeletedEvent__c();
        c.Name = o.Name;
        c.DeletedId__c = o.Id;

        co.add(c);
    }

    insert co;
}