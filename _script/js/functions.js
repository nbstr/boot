function defined_default(value, default_value){
    return (typeof value !== 'undefined') ? value : default_value
}
function array2str(input, separator){
    separator = defined_default(separator, ', ');
    if(input == undefined){return ''}
    else if(typeof(input) == typeof('string')){return input}
    else if(typeof(input) == typeof(1989)){return input.toString()}
    else if(typeof(input) == typeof(['array']) || typeof(input) == typeof({object:'object'})){
        var output = '';
        var counter = 0;
        for(var i in input){
            if(typeof(input[i]) == typeof('string')){
                output += input[i];
                if(counter < (input.length - 1)){
                    output += separator;
                }
            }
            else if(typeof(input) == typeof(['array']) || typeof(input) == typeof({object:'object'})){
                output += array2str(input[i]);
                if(counter < (input.length - 1)){
                    output += separator;
                }
            }
            counter++;
        }
        return output
    }
    else{return input.toString()}
}
function clearFile(file,preview){
    if(!file)
        $("#file").val("");
    else
        file.val("");
    if(!preview){
        $(".preview").each(function(index){
            console.log($(this));
            $(this).hide();
        });
    }
    else
        preview.hide();
                           
}
//preview
function createPreview(file,preview){
    var reader = new FileReader();
    reader.onload = function() {
        if(!preview)
            preview=$(".preview");
        var res=this.result;
        preview.each(function(index){
            $(this).css('background-image','url('+res+')');  
            $(this).fadeIn(300);
        });            
    };     
    reader.readAsDataURL(file);
}
var allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];
function showPreview(files,preview){
    hasChanged=true;
    if(window.File && window.FileList && window.FileReader){
        if(files!=undefined){
            for(var i=0;i<files.length;i++){
                var file=files[i];
                console.log(file);
                var imgType = file.name.split('.');
                imgType = imgType[imgType.length - 1];
                imgType=imgType.toLowerCase();
                if(allowedTypes.indexOf(imgType) != -1) {
                    //max 10 Mo
                    if(file.size<=(5*2097152)){
                        createPreview(file,preview);
                    }
                    else{
                        externalHandleFileError(preview,"The file you tried to upload is too big, the maximum allowed size is 10 Mo.");
                    }
                }
                else{
                    externalHandleFileError(preview,"The format of the file you tried to upload is not supported.");
                }
            }
        }
    }
    else{
        externalHandleFileError(preview,"Preview and upload picture not yet supported for this browser, try to update your browser.");
    }
}
/*
External call of a controller functions called handleFileError
*/
function externalHandleFileError(elem,message){
    if(!elem)
        elem=$("#preview");
    var scope=angular.element(elem).scope();
    if(scope.handleFileError){
        scope.$apply(function(scope){
            scope.handleFileError.call(this,message);
        }); 
    }
    else
        alert(message);
}
function all_true(obj){
    for(element in obj){
        if(!obj[element]){
            return false
        }
    }
    return true
}
function return_number(str_var) {
    str_var = str_var.toString();
    var newstr_var = '';
    for(i=0;i<str_var.length;i++) {
        newstr_var += (isNaN(str_var.substr(i, 1)) || str_var[i] == ' ') ? '' : str_var.substr(i, 1);
    }
    return newstr_var
}
var dev = {
    log:function(e){
        if(config.debug){
            console.log(e);
        }
    },
    error:function(e){
        if(config.debug){
            console.error(e);
        }
    }
};
function formatDate(str)
{
    d=new Date(str);
    var month = d.getMonth();
    var day = d.getDate();
    month = month + 1;

    month = month + "";

    if (month.length == 1)
    {
        month = "0" + month;
    }

    day = day + "";

    if (day.length == 1)
    {
        day = "0" + day;
    }

    return d.getFullYear()+'-'+month + '-' + day;
}