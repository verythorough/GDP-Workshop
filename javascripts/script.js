var list = document.getElementById("list-of-repositories")

// Creates a paragraph element containing content.
function createParagraph(content){
  var paragraph = document.createElement("p");
  paragraph.innerHTML = content;

  return paragraph;
}

// Insert a repo into the list of repositories
function insertUserIntoList(name, avatar, profile){
  console.log(avatar);
  // Link that holds the user
  var userLink = document.createElement("a");
  userLink.classList.add("user-link");
  userLink.setAttribute("href", profile)

  // Avatar
  var img = document.createElement("img");
  img.classList.add("avatar");
  img.setAttribute("src", avatar);
  img.setAttribute("alt", name);
  userLink.appendChild(img);

  //Name
  var txt = document.createTextNode(name);
  userLink.appendChild(txt);

  // Add our repo to the list of repos
  list.appendChild(userLink);
}

// Process the response from the GraphQL API
function handleQueryResult(result){
  console.log(result);
  var search = result.data.search;
  var count = search.issueCount;
  var edges = search.edges;
  var users = [];
  for(var i = 0; i < edges.length; i++){
    var author = edges[i].node.author;
    var name = author.login;
    if (!users.includes(name)) {
      users.push(name);
      var avatar = author.avatarUrl;
      console.log(author);
      var profile = author.url;
      insertUserIntoList(name, avatar, profile);
    }
  }
}

// Repository query
var query = `query{
  search (last: 100, query: \\"repo:gdisf/teaching-materials is:pr created:2017-07-28..2017-08-08\\", type: ISSUE) {
    issueCount
    edges {
      node {
        ... on PullRequest {
          number
          createdAt
          author {
            avatarUrl
            login
            url
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
