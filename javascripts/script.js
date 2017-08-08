var list = document.getElementById("list-of-repositories")

// Creates a paragraph element containing content.
function createParagraph(content){
  var paragraph = document.createElement("p");
  paragraph.innerHTML = content;

  return paragraph;
}

// Insert a repo into the list of repositories
function insertRepoIntoList(name, url, starCount, issueCount, pullRequestCount){
  // Container that holds the repository
  var repoContainer = document.createElement("div");
  repoContainer.classList.add("repo-container");

  // Name / URL
  var a = document.createElement("a");
  a.innerHTML = name;
  a.setAttribute("href", url)
  repoContainer.appendChild(a);

  // Container that holds other info
  var otherInfoContainer = document.createElement("div");
  otherInfoContainer.classList.add("other-info-container");

  otherInfoContainer.appendChild(createParagraph(starCount + " stars"));
  otherInfoContainer.appendChild(createParagraph(issueCount + " issues"));
  otherInfoContainer.appendChild(createParagraph(pullRequestCount + " pull requests"));

  // Add our other info to the overall repo container
  repoContainer.appendChild(otherInfoContainer);

  // Add our repo to the list of repos
  list.appendChild(repoContainer);
}

// Process the response from the GraphQL API
function handleQueryResult(result){
  var edges = result.data.viewer.repositories.edges;
  for(var i = 0; i < edges.length; i++){
    var node = edges[i].node;

    var name = node.name;
    var url = node.url;
    var stars = node.stargazers.totalCount;
    var issues = node.issues.totalCount;
    var pullRequests = node.pullRequests.totalCount;

    insertRepoIntoList(name, url, stars, issues, pullRequests);
  }
}

// Repository query
var query = `query{
  viewer{
    repositories(first: 5, privacy: PUBLIC, orderBy: {field: CREATED_AT, direction: ASC}){
      edges{
        node{
          name
          url
          issues(states: OPEN){
            totalCount
          }
          pullRequests(states:OPEN){
            totalCount
          }
          stargazers{
            totalCount
          }
        }
      }
    }
  }
}`;

// Run the query when we finish loading the page
window.onload = function(){
  Client.query(query, handleQueryResult);
}
