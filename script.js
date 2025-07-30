// List of post data
const posts = [
  {
    username: "mr.rajput.45__",
    profilePic: "/assets/profilepic.jpg",
    postImage: "/assets/postimage.jpg",
    likedBy: "ramanthete",
    caption: "Satpuda Memories...!",
    likes: 241
  },
  {
    username: "mj_katta",
    profilePic: "/assets/mj.jpg",
    postImage: "/assets/mj.jpg",
    likedBy: "sachinsatre",
    caption: "Love...",
    likes: 546
  },
  {
    username: "rohitsharma",
    profilePic: "/assets/Ro.img.jpg",
    postImage: "/assets/victory.mp4",
    likedBy: "mj_katta",
    caption: "Winning Moment...",
    likes: 45000
  }, 
  {
    username: "google",
    profilePic: "/assets/google.jpg",
    postImage: "/assets/geminiintro.webp",
    likedBy: "apple",
    caption: "Google's Gemini AI Revealed",
    likes: 10000
  },
  {
    username: "firstbitsolutions",
    profilePic: "/assets/fbs.jpg",
    postImage: "/assets/vinayak.mp4",
    likedBy: "omkarkalukhe",
    caption: "Krishna Won't Shoot your Arrow!",
    likes: 999
  },
  {
    username: "hrithikroshan",
    profilePic: "/assets/hritik.jpeg",
    postImage: "/assets/hritikpost.webp",
    likedBy: "ramanthete",
    caption: "Graceful moves!",
    likes: 5400
  },
  {
    username: "ramanthete",
    profilePic: "/assets/raman.jpg",
    postImage: "/assets/raman.jpg",
    likedBy: "krunalll",
    caption: "🔥",
    likes: 314
  },
  {
    username: "mangalsinghrajput",
    profilePic: "/assets/mangal.jpg",
    postImage: "/assets/mangal.jpg",
    likedBy: "Jaydeep",
    caption: "Goa vibes...",
    likes: 267
  }
];


let postIndex = 0; // To keep track of which post is being displayed next
const postContainer = document.getElementById("postContainer");
const feed = document.querySelector(".feed");

// Pause all playing videos
function pauseAllVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

// Observe video visibility and autoplay/pause
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (video.tagName === "VIDEO") {
      if (entry.isIntersecting) {
        video.muted = false;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });
}, {
  threshold: 0.8
});

// Create and display a post
function createPost() {
  if (postIndex >= posts.length) return;

  const post = posts[postIndex];
  const isVideo = post.postImage.endsWith(".mp4");

  const mediaHTML = isVideo
    ? `<video src="${post.postImage}" class="postmedia" playsinline></video>`
    : `<img src="${post.postImage}" class="postmedia" />`;

  const postHTML = `
    <div class="post">
      <div class="profile">
        <div class="left">
          <img src="${post.profilePic}" />
          <div class="username"><b>${post.username}</b></div>
        </div>
        <div class="right">
          <button class="follow-btn">Follow</button>
          <img src="/assets/dots.png" />
        </div>
      </div>
      <div class="postcontent">
        ${mediaHTML}
      </div>
      <div class="bottom">
        <div class="left">
          <img src="/assets/like.jpg" />
          <img src="/assets/comment.jpg" />
          <img src="/assets/share.jpg" />
        </div>
        <div class="right">
          <img src="/assets/save.jpg" />
        </div>
      </div>
      <div class="caption1">
        <p>Liked by <b>${post.likedBy}</b> and ${post.likes} others</p>
      </div>
      <div class="caption2">
        <p><b>${post.username}</b> ${post.caption}</p>
      </div>
    </div>
  `;

  // Insert post and observe video if present
  postContainer.insertAdjacentHTML("beforeend", postHTML);

  // Attach observer to video after rendering
  const addedPost = postContainer.lastElementChild;
  const video = addedPost.querySelector("video");
  if (video) {
    observer.observe(video);
  }

  postIndex++;
}

// Initial 2 posts
for (let i = 0; i < 2; i++) {
  createPost();
}

// Scroll to load more posts
feed.addEventListener("scroll", () => {
  if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 10) {
    pauseAllVideos();
    createPost();
  }
});
