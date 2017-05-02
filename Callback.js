//Run with node
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function get(URL,callback){
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		const DONE = 4
		const OK = 200
		if(this.readyState === DONE){
			if(this.status === OK){
				//todo ok
				callback(null, JSON.parse(this.responseText))
			}else {
				//hubo un error
				callback(new Error (`Se produjo un error al realizar el request: $(this.status)`))
			}
		}
	}
xhr.open ('GET', URL);
xhr.send(null);
}

function handleError(err){
	console.log((`Request failed: ${err}`))
}

get('http://swapi.co/api/people/1',function onCharacter(err,luke){
	if(err) return handleError(err)
	
	get(luke.homeworld, function onHomeWorldResponse(err,homeworld){
	 if(err) return handleError(err)

	console.log('Request succeded')
	console.log(`${luke.name} nació en ${homeworld.name}`)		
	})	
})
	

