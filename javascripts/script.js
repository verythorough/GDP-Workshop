var list = document.getElementById("list-of-repositories")

// Insert a repo into the list of repositories
function insertRepoIntoList(name){
  var p = document.createElement("p");
  p.innerHTML = name;

  list.appendChild(p);
}

// Process the response from the GraphQL API
function handleQueryResult(result){
  var edges = result.data.viewer.repositories.edges;
  for(var i = 0; i < edges.length; i++){
    var node = edges[i].node;
    var name = node.name;

    insertRepoIntoList(name);
  }
}

// Repository query
var query = `query{
  viewer{
    repositories(last: 5, privacy: PUBLIC){
      edges{
        node{
          name
        }
      }
    }
  }
}`;

// Run the query when we finish loading the page
window.onload = function(){
  Client.query(query, handleQueryResult);
}
