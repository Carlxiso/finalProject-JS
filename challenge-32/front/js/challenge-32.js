(function($) {
  'use strict';
      /*
      Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados,
      salvando-os temporariamente na memória de um servidor.

      Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para
      que possamos utilizar para salvar as informações dos nossos carros.

      Para utilizá-lo, você vai precisar fazer o seguinte:

      - Via terminal, acesse o diretório `server`;
      - execute o comando `npm install` para instalar as dependências;
      - execute `node app.js` para iniciar o servidor.

      Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço:
      `http://localhost:3000`

      O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
      As mudanças que você irá precisar fazer no seu projeto são:

      - Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
      `http://localhost:3000/car`
      - Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
      os seguintes campos:
      - `image` com a URL da imagem do carro;
      - `brandModel`, com a marca e modelo do carro;
      - `year`, com o ano do carro;
      - `plate`, com a placa do carro;
      - `color`, com a cor do carro.

      Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

      Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
      do pull request.
      */


  var app = (function appController() {

        var $image =  $('[data-js="Image-car"]').get();
        var $brand =  $('[data-js="brand-model"]').get();
        var $year =  $('[data-js="year"]').get();
        var $color =  $('[data-js="colour"]').get();
        var $plate =  $('[data-js="board"]').get();
        var $tableCar = $('[data-js="table-car"]').get();

      return {
        init: function () {
            this.companyInfo();
            this.initEvents();
            this.getCars();
        },
        initEvents: function initEvents() {
            $( '[data-js="form-register"]' ).on( 'submit', this.handleSubmit );
        },

        actionRemove: function actionRemove() {
            $( '[data-js="remove-car"]' ).on( 'click', this.removeCar);
        },

        getCars: function getCars() {
            var ajax = new XMLHttpRequest();
            ajax.open( 'GET', 'http://localhost:3000/car' );
            ajax.send();
            ajax.onreadystatechange = function(e){

            if ( ajax.readyState === 4 && ajax.status === 200 ) {
                var cars = JSON.parse(ajax.responseText);
                cars.forEach(function(car){
                $tableCar.appendChild(app.creatNewCar(car.image,
                                                      car.plate,
                                                      car.year,
                                                      car.color,
                                                      car.brandModel
                                                  ));
                app.actionRemove();
        });
            }
          }
        },

        handleSubmit: function handleSubmit( e ) {
            e.preventDefault();
            var $tableCar = $( '[data-js="table-car"]' ).get();
            $tableCar.appendChild( app.creatNewCar() );
            app.actionRemove();
            app.getCars();
            app.getNewCar();
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
            ajax.open( 'GET', 'data/company.json', true );
            ajax.send();
            ajax.addEventListener( 'readystatechange', this.getCompanyInfo, false );

        },

        getNewCar: function getNewCar(){
        var ajax = new XMLHttpRequest();
        var car = '';
        ajax.open('POST','http://localhost:3000/car');
        ajax.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        );
        ajax.send('Image-car=' + $image.value
                  +'brandModel=' + $brand.value
                  +'year=' + $year.value
                  +'plate=' + $plate.value
                  +'color=' + $color.value);
        ajax.onreadystatechange = function(e){

          if(ajax.readyState === 4 && ajax.status === 200){
            var newCar = JSON.parse(ajax.responseText);
            car = app.creatNewCar(newCar.image,
                                  newCar.plate,
                                  newCar.year,
                                  newCar.color,
                                  newCar.brandModel
                                 );
          }

        };
        return car;
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
