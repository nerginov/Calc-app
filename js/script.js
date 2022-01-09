const themeSlider = document.querySelector('#calculator__theme__switch_slider')
const themeNumbers = document.querySelector('.calculator__theme__switch__numbers')
const theme = document.querySelector('body')
const screenOutput = document.querySelector('.calculator__result_container_display')
const keyboard = document.querySelector('.calculator__keyboard')
const errorText = document.querySelector('#error-text')

const operatorValidation = /[-\+*\/]/
const numbersValidation = /[0-9]/g
let equation =""

//theme change function slider and numbers
const themeChange = function(arg){
    if(arg.value==1 || arg.textContent==1){
        theme.classList.add('theme1')
        theme.classList.remove('theme2', 'theme3')
    }
    if(arg.value==2 || arg.textContent==2){
        theme.classList.add('theme2')
        theme.classList.remove('theme1','theme3')
    }
    if(arg.value==3 || arg.textContent==3){
        theme.classList.add('theme3')
        theme.classList.remove('theme1','theme2')
    }
}

//Changing theme on slider value change
themeSlider.addEventListener('change', ()=>{
    themeChange(themeSlider)
})

//Changing theme on theme number click
themeNumbers.addEventListener('click', (e)=>{
let currentTarget = e.target
themeChange(currentTarget)
themeSlider.value=currentTarget.textContent
})



//event propagating buttons
keyboard.addEventListener('click',(e)=>{
     let clicked = e.target
    const errorRemove = function(){
        if(errorText.classList.contains('wobble') && screenOutput.classList.contains('error-border')){
                errorText.classList.remove('wobble')
                errorText.classList.add('hidden')
                screenOutput.classList.remove('error-border')
            }
            else return;
        }
    const updateEquation = () => equation+=clicked.value
    const updateScreen = () => screenOutput.value = equation

switch(true){
    //dot numbers operators
    case clicked.classList.contains('btn-dot') && numbersValidation.test(equation.charAt(equation.length-1)) 
    || clicked.classList.contains('btn-number')
    || clicked.classList.contains('btn-operator') && !operatorValidation.test(equation.charAt(equation.length-1)):
         errorRemove()
         updateEquation()
         updateScreen();
         break;

    //delete when equation char == 1
    case clicked.classList.contains('btn-delete') && equation.length == 1:
        errorRemove()
        equation=equation.slice(0,-1)
        screenOutput.value="0"; 
        break;

    //delete when equation char > 1
    case clicked.classList.contains('btn-delete') && equation.length > 1:
        errorRemove()
        equation=equation.slice(0,-1)
        updateScreen() ;
        break;

    //reset
    case clicked.classList.contains('btn-reset'):
        errorRemove()
        equation = '';
        screenOutput.value = '0';
        break;

    //equals + erorr handling on invalid input
    case clicked.classList.contains("btn-equals"):
        try {
            equation= eval(equation).toFixed(2).toString()
            if(equation.slice(-2) === "00"){
                equation = equation.slice(0, equation.length-3)
                updateScreen() 
            }
            else{updateScreen() }
            
        } catch (error) {
            errorText.classList.remove('hidden')
            errorText.classList.add('wobble')
            screenOutput.classList.add('error-border')
            
        };
        break;
    }})


