const apiBaseURL = 'https://jsonplaceholder.typicode.com/posts';
let editingPostId = null;

document.addEventListener("DOMContentLoaded", loadPosts);

function loadPosts() {
  fetch(apiBaseURL)
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById('postsContainer');
      postsContainer.innerHTML = '';
      data.slice(0, 10).forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('col-md-6', 'post-card');
        postElement.setAttribute('id', `post-${post.id}`);
        postElement.innerHTML = `
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5>${post.title}</h5>
            <div class="post-actions">
              <button class="btn btn-warning btn-sm" onclick="startEditing(${post.id})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="removePost(${post.id})">Delete</button>
            </div>
          </div>
          <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    });
}

function savePost() {
  const title = document.getElementById('postTitle').value.trim();
  const body = document.getElementById('postBody').value.trim();

  if (!title || !body) {
    alert("Please fill out both fields!");
    return;
  }

  if (editingPostId) {
    fetch(`${apiBaseURL}/${editingPostId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 }),
    })
      .then(response => response.json())
      .then(updatedPost => {
        const postElement = document.getElementById(`post-${updatedPost.id}`);
        postElement.querySelector('h5').textContent = updatedPost.title;
        postElement.querySelector('p').textContent = updatedPost.body;
        resetForm();
      });
  } else {
    fetch(apiBaseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId: 1 }),
    })
      .then(response => response.json())
      .then(newPost => {
        const postElement = document.createElement('div');
        postElement.classList.add('col-md-6', 'post-card');
        postElement.setAttribute('id', `post-${newPost.id}`);
        postElement.innerHTML = `
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5>${newPost.title}</h5>
            <div class="post-actions">
              <button class="btn btn-warning btn-sm" onclick="startEditing(${newPost.id})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="removePost(${newPost.id})">Delete</button>
            </div>
          </div>
          <p>${newPost.body}</p>
        `;
        document.getElementById('postsContainer').prepend(postElement);
        resetForm();
      });
  }
}

function startEditing(id) {
  fetch(`${apiBaseURL}/${id}`)
    .then(response => response.json())
    .then(post => {
      document.getElementById('postTitle').value = post.title;
      document.getElementById('postBody').value = post.body;
      editingPostId = post.id;
      document.querySelector('#postModalLabel').textContent = "Edit Post";
      new bootstrap.Modal(document.getElementById('postModal')).show();
    });
}

function removePost(id) {
  fetch(`${apiBaseURL}/${id}`, { method: 'DELETE' })
    .then(() => {
      document.getElementById(`post-${id}`).remove();
    });
}

function resetForm() {
  document.getElementById('postTitle').value = '';
  document.getElementById('postBody').value = '';
  editingPostId = null;
  document.querySelector('#postModalLabel').textContent = "Create a Post";
  new bootstrap.Modal(document.getElementById('postModal')).hide();
}
