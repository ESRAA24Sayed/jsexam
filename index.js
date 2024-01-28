let Data=document.getElementById("data")
let searchData=document.getElementById("searchData")


$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


function openSide(){
    $(".nav-bar-side").animate({left:"0px"},500)
   
    $(".click-nav").removeClass("fa-align-justify")
    $(".click-nav").addClass("fa-x")

    for(let i=0;i<5;i++){
        $(".list li").eq(i).animate({top:0},(i+5)*100)  
    }
}
 function closeSide(){
    let animateNav=$(".nav-bar-black").outerWidth()

    $(".nav-bar-side").animate({left:-animateNav},500)
    $(".click-nav").addClass("fa-align-justify")
    $(".click-nav").removeClass("fa-x")

    $(".list li").animate({top:300},500) 
 }
closeSide()

$(".nav-bar-side").css("left")


$(".nav-bar-side i.click-nav").click(()=>{
    

    if($(".nav-bar-side").css("left")=="0px"){
         closeSide()
     }
    else{
       openSide()
    }
    
   
})
async function mealsData(meals){
    searchData.innerHTML="";
    let mealsData=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`)
    mealsData=await mealsData.json()

    displayData(mealsData.meals)
}


function displayData(data){
    let cartone="";

    for(let i=0; i<data.length; i++)
    {
        cartone+=`        
        <div class="col-md-3 mb-4">
        <div onclick="mealsDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden cursor-pointer">
            <img src="${data[i].strMealThumb}" alt="" class="w-100">
            <div class="layer position-absolute d-flex align-items-center">
                <h3>${data[i].strMeal}</h3>

            </div> 
        </div>
        </div> `




    }
    Data.innerHTML=cartone

}

mealsData("")

async function category(){
    searchData.innerHTML="";
    let catData=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    catData=await catData.json()

    displayCat(catData.categories)
}

function displayCat(items){
    let cartone="";

    for(let i=0; i<items.length; i++)
    {
        cartone+=`        
        <div class="col-md-3 mb-4">
        <div onclick="mealsCAT('${items[i].strCategory}')" class="meal position-relative overflow-hidden cursor-pointer">
            <img src="${items[i].strCategoryThumb}" alt="" class="w-100">
            <div class="layer position-absolute text-center">
                <h3>${items[i].strCategory}</h3>
                <p>${items[i].strCategoryDescription.split(" ").splice(0,10).join(" ")}</p>
            </div> 
        </div>
        </div> `




    }
    Data.innerHTML=cartone

}


async function area(){
    searchData.innerHTML="";
    let areaData=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    areaData=await areaData.json()

    displayArea(areaData.meals)
}

function displayArea(items){
    let cartone="";

    for(let i=0; i<items.length; i++)
    {
        cartone+=`        
        <div class="col-md-3 mb-4">
        <div onclick=mealsArea('${items[i].strArea}') class="meal cursor-pointer">
                <h3>${items[i].strArea}</h3>
        </div>
        </div> `




    }
    Data.innerHTML=cartone

}

async function ingred(){
    searchData.innerHTML="";
    let responseIngred= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    responseIngred= await responseIngred.json()

    displayIngred(responseIngred.meals.splice(0,25))

}


function displayIngred(items){
    let cartone="";

    for(let i=0; i<items.length; i++)
    {
        cartone+=`        
        <div class="col-md-3 mb-4">
        <div onclick=ingredients('${items[i].strIngredient}') class="meal ">
            <div class="  text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${items[i].strIngredient}</h3>
                <p>${items[i].strDescription.split(" ").splice(0,15).join(" ")}</p>
            </div> 
        </div>
        </div> `



    }
    Data.innerHTML=cartone

}


async function mealsCAT(choose){
    searchData.innerHTML="";
    let mealsCAT=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${choose}`)
    mealsCAT=await mealsCAT.json()

    displayData(mealsCAT.meals.slice(0,25))
    
}

async function mealsArea(areas){
    let mealsArea=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areas}`)
    mealsArea=await mealsArea.json()

    displayData(mealsArea.meals.slice(0,25))
    
}

async function ingredients(component){
    searchData.innerHTML="";
    let ingredients=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${component}`)
    ingredients=await ingredients.json()

    displayData(ingredients.meals.slice(0,25))
    
}

async function mealsDetails(details){
    searchData.innerHTML="";
    let mealsDetails=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`)
    mealsDetails=await mealsDetails.json()

    displayDetails(mealsDetails.meals[0])
    
}


function displayDetails(data){
    let ingredient=``
    for(let i=1;i<=20;i++){
        if(data[`strIngredient${i}`]){
            ingredient+=`<li class="alert alert-info m-2">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }


    let tags=data.strTags?.split( ", ")
    if  (!tags) tags=[]
    let tagstring=''
    for(let i=0; i<tags.length; i++){
        
        tagstring+=`<li class="alert alert-info m-2 ">${tags[i]}</li>`
        
    }


 


    let cartone="";
     cartone+=`        
        <div class="col-md-4">
        <img src="${data.strMealThumb}" alt="" class="w-100">
        <h2>${data.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>"${data.strInstructions}"</p>
        <h3><span>Area:</span> "${data.strArea}"</h3>
        <h3><span>Area:</span> "${data.strCategory}"</h3>
        <h2>Recipes :</h2>
        <ul class="d-flex list-unstyled flex-wrap">
                ${ingredient}
        </ul>

        <h3>Tags:</h3>
        <ul class="d-flex list-unstyled flex-wrap">
            ${tags}
        </ul>

        <a href="${data.strSource}" class="btn btn-danger">Source</a>
        <a href="${data.strYoutube}" class="btn btn-warning">Youtube</a>
    </div> 
    `




    
    Data.innerHTML=cartone

}
function searchInput(){
    searchData.innerHTML=`    <div class="col-md-6">
    <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
</div>
<div class="col-md-6">
    <input onkeyup="searchByFletter(this.value)" maxLength="1" type="text" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
</div>`


Data.innerHTML=""

}

async function searchByName(term){
    
        let responseSearch= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        responseSearch= await responseSearch.json()
    
        

        if (responseSearch.meals == null){
            displayData([])
        }
        else{
            displayData(responseSearch.meals)

        }
    
   
}


async function searchByFletter(term){
    if(term == ""){

        term = "a";
    }
    else
    {
        let searchByFletter= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        searchByFletter= await searchByFletter.json()
    
        if (searchByFletter.meals == null){
            displayData([])
        }
        else{
            displayData(searchByFletter.meals)
    
        }
    

    }
  

 

}







function contacts() {
    Data.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}






















