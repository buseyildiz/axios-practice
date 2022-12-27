const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');
const puthPatchBtn = document.getElementById('put-patch');
const deleteBtn = document.getElementById('delete');
const ayniAndaIstekBtn = document.getElementById('ayni-anda-istek');
const headerBtn = document.getElementById('headers');
const hataBtn = document.getElementById('hata');


getBtn.addEventListener('click',getData);
postBtn.addEventListener('click',postData);
puthPatchBtn.addEventListener('click',putPatchData);
deleteBtn.addEventListener('click',deleteItem);
ayniAndaIstekBtn.addEventListener('click',ayniAndaIstekData);
headerBtn.addEventListener('click',customHeader);
hataBtn.addEventListener('click',hataIslemleri);

function getData(){
   axios({
    method:'GET',
    url : 'https://jsonplaceholder.typicode.com/users',
    params: {
        _limit:2
    }

   }).then(response =>sonucuEkranaYazdir(response))
   .catch(hata=> console.log(hata))
   .then(()=> console.log("get isteği tamamlandı"))
}





function postData(){
    axios.post('https://jsonplaceholder.typicode.com/posts',{
        title:'Yeni Başlık',
        body: 'Burası yeni bodyyy',
        userId: 35
    }).then(response => sonucuEkranaYazdir(response))
    .catch(hata => console.log(hata))
}

function putPatchData(){
  // axios.put('https://jsonplaceholder.typicode.com/users/1',{
  //   name :'buse yıldız',
  //   username: 'busseyildiiz',
  //   email:'buse@gmail.com'
  // }).then(response => sonucuEkranaYazdir(response))
  // .catch(hata => console.log(hata))

  axios.patch('https://jsonplaceholder.typicode.com/users/1',{
    name :'buse yıldız',
  }).then(response => sonucuEkranaYazdir(response))
  .catch(hata => console.log(hata))
}


function deleteItem(){
  axios.delete('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => sonucuEkranaYazdir(response))
  .catch(hata => console.log(hata))
}







function ayniAndaIstekData(){
    axios.all([ 
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/posts'),
    ]).then(response=> {
      console.log(response[0].data);
      console.log(response[1].data);
      sonucuEkranaYazdir(response[0])
    })
}

function customHeader() {

  const config = {
      headers:{
        'Content-Type' : 'application/json',
         Authorization : 'sizintokendegeriniz'
      }
  }
  axios.post('https://jsonplaceholder.typicode.com/posts',{
    title:'Yeni Başlık',
    body: 'Burası yeni bodyyy',
    userId: 35
},config).then(response => sonucuEkranaYazdir(response))
.catch(hata => console.log(hata))
}

function hataIslemleri(){
  axios({
    method:'GET',
    url : 'https://jsonplaceholder.typicode.com/userssss',
    params: {
        _limit:2
    }

   }).then(response =>sonucuEkranaYazdir(response))
   .catch(hata=> hatayiYazdir(hata))
   .then(()=> console.log("get isteği tamamlandı"))
}

function hatayiYazdir(hata){

    document.querySelector('.sonuc').innerHTML=` <div class="notification is-info">
    <div class="columns is-mobile is-vcentered">
    <div class="column"><h1 class="subtitle">Sonuc</h1> </div>
    <div class="column"> <h1 class="title">
    <pre>${JSON.stringify(hata.response.status,null,2)}</pre>
    </h1></div>


    </div>                 
  </div>`;
}


function sonucuEkranaYazdir(response){
    document.querySelector('.sonuc').innerHTML = `
    <div class="notification is-info">
    <div class="columns is-mobile is-vcentered">
    <div class="column"><h1 class="subtitle">Sonuc</h1> </div>
    <div class="column"> <h1 class="title">${response.status}</h1></div>


    </div>                 
  </div>
  
  <div class="section">
  
      <article class="message is-success">
          <div class="message-header">
            <p>Header</p>
          </div>
          <div class="message-body ">
            <pre> ${JSON.stringify(response.headers,null,4)}</pre>
          </div>
        </article>
</div>

<div class="section">
<div class="container">
    <article class="message is-danger">
        <div class="message-header">
          <p>Data</p>
        </div>
        <div class="message-body">
        <pre> ${JSON.stringify(response.data,null,4)}</pre>
        </div>
      </article>
</div>
</div>


<div class="section">
<div class="container">
    <article class="message is-warning">
        <div class="message-header">
          <p>Config</p>
        </div>
        <div class="message-body">
        <pre> ${JSON.stringify(response.config,null,4)}</pre>
        </div>
      </article>
</div>
</div>
  
  
  `


    
}