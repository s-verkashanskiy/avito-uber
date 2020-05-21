document.body.addEventListener('click', async (event) => {
  if (event.target.className === 'deleteSkill'){
    event.preventDefault();
    console.log(event.target.parentNode.id);
    
    const result = await (
      await fetch(`/executor`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: event.target.parentNode.id
        }),
      })
    ).json();
    event.target.parentNode.remove();
  }

  if (event.target.id === 'addSkill'){
    event.preventDefault();
    const select = document.getElementById('selectSkill');
    console.log(select.value);
        
    const result = await (
      await fetch(`/executor`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: select.value,
        }),
      })
    ).json();
  }

})