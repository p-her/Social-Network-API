

fetch('/api/users', {
    method:'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
    .then(res => res.json())
    .then(postRes => {
        console.log(postRes)
    })
    .catch(err => {
        console.log(err);
        
    })