const Templates = {};
async function render(templateName, data) {
  if (!Templates[templateName]) {
    const str = await (await fetch(`/templates/${templateName}.hbs`)).text();
    Templates[templateName] = Handlebars.compile(str);
  }

  return Templates[templateName](data);
}

document.body.addEventListener('click', async (event) => {
  if (event.target.className === 'deleteSkill'){
    event.preventDefault();
    // console.log(event.target.parentNode.id);
    
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
    const result = await (
      await fetch(`/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: select.value,
        }),
      })
    ).json();
    if (result.status === 200){
      document.getElementById('skills').innerHTML += await render('addSkill', {skill: result.skill});
    }
    console.log(result);   
  }

})




document.getElementById('selectCategory').addEventListener('change', async (event) => {
  const result = await (await fetch(`/executor/skills/${event.target.value}`)).json();
  document.getElementById('selectSkill').innerHTML = await render('skillsSelect', { skills: result.skills });
})
