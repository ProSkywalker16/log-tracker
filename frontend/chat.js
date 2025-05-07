const win = document.getElementById('chat-window'),
      form = document.getElementById('chat-form'),
      input= document.getElementById('chat-input');

function append(cls,txt){
  const d=document.createElement('div');
  d.className=cls; d.innerText=txt;
  win.appendChild(d);
  win.scrollTop = win.scrollHeight;
}

form.onsubmit = async e => {
  e.preventDefault();
  const q = input.value; input.value='';
  append('user', q);
  append('bot', 'Thinking…');
  const res = await fetch('http://192.168.0.145:5000/chat',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({message:q})
  });
  const js = await res.json();
  win.lastChild.innerText = js.response;
};
