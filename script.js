class Conversor {

    constructor(){
        this.type = 'BTD';

        this.h2Text = {
            'BTD': ()=>{ return 'Bin2Dec' },
            'DTB': ()=>{ return 'Dec2Bin' }
        }

        this.firstInput = {
            'BTD': ()=>{ return 'Binary' },
            'DTB': ()=>{ return 'Decimal' }
        }

        this.lastInput = {
            'BTD': ()=>{ return 'Decimal' },
            'DTB': ()=>{ return 'Binary' }
        }

    }

    uploadinterface(){
        const Interface = `
            <h2> ${this.h2Text[this.type]()} </h2>

            <label> ${this.firstInput[this.type]()}: <input type='text' maxLength='8' id='firstInput' onkeydown="conversor.verify(event)"/> </label>
            <label> ${this.lastInput[this.type]()}: <input type='text' readonly id='lastInput'/> </label>

            <input type='button' value='convert to ${this.lastInput[this.type]().toLowerCase()}' onclick='conversor.calculate()'/>
        `

        document.getElementById('elements').innerHTML = Interface
    }

    verify(event){

        if(this.type == 'BTD'){
            if(event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight'){
                if(event.key !== '0' && event.key !== '1' ){
                    event.preventDefault()
                }
            }
        }
        else{
            if(event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight'){
                let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
                if(!numbers.includes(event.key)){
                    event.preventDefault()
                }
            }
        }
    }

    modifyCSSofAbas(type){
        const abas = document.getElementsByClassName('abas');

        for(let c = 0; c < abas.length; c++){
            abas[c].classList.remove('actived');
        }

        document.getElementById(type).classList.add('actived');
    }

    changeTypeOperation(type){
        this.type = type;
        this.modifyCSSofAbas(type)
        this.uploadinterface()
    }

    calculate(){
        this.type == 'BTD'? this.BinToDecCalc(): this.DecToBinCalc();
    }

    BinToDecCalc(){

        const lastInput = document.getElementById('lastInput')
        const firstInput = document.getElementById('firstInput')
        const length = firstInput.value.length;

        let poten = 0;
        let total = 0;

        for(let uni = length; uni > 0; uni--){

            total += parseInt(firstInput.value[uni-1])*(Math.pow(2, poten))
            poten++
        }

        lastInput.value = total
    }

    DecToBinCalc(){
        const lastInput = document.getElementById('lastInput')
        const firstInput = document.getElementById('firstInput')

        let value = parseInt(firstInput.value);
        let total = '';
        

        while(value !== 0 && value !== 1){
            
            total += value % 2;
            value = parseInt(value / 2);

        }

        total += value
        total = total.split('').reverse().join("")
        
        lastInput.value = total

    }

}

const conversor = new Conversor();
conversor.uploadinterface()