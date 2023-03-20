function shuffle(array) 
{
  array.sort(() => Math.random() - 0.5);
}

function getStartMenu()
{
    let form = document.createElement('form');
    form.classList = "startMenu";
    form.setAttribute('onsubmit', 'return false');
    document.body.append(form);
      
    let h1 = document.createElement('h1');
    h1.classList = "enterHeader";
    h1.innerHTML = "Введите кол-во карточек по вертикали/горизонтали";
    form.appendChild(h1);
    
    let input = document.createElement('input');
    input.classList = "numOfCards";
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите четное число от 2 до 10.');
    form.appendChild(input);
    
    let button = document.createElement('button');
    button.classList = "startButton";
    button.id = "startButton";
    button.innerHTML = "Начать игру";
    form.appendChild(button);
}

function hideStartMenu()
{
    let form = document.querySelector('.startMenu');
    document.body.removeChild(form);   
}

function placeCards(cards)
{
    hideStartMenu();
    
    let div = document.createElement('div');
    div.classList = "gamingField";
    document.body.appendChild(div); 
    
    let table = document.createElement('table');
    table.classList = "table";
    div.appendChild(table);
    
    
    let row, current, td1, td2;
    let counter = 0;
    
    let arr = [];
    for (let i = 0; i < 50; i++)
        arr.push(i + 1);
    shuffle(arr);  
    
    let main = [];
    for (let i = 0; i < count * count / 2; i++)
    {
        current = document.createElement('img');
        current.classList = "card";
        current.id = "card";
        current.src = 'img/card' + String(arr[counter]) + '.png';
        counter++;
        current.classList.toggle("hideCard");
        main.push(current);
    }
    shuffle(main);
    counter = 0;
    let copy = [];
    
    for (let i = 0; i < count; i++)
    {
        row = document.createElement('tr');
        row.id = "row_" + String(i);
        table.appendChild(row);
        
        for (let j = 0; j < count / 2; j++)
        {
            td1 = document.createElement('td');
            row.appendChild(td1);
            td1.classList = "td";
            td1.appendChild(main[counter]);
            td2 = td1.cloneNode(true);
            copy.push(td2);
            counter++;
        }
    } 
    shuffle(copy);
    counter = 0;
    let elem;
    let rowNumber = 0;
    
    do
    {
        elem = document.getElementById('row_' + String(rowNumber));
        for (let i = 0; i < count / 2; i++)
        {
            elem.appendChild(copy[counter]);
            counter++;
        }
        rowNumber++;
    } while(counter != copy.length); 
}

function start()
{   
    let input = document.querySelector('.numOfCards');
    let num = Number(input.value);
    if (num % 2 == 0 && num >= 2 && num <= 10)
    {
        count = num;
        placeCards(num);
    }
    else
    {
        alert(`Вы ввели некорректное кол-во карт\nВыбрано кол-во карт для игры по умолчанию (4)`);
        placeCards(count);
    }
}

function gamingProccess(e) 
{
    let element = e.target;
    
    if (element.classList.contains("card") && !element.classList.contains("selected") && !element.classList.contains("solved"))
    {
        element.classList.toggle("hideCard");
        element.classList.toggle("selected");
        
        if (selectedCard == undefined) 
            selectedCard = element;
        else
        {
            if (element.src == selectedCard.src)
            {
                element.classList.toggle("selected");
                element.classList.toggle("solved");
                selectedCard.classList.toggle("selected");
                selectedCard.classList.toggle("solved");
                selectedCard = undefined;
                
                guess += 2;         
                setTimeout(function() {
                    if (guess == count * count)
                    {
                        if(confirm(`Ура! Вы отгадали все карты! (${guess}/${count * count})\nОшибок: ${errors}\nНачать заново?`)) 
                            location.reload();
                    }
                }, 500);
            }
            else if (element.src != selectedCard.src)
            {      
                element.classList.toggle("selected");        
                selectedCard.classList.toggle("selected");
                
                element.classList.toggle("wrong"); 
                selectedCard.classList.toggle("wrong");

                setTimeout(function() {
                    element.classList.remove("wrong"); 
                    selectedCard.classList.remove("wrong");  
                    
                    element.classList.toggle("hideCard");
                    selectedCard.classList.toggle("hideCard"); 
                    selectedCard = undefined;
                }, 250);
                errors++;
            }
        }
    }      
}

let selectedCard;
let count = 4;
let guess = 0;
let errors = 0;
getStartMenu();
startButton.addEventListener('click', start);
document.addEventListener('click', e => gamingProccess(e));

