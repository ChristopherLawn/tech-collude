const id = document.querySelector('#postId').value
async function editPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('#title').value.trim();
    const post_body = document.querySelector('#content').value.trim();

    if (post_title && post_body) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'put',
            body: JSON.stringify({
                post_title,
                post_body
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}


async function deletePostHandler() {
 


        const response = await fetch(`/api/posts/${id}`, {
            method: 'delete',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler)

document.querySelector('#delete').addEventListener('click', deletePostHandler)