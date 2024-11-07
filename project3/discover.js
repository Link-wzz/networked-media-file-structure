
const img = document.querySelector('#exitImg');
const detailPage = document.querySelector('#detailPostPage');

const title = document.querySelector('#title');
const body = document.querySelector('#body');
const tags = document.querySelector('#tags');
const uploadTime = document.querySelector('#uploadTime');

const postDetail = document.querySelector('#postDetail');
const yesarea = document.querySelector('#yesArea');
const noarea = document.querySelector('#noArea');

const graph = document.querySelector('#graph'); 
const graphN = document.querySelector('#graphN'); 

const discover = document.querySelector('#discover');

document.addEventListener('DOMContentLoaded', function() {
    const detailPage = document.getElementById('detailPostPage');
    const postDetail = document.getElementById('postDetail');

    //Use event delegates to handle clicks
    document.getElementById('contentArea').addEventListener('click', function(event) {
        // Check if the target of the event is the post element or its children
        let target = event.target;

        while (target != this && !target.matches('.post')) {
            target = target.parentNode;
            if (target == null) return;
        }

        if (target.matches('.post')) {
            const postId = target.dataset.id;
            postDetail.setAttribute('data-post-id', postId);
            detailPage.style.display = 'flex';
            loadPostDetails(target);
        }
    });
});

let voteHandlerYes;
let voteHandlerNo;

function startVoteListener(postId) {
    voteHandlerYes = () => handleVote(postId, 'yes');
    voteHandlerNo = () => handleVote(postId, 'no');

    yesarea.addEventListener('click', voteHandlerYes, { once: true });
    noarea.addEventListener('click', voteHandlerNo, { once: true });
}

function handleVote(postId, voteOption) {
    const url = `/vote?postId=${postId}&voteOption=${voteOption}`;
    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(result => {
        console.log('Vote recorded:', result);
        disableVoting();
        reveal(postId);
    })
    .catch(error => console.error('Error voting:', error));
}
function disableVoting() {
        yesarea.removeEventListener('click', handleVote);
        noarea.removeEventListener('click', handleVote);
        yesarea.style.pointerEvents = 'none';
        noarea.style.pointerEvents = 'none';
        yesarea.style.opacity = '0.6';
        noarea.style.opacity = '0.6';
}
function resetVoting() {
    yesarea.style.pointerEvents = '';
    noarea.style.pointerEvents = '';
    yesarea.style.opacity = '1';
    noarea.style.opacity = '1';

}


function loadPostDetails(postElement) {
    const postId = postElement.dataset.id;

    fetch(`/api/posts/${postId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('title').textContent = data.blogTitle;
        document.getElementById('body').textContent = data.blogBody;
        if(data.selectedArray && data.selectedArray.length>0){
            createTags(data.selectedArray);
        }
        document.getElementById('uploadTime').textContent = "Posted " + data.date;
        resetVoting();
        startVoteListener(postId);
        console.log("VoteListener Start!");
    })
    .catch(error => console.error('Error loading the post details:', error));
}

img.addEventListener("click",(event)=>{
    detailPage.style.display = 'none';
    resetDetailPage();
    revealReset();
})

function resetDetailPage(){
    title.innerText = "";
    body.innerText = "";
    tags.innerHTML = "";
    uploadTime.innerText = "";
}

function createTags(tagString) {
    // Obtain a container where the label is stored
    const tagsContainer = document.getElementById('tags'); 
    // Split strings to create an array of tags
    const tags = tagString.split(',');
    
    tags.forEach(tag => {
        // Create a new span element for each tag
        const tagElement = document.createElement('span'); 
        tagElement.textContent = tag.trim(); 
        tagElement.className = 'tag-style'; //Add class for css

        tagsContainer.appendChild(tagElement); 
    });
}




const yesPercentage= document.querySelector("#yesPercentage");
const noPercentage= document.querySelector("#noPercentage");

const yesNumber = document.querySelector("#yesNumber");
const noNumber = document.querySelector("#noNumber");

const voteInstruction = document.querySelector("#voteInstruction");

// After vote, revealing animation
function reveal(postId){
    
    fetch(`/api/votes/${postId}`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        const totalVotes = data.voteYes + data.voteNo;

        const YesVote = data.voteYes;
        const NoVote = data.voteNo;

        const yesGraph = YesVote/totalVotes * 52;
        const noGraph = NoVote/totalVotes * 52;

        const yesPercent = Math.floor(YesVote/totalVotes * 100);
        const noPercent = Math.floor(NoVote/totalVotes* 100);

        // let titleHeight = getElementById('titleAndExit').offsetHeight
        let nowHeight = postDetail.offsetHeight;
        postDetail.style.height = nowHeight +"px";
 
        postDetail.style.transition = '700ms ease';
        console.log(nowHeight);
        setTimeout(() => {
            postDetail.style.height = (nowHeight+50) +"px";
        }, 300);

        
        setTimeout(() => {
            graph.style.height = "40px";
            graphN.style.height = "40px";
        }, 1000);

        setTimeout(() => {
            yesPercentage.style.width = `${yesGraph}vw`;
            noPercentage.style.width = `${noGraph}vw`;
            yesNumber.innerText = "Yes " + yesPercent +"%";
            noNumber.innerText = "No " + noPercent +"%";
            setTimeout(() => {
                yesNumber.style.opacity = "1";
                noNumber.style.opacity = "1";

            }, 800);
            voteInstruction.innerText="People chose...";

        }, 2000);
    })
    .catch(error => console.error('Error loading vote data:', error));
}


function revealReset(){
        postDetail.style.height = "auto"
        graph.style.height = "0px";
        graphN.style.height = "0px";

        yesPercentage.style.width = "0vw";
        noPercentage.style.width = "0vw";
        yesNumber.innerText = " "
        noNumber.innerText = " "
        yesNumber.style.opacity = "0";
        noNumber.style.opacity = "0";
        voteInstruction.innerText="Share your voice! Hover and click on the sides of the screen to vote!";

}

//for different tags
document.querySelectorAll('.categories').forEach(category => {
    console.log("Category addEventListener Active!");

    // Set up listeners for each category
    category.addEventListener('click', function() {
        const tag = this.innerText;
        // const tag = this.getAttribute('data-tag');
        
        fetchPostsByTag(tag);
        // console.log(tag);
    });
});

//Mainly GPT
function fetchPostsByTag(tag) {
    fetch(`/api/posts/tag/${tag}`)
    .then(response => response.json())
    .then(posts => {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = ''; 
        if (posts.length > 0) {
            posts.forEach(post => {
                contentArea.innerHTML += createPostHtml(post);
                discover.innerText = tag;
            });
        } else {
            contentArea.innerHTML = '<p>No posts found under this tag.</p>';
        }
    })
    .catch(error => console.error('Error fetching posts:', error));
}

function createPostHtml(post) {
    const tagsHtml = post.selectedArray.split(',').map(tag =>
        `<span class="previewTag">${tag.trim()}</span>` 
    ).join(' '); 

    return `
        <div class="post" data-id="${post.postNumber}">
            <div class="postTitle">${post.blogTitle.substring(0, 73) + (post.blogTitle.length > 73 ? '...' : '')}</div>
            <div class="postBody">${post.blogBody.substring(0, 250) + (post.blogBody.length > 250 ? '...' : '')}</div>
            <div class="information">
                <div class="PreviewTags">
                ${tagsHtml} 
                </div>
                ${post.date}
            </div>

        </div>
    `;
}