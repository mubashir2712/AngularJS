app.factory('customService',function(){
    return {
       resolve : function(input){
            if(!input){
                return input
            }
            var output = input[0]
            for(let i=1;i<input.length;i++){
               if(input[i] == input[i].toUpperCase()){
                   output = output + " "
               }
               output = output + input[i]
            }
            return output
       }
    }
})