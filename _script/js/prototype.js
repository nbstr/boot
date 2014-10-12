// PROTOTYPE

Array.prototype.sortKey = function (key) {
    this.sort(function(a, b){
        var keyA = parseInt(a[key]),
        	keyB = parseInt(b[key]);

        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;

        return 0;
    });
}