const photoArr = [];
const modalArr = [];
let modalId = null;
const baseUrl = "https://boiling-refuge-66454.herokuapp.com/images";
const photoContainer = document.getElementsByClassName("photo-container")[0];
const modalWindow = document.getElementsByClassName("modal-wrapper")[0];
const closeBtn = document.getElementsByClassName("close")[0];
const coments = document.getElementsByClassName("comments")[0];

async function getPhotoFlow() {
    let response = await fetch(baseUrl);
    photoArr = await response.json();
    fillPhotoArr();
};

async function onPhotoClick(e) {
    const modalImg = document.getElementsByClassName("modal-img")[0];
    modalWindow.style.display = "flex";
    let response = await fetch(`${baseUrl}/${e.target.id}`);
    let modalData = await response.json();
    modalId = modalData.id
    modalImg.src = modalData.url;
    modalArr = modalData.comments
    modalArr.map((item) => {
        const coment = document.createElement("div");
        const comentDate = document.createElement("span");
        const comentText = document.createElement("span");
        comentDate.id = `${item.id}date`;
        comentText.id = `${item.id}text`;
        const comentDay = new Date(item.date);
        let date = (comentDay.getDate() < 10) ? "0" + comentDay.getDate() : comentDay.getDate();
        let month = ((comentDay.getMonth() + 1) < 10) ? "0" + (comentDay.getMonth() + 1) : (comentDay.getMonth() + 1);
        coments.append(coment);
        coment.classList.add("coment");
        coment.id = item.id;
        coment.append(comentDate);
        document.getElementById(`${item.id}date`).innerHTML = `${date}.${month}.${comentDay.getFullYear()}`;
        document.getElementById(`${item.id}date`).style.color = "#CCCCCC"
        coment.append(comentText);
        document.getElementById(`${item.id}text`).innerHTML = item.text;
    })
};

async function SendComent() {
    const name = document.getElementById("name");
    const text = document.getElementById("text");
    let response = fetch(`${baseUrl}/${modalId}/comments`, {
        method: 'POST',

    });
}

function onCloseClick() {
    const comentsContainer = document.getElementsByClassName('coment');
    comentsArr = [];
    for (let i = 0; i < comentsContainer.length; i++) {
        let coment = document.getElementById(comentsContainer[i].id);
        coment.remove()
    }
    modalWindow.style.display = "none";
};

function fillPhotoArr() {
    photoArr.map(item => {
        let photo = document.createElement("img");
        photo.id = item.id;
        photoContainer.append(photo);
        photo.src = item.url;
    })
};


getPhotoFlow();
photoContainer.addEventListener("click", onPhotoClick);
closeBtn.addEventListener("click", onCloseClick);


