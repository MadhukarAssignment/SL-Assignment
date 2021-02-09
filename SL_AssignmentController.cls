public class SL_AssignementController {
    @AuraEnabled
    public static List<Account> getAccountData() {
        return [Select Id,Name,OwnerId,Owner.Name,Phone, Website, AnnualRevenue 
                FROM Account
                WHERE Industry = 'Financial Services'];
    }
    
    @AuraEnabled    
    public static boolean updateAccts( List <Account> updatedAccountList ) {    
        
        try {  
            system.debug('updatedAccountList::'+updatedAccountList);
            update updatedAccountList;  
            return true;  
            
        } catch(Exception e) {  
            return false;  
            
        }  
        
    }    
}