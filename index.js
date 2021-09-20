let photoArr = [];
let modalArr = [];
let modalId = null;
const baseUrl = "https://boiling-refuge-66454.herokuapp.com/images";
const photoContainer = document.getElementById("photo-container");
const modalWindow = document.getElementById("modal-wrapper");
const closeBtn = document.getElementById("close");
const coments = document.getElementById("comments");
const btn = document.getElementById("btn");

async function getPhotoFlow() {
    const response = await fetch(baseUrl);
    photoArr = await response.json();
    fillPhotoArr();
};

async function onPhotoClick(e) {
    const modalImg = document.getElementsByClassName("modal-img")[0];
    modalWindow.style.display = "flex";
    const response = await fetch(`${baseUrl}/${e.target.id}`);
    const modalData = await response.json();
    modalId = modalData.id;
    modalImg.src = modalData.url;
    modalArr = modalData.comments;
    modalArr.forEach((item) => {
        const coment = createElemWithId("div", item.id);
        const comentDate = createElemWithId("span", `${item.id}date`);
        const comentText = createElemWithId("span", `${item.id}text`);
        const comentDay = new Date(item.date);
        const date = (comentDay.getDate() < 10) ? "0" + comentDay.getDate() : comentDay.getDate();
        const month = ((comentDay.getMonth() + 1) < 10) ? "0" + (comentDay.getMonth() + 1) : (comentDay.getMonth() + 1);
        coments.append(coment);
        coment.classList.add("coment");
        coment.append(comentDate);
        document.getElementById(`${item.id}date`).innerHTML = `${date}.${month}.${comentDay.getFullYear()}`;
        document.getElementById(`${item.id}date`).style.color = "#CCCCCC";
        coment.append(comentText);
        document.getElementById(`${item.id}text`).innerHTML = item.text;
    })
};

async function sendComent() {
    const name = document.getElementById("name");
    const text = document.getElementById("text");
    const comentBody = {name: name.value, comment: text.value};
    const response = await fetch(`${baseUrl}/${modalId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(comentBody) 
    });
    if (response.ok) {
       alert("succesfully sended") 
    }
};

function createElemWithId(el, id) {
    const elem = document.createElement(el);
    elem.setAttribute('id', id);
    return elem
    };

function onCloseClick() {
    const comentsContainer = document.getElementsByClassName('coment');
    modalId = null;
    for (let i = 0; i < comentsContainer.length; i++) {
        let coment = document.getElementById(comentsContainer[i].id);
        coment.remove();
    }
    modalWindow.style.display = "none";
};

function fillPhotoArr() {
    photoArr.forEach(item => {
        let photo = document.createElement("img");
        photo.id = item.id;
        photoContainer.append(photo);
        photo.src = item.url;
    })
};

getPhotoFlow();
photoContainer.addEventListener("click", onPhotoClick);
closeBtn.addEventListener("click", onCloseClick);
btn.addEventListener("click", sendComent);


