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
    
    const resultDelete = await (
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
    
    const resultAdd = await (
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
      console.log();
      
    if (resultAdd.status === 200){
      document.getElementById('skills').innerHTML += await render('addSkill', {skill: resultAdd.skill});
    }
  }

  if (event.target.id === 'doResponse'){
    const id = event.target.parentNode.id;   
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>',event.target.parentNode);
    
    const resultDoResp = await (
      await fetch(`/executor/doResponse/${id}`)
    ).json();
    if (resultDoResp.status === 200){
      console.log(resultDoResp);
      
      event.target.parentNode.innerHTML += '<p>Отклик отправлен!</p>'
    } else {
      event.target.parentNode.innerHTML += '<p>Уже откликнулся!</p>'
    }
  }

})


document.getElementById('selectCategory').addEventListener('change', async (event) => {
  const result = await (await fetch(`/executor/skills/${event.target.value}`)).json();
  document.getElementById('selectSkill').innerHTML = await render('skillsSelect', { skills: result.skills });
})

// document.addEventListener('DOMContentLoaded', function() {
//   const elems = document.querySelectorAll('select');
//   const instances = M.FormSelect.init(elems, options);
// });
