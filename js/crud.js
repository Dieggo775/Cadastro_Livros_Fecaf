/*
*Objetivo: Realizar o CRUD de dados referente aos livros
*Data: 22/04/2026
*Autor: Diego Araujo
*Versao: 1.0
API: https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'
https://projeto-livraria-latx.onrender.com/v2/livraria/livro/
*/

const botaoSalvar = document.getElementById('salvar')

//Inserir um novo livro
const postLivro = async function() {

    let URL = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/'

    let dadosJSON = {}

    //Receber os dados do formulario
    let nomeLivro = document.getElementById('title')
    let desLivro = document.getElementById('subtitle')
    let fotoLivro = document.getElementById('image')
    let valorLivro = document.getElementById('price')

    // //Validacao dos dados
    // if(nomeLivro.value == '' || desLivro.value == '' || fotoLivro.value == '' || valorLivro.value == '') {
    //     alert('Preencha todos os campos para cadastrar um livro')
    // } else {
    //     //Criar o objeto com os dados do livro
    //     let livro = {
    //         title: nomeLivro.value,
    //         subtitle: desLivro.value,
    //         image: fotoLivro.value,
    //         price: valorLivro.value
    //     }

    //Criar o JSON de dados {title: 'nome do livro', subtitle: 'descricao do livro', image: 'url da imagem do livro', price: 'valor do livro'}
    dadosJSON.title     = nomeLivro.value
    dadosJSON.subtitle  = desLivro.value
    dadosJSON.image     = fotoLivro.value
    dadosJSON.price     = valorLivro.value

    //POST dos dados para API de livros
    try {
        let response = await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosJSON)
        })

        if(response.status == 201) {
            alert('Livro cadastrado com sucesso!')
            resetForm()
            getAllLivros()
        }else{
            alert('Não foi possível cadastrar o livro, tente novamente! Status: ' + response.status)
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error)
        alert('Erro de rede ou CORS. Verifique o console para detalhes.')
    }
}

//Atualiza um livro existente
const putLivro = async function() {

    let id = sessionStorage.getItem('idLivro')

    let URL = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/'+id

    let dadosJSON = {}

    //Receber os dados do formulario
    let nomeLivro = document.getElementById('title')
    let desLivro = document.getElementById('subtitle')
    let fotoLivro = document.getElementById('image')
    let valorLivro = document.getElementById('price')

    //Criar o JSON de dados {title: 'nome do livro', subtitle: 'descricao do livro', image: 'url da imagem do livro', price: 'valor do livro'}
    dadosJSON.title     = nomeLivro.value
    dadosJSON.subtitle  = desLivro.value
    dadosJSON.image     = fotoLivro.value
    dadosJSON.price     = valorLivro.value

    //POST dos dados para API de livros
    try {
        let response = await fetch(URL, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosJSON)
        })

        if(response.status == 200) {
            alert('Livro atualizado com sucesso!')
            resetForm()
            document.getElementById('salvar').innerText = 'Salvar'
            getAllLivros()
        }else{
            alert('Não foi possível atualizar o livro, tente novamente! Status: ' + response.status)
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error)
        alert('Erro de rede ou CORS. Verifique o console para detalhes.')
    }

}

//Excluir um Livro existente
const deleteLivros = async function(d) {
    let URL = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/' + id

    try {
        let response = await fetch(URL, {
            method: 'DELETE',
            mode: 'cors'
        }) 

        if(response.status == 200) {
            alert('Livro excluído com sucesso!')
            getAllLivros()
        } else {
            alert('Não foi possível excluir o livro, tente novamente! Status: ' + response.status)
        }
    } catch (error) {
        console.error('Erro ao excluir o livro:', error)
        alert('Erro de rede ou CORS. Verifique o console para detalhes.')
    }
}

//Retornar todos os livros
const getAllLivros = async function() {
    let URL = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/'

    let response = await fetch(URL)

    let dados = await response.json()

    //Recebe o elemento principal para colocar a lista de dados
    let divListDados = document.getElementById('listDados')

    divListDados.innerText = '' //Limpar os dados para evitar duplicidade

    dados.books.forEach(function(itemLivro){

        let nomeLivro   = itemLivro.title
        let descLivro   = itemLivro.subtitle
        let valorLivro  = itemLivro.price
        let idLivro     = itemLivro.id

        //Criar elementos no HTML
        let divDados    = document.createElement('div')
        let divTitle    = document.createElement('div')
        let divSubTitle = document.createElement('div')
        let divPrice    = document.createElement('div')
        let divOpcoes   = document.createElement('div')
        let spanEditar  = document.createElement('span')
        let spanExcluir = document.createElement('span')
        let imgEditar   = document.createElement('img')
        let imgExcluir  = document.createElement('img')
        

        //Adicionar atributos
        divDados.setAttribute('class', 'linha dados')
        imgEditar.setAttribute('src', 'icones/editar.png')
        imgEditar.setAttribute('idLivro', idLivro)
        imgExcluir.setAttribute('src', 'icones/excluir.png')
        imgExcluir.setAttribute('idLivro', idLivro)

        //Textos
        divTitle.innerText      = nomeLivro
        divSubTitle.innerText   = descLivro
        divPrice.innerText      = valorLivro

        //Associar elementos pai e seus filhos
        divListDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubTitle)
        divDados.appendChild(divPrice)
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        divOpcoes.appendChild(spanExcluir)
        spanEditar.appendChild(imgEditar)
        spanExcluir.appendChild(imgExcluir)

        //Adicionar evento de clique para excluir o livro
        imgExcluir.addEventListener('click', function() {
            deleteLivros(imgExcluir.getAttribute('idLivro'))
        })

        //Adicionar evento de clique para editar o livro
        imgEditar.addEventListener('click', function() {
            getByIdLivro(imgEditar.getAttribute('idLivro'))
        })
    })
}

//Buscar um livro pelo ID
const getByIdLivro = async function(id) {

    //Guarda o ID de forma que possamos recuperar em outra funcao independente do evento
    sessionStorage.setItem('idLivro', id)

    let URL = 'https://projeto-livraria-latx.onrender.com/v2/livraria/livro/' + id

        let response = await fetch(URL)

            let dados = await response.json()
            
            document.getElementById('title').value      = dados.books[0].title
            document.getElementById('subtitle').value   = dados.books[0].subtitle
            document.getElementById('image').value      = dados.books[0].image
            document.getElementById('price').value      = dados.books[0].price

            document.getElementById('salvar').innerText = 'Atualizar'
}

const resetForm = function() {
    document.getElementById('title').value = ''
    document.getElementById('subtitle').value = ''
    document.getElementById('image').value = ''
    document.getElementById('price').value = ''
}

botaoSalvar.addEventListener('click', function() {
    if(botaoSalvar.innerText == 'Salvar') {
        postLivro()
    }else{
        putLivro()
    }
})

window.addEventListener('load', function() {
    getAllLivros()
})