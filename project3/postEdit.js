const area = document.getElementById("tagsArea");
const pool = document.getElementById("tagsPool");

const tagsArea = document.querySelector("#tagsArea");
const tagsPool = document.querySelector("#tagsPool");

let selectedArray = [];


area.addEventListener("click",(event)=>{
    if(event.target.tagName === "BUTTON"){
        addtagToTagsPool(event.target.innerText);
        event.target.remove();
    }
})

pool.addEventListener("click",(event)=>{
    if(event.target.tagName === "BUTTON"){
        addtagToTagsArea(event.target.innerText)
        event.target.remove();
    }   
    
})

function addtagToTagsArea (htmlText){
    let button = document.createElement("button");
    button.textContent = htmlText;
    button.type = "button"
    button.className = "ta";
    tagsArea.append(button);



    // Adds to the selected array
    if (!selectedArray.includes(htmlText)) {
        selectedArray.push(htmlText);
    }
    updateHiddenInput(); // Updated hidden inputs

}

//GPT inspired
function addtagToTagsPool (htmlText){
    let button = document.createElement("button");
    button.textContent = htmlText;
    button.type = "button"
    button.className = "tp";
    tagsPool.append(button);


     const index = selectedArray.indexOf(htmlText);
     if (index > -1) {
         selectedArray.splice(index, 1);
     }
     updateHiddenInput(); 
}


function updateHiddenInput() {
    document.getElementById('selectedTags').value = selectedArray.join(',');
    console.log(selectedArray);
}

//check if the user input is compliant
function validateForm() {
    const title = document.getElementById('blogTitleArea').value;
    const body = document.getElementById('blogBodyArea').value;
    const tags = document.getElementsByClassName('ta');

    if (title.length < 10 ){
        alert('The title is too short, please enter a longer title');
        return false; //Block form submissions
    }
    else if (body.length < 15) {
        alert('The content you entered is too short, please enter more content to submit.');
        return false; 
    }
    else if(tags.length==0){
        alert('Please select at least one tag');
        return false; 
    }

    return true; 
}