trigger AfterUnDelete on RetailStore (after undelete) 
{
    List<RetailStoreUnDeletedEvent__c> co = new List<RetailStoreUnDeletedEvent__c >();
    for(RetailStore o : Trigger.old)
    {
        RetailStoreUnDeletedEvent__c c = new RetailStoreUnDeletedEvent__c();
        c.Name = o.Name;
        c.DeletedId__c = o.Id;

        co.add(c);
    }

    insert co;
}