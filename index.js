let photoArr = [];
const baseUrl = "https://boiling-refuge-66454.herokuapp.com/images";
const photoContainer = document.getElementsByClassName("photo-container")[0];
const modalWindow = document.getElementsByClassName("modal-wrapper")[0];
const closeBtn = document.getElementsByClassName("close")[0];

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
        modalImg.src = modalData.url;
        modalData.comments.map((item) => {
            const coment = document.createElement("div");
            const comentDate = document.createElement("span");
            const comentText = document.createElement("span");
            comentDate.id = `${item.id}date`;
            comentText.id = `${item.id}text`;
            const coments = document.getElementsByClassName("comments")[0];
            const comentDay = new Date(item.date);
            let date = (comentDay.getDate() < 10) ? "0" + comentDay.getDate() : comentDay.getDate();
            let month = ((comentDay.getMonth() + 1) < 10) ? "0" + (comentDay.getMonth() + 1) : (comentDay.getMonth() + 1);

            coments.append(coment);
            coment.classList.add("coment");
            coment.id = item.id;
            coment.append(comentDate);
            document.getElementById(`${item.id}date`).innerHTML = `${date}.${month}.${comentDay.getFullYear()}`;
            coment.append(comentText);
            document.getElementById(`${item.id}text`).innerHTML = item.text;
        })
    };

function onCloseClick() {
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


