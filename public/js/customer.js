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
  }

})

document.getElementById('selectCategory').addEventListener('change',async (event) => {
  const result = await (
    await fetch(`/customer/skills/${event.target.value}`,)
  ).json();
  // console.log(result);
document.getElementById('selectSkill').innerHTML = await render('customerSelect', { skills: result.skills });

})