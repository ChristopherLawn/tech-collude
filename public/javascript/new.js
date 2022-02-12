async function newPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('#title').value.trim();
    const post_body = document.querySelector('#content').value.trim();

    if (post_title && post_body) {
        const response = await fetch('/api/posts', {
            method: 'post',
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

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);