(function($) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = (function appController() {
      return {
        init: function () {
            this.companyInfo();
            this.initEvents();
        },
        initEvents: function initEvents() {
            $( '[data-js="form-register"]' ).on( 'submit', this.handleSubmit );
        },

        actionRemove: function actionRemove() {
            $( '[data-js="remove-car"]' ).on( 'click', this.removeCar);
        },

        handleSubmit: function handleSubmit( e ) {
            e.preventDefault();
            var $tableCar = $( '[data-js="table-car"]' ).get();
            $tableCar.appendChild( app.creatNewCar() );
            app.actionRemove();
        },

        creatNewCar: function creatNewCar() {
            var $fragment = document.createDocumentFragment();
            var $tr = document.createElement( 'tr' );
            var $tdImage = document.createElement( 'td' );
            var $image = document.createElement( 'img' );
            var $tdBrand = document.createElement( 'td' );
            var $tdYear = document.createElement( 'td' );
            var $tdBoard = document.createElement( 'td' );
            var $tdColor = document.createElement( 'td' );
            var $tdRemover = document.createElement( 'td' );
            var $buttonRemover = document.createElement( 'button' );
            var $id = this.createId();


            $image.setAttribute( 'src', $( '[data-js="Image-car"]' ).get().value );
            $tdImage.appendChild( $image );

            $tdBrand.textContent = $( '[data-js="brand-model"]' ).get().value;
            $tdYear.textContent = $( '[data-js="year"]' ).get().value;
            $tdBoard.textContent = $( '[data-js="board"]' ).get().value;
            $tdColor.textContent = $( '[data-js="colour"]' ).get().value;

            $buttonRemover.textContent = 'Remove';
            $buttonRemover.setAttribute( 'data-js', 'remove-car' );
            $buttonRemover.setAttribute('id', $id);
            $tdRemover.appendChild( $buttonRemover );
            $tr.setAttribute('data-js', $id);

            $tr.appendChild( $tdImage );
            $tr.appendChild( $tdBrand );
            $tr.appendChild( $tdYear );
            $tr.appendChild( $tdBoard );
            $tr.appendChild( $tdColor );
            $tr.appendChild( $tdRemover );

            return $fragment.appendChild( $tr );
        },

        companyInfo: function companyInfo() {
            var ajax = new XMLHttpRequest();
            ajax.open( 'GET', 'company.json', true );
            ajax.send();
            ajax.addEventListener( 'readystatechange', this.getCompanyInfo, false );

        },

        createId: function createId(){
            return Math.floor(Date.now() * (Math.random() * 10));;
        },

        removeCar: function removeCar(  ) {
            var data = '[data-js="id"]'.replace('id', this.id)
            var $car = $(data).get();
            $car.remove();
        },

        getCompanyInfo: function getCompanyInfo() {

                var data = JSON.parse( this.responseText );
                var $companyName = $( '[data-js="company-name"]' ).get();
                var $companyPhone = $( '[data-js="company-phone"]' ).get();
                $companyName.textContent = data.name;
                $companyPhone.textContent = data.phone;
                if ( !app.isReady.call( this ) )
                return;

        },

        isReady: function isReady(){
            return this.ready === 4 && this.status === 200;
        }
      };
  })();

  app.init();
})(window.DOM);
