function SqlLite(shortName,version,displayName,maxSize){
	this.localDB=null;
	this.shortName = shortName;
    this.version = version;
    this.displayName = displayName;
    this.maxSize = maxSize; // Em bytes
    this.updateStatus=null;
	this.start=function(){
		try {
		    if (!window.openDatabase) {
		        this.updateStatus("Erro: Seu navegador não permite banco de dados.");
		    }
		    else {
		        this.localDB = window.openDatabase(this.shortName, this.version, this.displayName, this.maxSize);
		   	}
		} 
		catch (e) {
		    if (e == 2) {
		        this.updateStatus("Erro: Versão de banco de dados inválida.");
		    }
		    else {
		        this.updateStatus("Erro: Erro desconhecido: " + e + ".");
		    }
		    return;
		}
	};

	this.errorHandler = function(transaction, error){
    	//this.updateStatus("Erro: " + error.message);
    	console.log("Erro: " + error.message);
    	return true;
	}

    this.nullDataHandler = function(transaction, results){
    }

    this.updateStatus=function(status){
        //document.getElementById('status').innerHTML = status;
        console.log(status);
    }

	
	
}