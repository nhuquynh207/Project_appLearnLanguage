let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// lấy category 
const getCategoryByUser = () => {
    let data = localStorage.getItem("data_" + currentUser.id);
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
};

let listCatagory = getCategoryByUser(); 



const getDataByUser = () =>{
    let data = localStorage.getItem("word_" + currentUser.id);
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
};

let userData = getDataByUser();

let tableListWord = document.getElementById("listLearned");
let cardLearn = document.getElementById("cardWord");
let btn

const renderListWord = () =>{
    
    userData.forEach(w => {
        let tr = document.createElement("tr");
        tr.innerHTML= `
            <td>${w.word}</td>
            <td>${w.meaning}</td>
            <td>Not learned</td>
        `;

        tableListWord.appendChild(tr);
    });
};

renderListWord();

const renderCardWord = () =>{
    userData.forEach(w=>{
        let p = document.createElement("p");
        p.innerHTML=`${w.word}`
    })
}