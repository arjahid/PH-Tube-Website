const getTimeString = (time) => {
  let hour = parseInt(time / 3600);
  let remainSecond = time % 3600;
  let minute = parseInt(remainSecond / 60);
  remainSecond = remainSecond % 60;
  let day = parseInt(hour / 24);
  let remainHour = hour % 24;
  return `${day} day ${remainHour} hour ${minute} minute ${remainSecond} second ago`;
};
const  removeActiveClass=()=>{
const button=document.getElementsByClassName("cat-btn");
 for(let btn of button){
    btn.classList.remove("active");
 }
}
const loadDetails=async(videoId)=>{
    console.log(videoId)
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res=await fetch(url);
    const data=await res.json();
    displayDetails(data.video)
}
const displayDetails=(video)=>{
console.log(video)
const detailsContainer=document.getElementById('modal-content')
detailsContainer.innerHTML=`
<img src=${video.thumbnail} alt="" />
<p>${video.description}</p>
`
document.getElementById('showModal').click();
}
const loadCatagories = () => {
  const res = fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  )
    .then((res) => res.json())
    .then((data) => display(data.categories))
    .catch((err) => {
      console.log("error occured here", err);
    });
};
const loadVideos = () => {
  const res = fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => {
      console.log("error occured here", err);
    });
};
const loadCategoresVideos=(id)=>{
    // alert(id);
    const res=fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
     
    .then(data=>{
        removeActiveClass();
        const activeBtn=document.getElementById(`btn-${id}`)
        
        activeBtn.classList.add("active");
        displayVideos(data.category)
    } )
    .catch((err)=>{
        console.log("error occured here",err)
    })



}
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if(videos.length ==0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML =`
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
    <img src="/assets/Icon.png" alt="" />
    <h2 class="text-center font-bold">No content found here</h2></div>
    `
    return
  }else{
    videoContainer.classList.add("grid");
  }
  for (const video of videos) {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ``
          : ` <span class="absolute right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div><img class="h-10 w-10 rounded-full object-cover" src=${
      video.authors[0].profile_picture
    } alt="" /></div>
  </div>
  <div>
  <h2 class="font-bold">${video.title}</h2>
  <div class="flex gap-2 items-center">
  <p class="text-gray-400">${video.authors[0].profile_name}</p>
  ${
    video.authors[0].verified == true
      ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="" />`
      : ``
  }
  </div>
  
  <p>
  <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error ">details</button>
  </p>
  </div>
    `;
    videoContainer.appendChild(card);
  }
};
const display = (catagoriesOfData) => {
  const category = document.getElementById("category");
  for (const data of catagoriesOfData) {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${data.category_id}" onclick="loadCategoresVideos(${data.category_id})" class="btn cat-btn">${data.category}</button>`;
    category.appendChild(buttonContainer);
  }
};
loadCatagories();
loadVideos();
