var sqlLite=new SqlLite(shortName,version,displayName,maxSize);
sqlLite.start();

Restaurante=function(id,nome,email,telefone,logradouro, numero, bairro, cidade){
	this.id=id;
	this.nome=nome;
	this.email=email;
	this.telefone=telefone;
	this.logradouro=logradouro;
	this.numero=numero;
	this.bairro=bairro;
	this.cidade=cidade;


	this.createTable=function(){
	    var query = 'CREATE TABLE IF NOT EXISTS '
	    	+'restaurante'
	    	+'(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
	    	+'nome VARCHAR NOT NULL,'
	    	+'email VARCHAR NOT NULL,'
	    	+'teleone VARCHAR NOT NULL,'
	    	+'logradouro VARCHAR NOT NULL,' 
	    	+'numero INTEGER, '
	    	+'bairro VARCHAR NOT NULL,'
	    	+'cidade VARCHAR NOT NULL'
	    	+');';
	    try {
	    	
	        sqlLite.localDB.transaction(function(transaction){
	            transaction.executeSql(query,
	             [], 
	             sqlLite.nullDataHandler, 
	             sqlLite.errorHandler);

	            sqlLite.updateStatus("Tabela 'restaurante' status: OK.");
	        });
	    } 
	    catch (e) {
	        sqlLite.updateStatus("Erro: Tabela 'restaurante' não criada " + e + ".");
	        return;
	    }
	};


	this.insert=function(){
		if(this.id!=null)
			return false;
		this.createTable();
		
		var query = "insert into restaurante" 
		+"(nome, email, teleone, logradouro, numero, bairro, cidade)" 
		+"VALUES" 
		//+"(?, ?,?, ?, ?, ?, ?);";
		+"('"+this.nome+"', '"+this.email+"','"+this.telefone+"', '"+this.logradouro+"', '"+this.numero+"', '"+this.bairro+"', '"+this.cidade+"');";
		console.log(query);
		console.log(this.nome);
		try {
            sqlLite.localDB.transaction(function(transaction){
                transaction.executeSql(
                	query, 
                	/*[
                		this.nome,
                		this.email, 
                		this.telefone, 
                		this.logradouro,  
                		this.numero, 
                		this.bairro, 
                		this.cidade
                	]*/
                	[], 
                	function(transaction, results){
		                if (!results.rowsAffected) {
		                    sqlLite.updateStatus("Erro: Inserção não realizada");
		                }
		                else {
		                    //updateForm("", "", "");
		                    sqlLite.updateStatus("Inserção realizada, linha id: " + results.insertId);
		                  // id=this.findLast();
		                   this.id=results.insertId;
		                   return true;
		                }
                	}, 
                	sqlLite.errorHandler
                );
            });
            return false;
        } 
        catch (e) {
            sqlLite.updateStatus("Erro: INSERT não realizado " + e + ".");
        }


	};


	this.find=function(){

	};

	this.findAll=function(callback){
		
			query = "SELECT * FROM restaurante;";
			console.log(query);
		    try {
		        sqlLite.localDB.transaction(function(transaction){
		        
		            transaction.executeSql(query, [], function(transaction, results){
		            	var rows=new Array();
		            	for (var i = 0; i < results.rows.length; i++) {
		                    rows.push(results.rows.item(i));
		                
		                }
		                console.log(rows);
		                callback(rows);
		            }, function(transaction, error){
		                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
		                callback(false);
		            });
		        });
		    } 
		    catch (e) {
		        updateStatus("Error: SELECT não realizado " + e + ".");
		        callback(false);
		    }
		
	};

	this.update=function(){

	};
	this.delete=function(){

	};

}



$("#add").click(function(){
	
	$("#input").css("display","block");
});

$("#save").click(function(){
	
	restaurante=new Restaurante(
		null,
		$("#inputNomeRestaurante").val(),
		$("#inputEmail").val(),
		$("#inputTelefone").val(),
		$("#inputlogradouro").val(),
		$("#inputNumero").val(),
		$("#inputBairro").val(),
		$("#inputCidade").val()
	);
	restaurante.insert();
});



	function list(){
		restaurante=new Restaurante();
		restaurante.findAll(function(resultado){
			if(resultado){
				$("#itensData").empty();
				for(i=0;i<resultado.length;i++)	{
					console.log(resultado[i]);
					$("#itensData").append(
						"<tr><td>"+resultado[i].id+
						"</td><td>"+resultado[i].nome+
						"</td><td>"+resultado[i].email+
						"</td><td>"+resultado[i].telefone+
						"</td><td>"+resultado[i].logradouro+", "+resultado[i].numero+", "+resultado[i].bairro+", "+resultado[i].cidade+
						"</td><td></td>"+
						"</tr>"
					);
				}
			}
		});
	}

	list();
