Client = (function(){
  auth_token = "24242bd7ad978f2d439fa41231a1a4c80051dcc7"; // DO NOT COMMIT THIS

  function query(query_string, callback){
    query_string = remove_newlines(query_string);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.github.com/graphql", true);
    xhr.setRequestHeader("Authorization", "bearer " + auth_token);
    xhr.send("{\"query\": \"" + query_string + "\"}");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (callback) {
          callback(JSON.parse(xhr.responseText));
        }else{
          console.log("No callback provided!")
        }
      }
    };
  }

  function remove_newlines(query_string){
    return query_string.replace(/[\n\r]*/g, "");
  }

  // Exposed methods on Client
  return {
    "query": query
  }
})();
