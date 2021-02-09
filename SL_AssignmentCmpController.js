({

    init: function(component, event, helper) {
        helper.getAccountData(component, event, helper)
        helper.setColumns(component);
    },

    handleSort: function(component, event, helper) {
        helper.handleSort(component, event);
    },
    
    handleSaveEdition : function( component, event, helper ) {   
         var updatedRecords = component.find( "acctTable" ).get( "v.draftValues" ); 
         var data = component.get("v.accountData");
         for(var i in updatedRecords){
            var itemIndex = updatedRecords[i].id.substr(updatedRecords[i].id.length - 1, 1);
            updatedRecords[i].Id = data[itemIndex].Id;  
            delete updatedRecords[i].id;
         }
         console.log(updatedRecords);
         //var data = component.get("v.accountData");
         //updatedRecords.Id = component.get("v.accountData");
         //console.log(updatedRecords);
            var action = component.get( "c.updateAccts" );  
            action.setParams({  
                'updatedAccountList' : updatedRecords  
            });  
            action.setCallback( this, function( response ) {        
                var state = response.getState();   
                if ( state === "SUCCESS" ) {  
                    if ( response.getReturnValue() === true ) {  
                        console.log( 'success', 'Records Saved Successfully.' );  
                        component.find( "acctTable" ).set( "v.draftValues", null );  
                        window.location.reload()
                          
                    } else {   
                        console.log( 'error', 'Something went wrong. Contact your system administrator.' );       
                    }  
                      
                } else {  
                    console.log( 'error', 'Something went wrong. Contact your system administrator.' );                    
                }  
                  
            });  
            $A.enqueueAction(action);  
        },
    
    updateSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        if(fieldName == 'linkName'){
            fieldName = 'Name'
        }
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
});