let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

let btnLogout = document.getElementById("btn_logout");

btnLogout.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn đăng xuất không ?")) {
        localStorage.removeItem("currentUser");
        alert("Đăng xuất thành công!");
        window.location.href = "./login.html"; 
    }
});

let btn_openPopUp = document.querySelectorAll(".btn-open");
let btn_closePopUp = document.querySelectorAll(".btn-close");

// popup hiển thị

btn_openPopUp.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let id = e.target.id;

        if (id === "btn_addNewWord") {
            document.getElementById("popUpNewWord").style.display = "flex";
        }
    });
});

btn_closePopUp.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let id = e.target.id;

        if (id === "close_add") {
            document.getElementById("popUpNewWord").style.display = "none";
        }
        if (id === "close_edit") {
            document.getElementById("popUpEdit").style.display = "none";
        }
        if (id === "close_delete") {
            document.getElementById("popUpDeleteWord").style.display = "none";
        }
    });
});

// Cancel
document.getElementById("btn_cancelAddNewWord").onclick = () => {
    document.getElementById("popUpNewWord").style.display = "none";
};

document.getElementById("btn_cancelEditWord").onclick = () => {
    document.getElementById("popUpEdit").style.display = "none";
};

document.getElementById("btn_cancelDeleteWord").onclick = () => {
    document.getElementById("popUpDeleteWord").style.display = "none";
};


let words = [
    {
        id: "1",
        word: "Cat",
        meaning: "mèo",
        categoryId: "animal",
        example: "The cat is sleeping on the sofa."
    },
    {
        id: "2",
        word: "Dog",
        meaning: "chó",
        categoryId: "animal",
        example: "My dog loves playing in the park."
    }
];

let saveData = () => {
    localStorage.setItem("listWord", JSON.stringify(words));
};

let getData = () => {
    let data = localStorage.getItem("listWord");
    if (data) {
        words = JSON.parse(data);
    }
};
getData();


let tableRenderData = document.getElementById("list_word");

const renderData = (list) => {
    tableRenderData.innerHTML = "";

    list.forEach(w => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${w.word}</td>
        <td>${w.meaning}</td>
        <td>${w.categoryId}</td>
        <td class="buttonAction">
            <button onclick="openEdit('${w.id}')" style="color: #4e73df;">Edit</button>
            <button onclick="openDelete('${w.id}')" style="color: #e74a3b;">Delete</button>
        </td>
        `;
        tableRenderData.appendChild(tr);
    });
};

renderData(words);

// hiển thị popup sửa xóa

let indexWord = null;

let inputEditWord = document.getElementById("editInputWord");
let inputEditMeaning = document.getElementById("editInputMeaning");
let inputEditCategory = document.getElementById("editInputCategory");

let openEdit = (id) => {
    let w = words.find(e => e.id === id);
    if (!w) return;

    inputEditWord.value = w.word;
    inputEditMeaning.value = w.meaning;
    inputEditCategory.value = w.categoryId;

    indexWord = id;
    document.getElementById("popUpEdit").style.display = "flex";
};

let openDelete = (id) => {
    indexWord = id;
    document.getElementById("popUpDeleteWord").style.display = "flex";
};

// thêm mới

let inputNewWord = document.getElementById("inputNewWord");
let inputMeaningWord = document.getElementById("inputMeaningWord");
let catagoryWord = document.getElementById("selectCategory");
let btn_confirmAdd = document.getElementById("btn_saveNewWord");

btn_confirmAdd.addEventListener("click", () => {
    let wordNew = inputNewWord.value.trim();
    let meaning = inputMeaningWord.value.trim();

    if (!wordNew || !meaning) return;

    let newWord = {
        id: Date.now().toString(),
        word: wordNew,
        meaning: meaning,
        categoryId: catagoryWord.value,
        example: "Example",
    };

    words.push(newWord);
    saveData();
    renderData(words);

    document.getElementById("popUpNewWord").style.display = "none";

    inputNewWord.value = "";
    inputMeaningWord.value = "";
});

// xóa

let btn_confirmDelete = document.getElementById("btn_ConfirmDeleteWord");

btn_confirmDelete.addEventListener("click", () => {
    let index = words.findIndex(w => w.id === indexWord);

    if (index !== -1) {
        words.splice(index, 1);
        saveData();
        renderData(words);
    }

    document.getElementById("popUpDeleteWord").style.display = "none";
});

// chỉnh sửa

let btn_editConfirm = document.getElementById("btn_saveEditWord");

btn_editConfirm.addEventListener("click", () => {
    let index = words.findIndex(w => w.id === indexWord);

    if (index !== -1) {
        words[index] = {
            ...words[index],
            word: inputEditWord.value,
            meaning: inputEditMeaning.value,
            categoryId: inputEditCategory.value
        };

        saveData();
        renderData(words);
    }

    document.getElementById("popUpEdit").style.display = "none";
});
//lọc

let searchByCatagories = document.getElementById("list_categories");

searchByCatagories.addEventListener("change", () => {
    let type = searchByCatagories.value;

    if (type === "AllCategory") {
        renderData(words);
    } else {
        let result = words.filter(w => w.categoryId === type);
        renderData(result);
    }
});

// tìm kiếm

let inputSearchVocab = document.getElementById("inputSearchCate");

inputSearchVocab.addEventListener("keyup", () => {
    let keyword = inputSearchVocab.value.toLowerCase().trim();

    let result = words.filter(w =>
        w.word.toLowerCase().includes(keyword) ||
        w.meaning.toLowerCase().includes(keyword)
    );

    renderData(result);
});

// const renderOption = () =>{
//     searchByCatagories.innerHTML="";
//     words.forEach(w =>{
//         let option = document.createElement("option");
//         option.innerText=`${w.categoryId}`;
//         searchByCatagories.appendChild(option);
//     });
// };

// renderOption();