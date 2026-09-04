// declaring inputs
let title =  document.getElementById("title");
let price = document.getElementById("Price");
let taxes = document.getElementById("Taxes");
let ads = document.getElementById("ADs");
let discount = document.getElementById("Discount");
let total = document.getElementById("total");
let category = document.getElementById("Category");
let count = document.getElementById("Count");
let countLabel = document.getElementById("countLabel")
let createBtn = document.getElementById("Create");
let tbody = document.getElementById("tbody")
let deletAllBtn =  document.getElementById("deleteAll-btn")
let mood = "create"
let temp;
let search= document.getElementById("search")
let titleMessage = document.getElementById("title-message")
let priceMessage=document.getElementById("price-message")
let categoryMessage=document.getElementById("category-message")
let darkMode = document.getElementById('dark-mode')
let scrolling = document.getElementById("scrolling")
let inputs = document.getElementById("inputs")
let outputs = document.getElementById("outputs")
let head = document.getElementById("head")
let subTitle = document.getElementById("sub-title")




// get total price 
function getTotal(){
     if (price.value>0){
        let result =  (Number(price.value)+Number(taxes.value)+Number(ads.value))-Number(discount.value)
        total.style.backgroundColor="green";
        total.innerHTML = result
     }else{
        total.innerHTML = "";
        total.style.backgroundColor = "#dd0101"
     }
    
}

// create produt 


 let productDataArr ;
if (localStorage.product != null ){
    productDataArr = JSON.parse(localStorage.product)
}else{
    productDataArr=[]
}
   
createBtn.onclick = function(){
   
    let productData = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total: total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    // data verification
    if (title.value == ""){
        titleMessage.classList.remove("hide")
        titleMessage.innerHTML = "*title is required"
        title.onkeyup= function() {titleMessage.classList.add("hide")}

    }
    else if(price.value==""){
        priceMessage.classList.remove("hide")
        priceMessage.innerHTML="*price is required"
        price.onkeyup= function() {priceMessage.classList.add("hide")}
    }
    else if(category.value==""){
        categoryMessage.classList.remove("hide")
        categoryMessage.innerHTML="*category is required"
        category.onkeyup= function() {categoryMessage.classList.add("hide")}
    }
    
    else{
       
        if (mood==="create"){
          
          if(Number(productData.count)>1){
        for(let i = 0; i<Number(productData.count); i++){
            productDataArr.push(productData)
        
        }
    }else{
            productDataArr.push(productData)

    }
     
    }else{ //update
        productDataArr[temp]=productData
        mood = "create"
        createBtn.innerHTML = "create"
        count.style.display= "block"
    }
    localStorage.setItem("product", JSON.stringify(productDataArr))
    clearData()
    readData()

    }
    
}



//  clear prpduct data
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    titleMessage.classList.add("hide");
    priceMessage.classList.add("hide");

}

// Read Product's Data 
function readData() {
    getTotal()
    let table = ""
   
    for(let i=0; i< productDataArr.length; i++){
        
        table += `
            <tr>
                 <td>${i+1}</td>
                <td>${productDataArr[i].title}</td>
                <td>${productDataArr[i].price}</td>
                <td>${productDataArr[i].taxes}</td>
                <td>${productDataArr[i].ads}</td>
                <td>${productDataArr[i].discount}</td>
                <td>${productDataArr[i].category}</td>
                <td>${productDataArr[i].total}</td>
                <td><button id="update-btn"  onclick = "updateData(${i})"  class="update-btn">update</button></td>
                <td><button id="delete-btn" onclick = "deleteData(${i})" class="delete-btn">delete</button></td>
            </tr>
        ` 
    }
      tbody.innerHTML = table;

         if (productDataArr.length>0){
            deletAllBtn.innerHTML=`
            <button class="delete-all-btn" onclick = "deleteAll()" >Delete all (${productDataArr.length})</button></td>
            `
         }else{
            deletAllBtn.innerHTML=""
         }



}
readData()


// Delete Product's Data

 function deleteData(i){
    productDataArr.splice(i,1);
    localStorage.product = JSON.stringify(productDataArr)
    readData()
 }


 
// Delete ALL Products Data
function deleteAll(){
    localStorage.clear()
    productDataArr.splice(0)
    readData()

}

// Update Data
function updateData(i){
    title.value = productDataArr[i].title
    price.value = productDataArr[i].price
    taxes.value = productDataArr[i].taxes
    ads.value = productDataArr[i].ads
    discount.value = productDataArr[i].discount
    category.value = productDataArr[i].category
    getTotal()
    count.style.display = "none"
    countLabel.style.display="none"
    createBtn.innerHTML = "update"
    mood= "update"
    temp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search data product

let searchMode = "title"
function  getSearchMode(id){
     if (id=="searchTitle"){
         searchMode = "title"

     }else{
         searchMode="category"
     }

     search.placeholder = "searh by "+searchMode;

    search.focus()
    console.log(searchMode)
    
}

function searchData(value) {
    let table = "";

    for (let i = 0; i < productDataArr.length; i++) {

        let match =
            searchMode === "title"
                ? productDataArr[i].title
                : productDataArr[i].category;

        if (match.toLowerCase().includes(value.toLowerCase())) {

            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productDataArr[i].title}</td>
                    <td>${productDataArr[i].price}</td>
                    <td>${productDataArr[i].taxes}</td>
                    <td>${productDataArr[i].ads}</td>
                    <td>${productDataArr[i].discount}</td>
                    <td>${productDataArr[i].category}</td>
                    <td>${productDataArr[i].total}</td>
                    <td>
                        <button onclick="updateData(${i})"
                                class="update-btn">update</button>
                    </td>
                    <td>
                        <button onclick="deleteData(${i})"
                                class="delete-btn">delete</button>
                    </td>
                </tr>
            `;
        }
    }

    tbody.innerHTML = table;
}

darkMode.onclick = function(){
    document.body.classList.toggle("dark")
    outputs.classList.toggle("dark-bgs")
    inputs.classList.toggle("dark-bgs")
    head.classList.toggle("gradient-text")
    subTitle.classList.toggle("sub-title-color")
    labelColor.classList.toggle("sub-title-color")
    

    
}

window.onscroll = function(){
    if(scrollY>400){
         scrolling.classList.remove("hide")
}else{
     scrolling.classList.add("hide")
     
}
}
scrolling.onclick=function(){
     scroll({
        top:0,
        behavior:"smooth"
    })
}