var data=[];
getRecipes('pizza');
var links=document.querySelectorAll('.navbar .nav-link')
for(i=0;i<links.length;i++){
    links[i].addEventListener('click',function(e){
        var currentMeal=e.target.text;
        getRecipes(currentMeal);

    })}
function getRecipes(meal){
    let myHttp = new XMLHttpRequest();
    myHttp.open("Get",`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    myHttp.send();
    myHttp.addEventListener('readystatechange',function(){
        if(myHttp.readyState==4)
        {
            data=JSON.parse(myHttp.response).recipes;
            displayData();
         
        }
    })
}


function displayData(){
    var cols=``;
    for(var i=0;i<data.length;i++){
        cols+=
        ` <div class="col-md-3 my-2">
        <div class='item'>
        <img  class="w-100 imgRecipe" src="${data[i].image_url}" alt="">
          <h4>${data[i].title}</h4>
     <a href='${data[i].source_url}' class="btn btn-dark">Source</a>
     <a onclick='getRecipesDetails(${data[i].recipe_id})' data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn" style="background-color:coral;">Details</a>
        </div>
  
  
      </div>
        `
    }
    document.getElementById('rowData').innerHTML=cols;

}
 async function getRecipesDetails(recipeId){
  var response= await  fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
  var details= await response.json();
  var recipeDetailsData=
  `
  <img class="w-100 imgRecipe h-100" src='${details.recipe.image_url}'>
  <h2> ${details.recipe.publisher}</h2>
  
  
  `
document.getElementById('recipeData').innerHTML=recipeDetailsData;
 }




