/**
 * Función para calcular y mostrar sin recargar la página
 * el IMC (Índice de Masa Corporal)
 * 
 * @param {*} event 
 * @returns 
 */
function calculate(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    // Recoger los datos de los inputs
    const weight = parseInt(document.getElementById('weight').value);
    const heightCm = parseInt(document.getElementById('height').value);

    const heightM = heightCm / 100; // Convertir la altura a metros

    const bmi = weight / (heightM * heightM); // Calcular el IMC

    const roundedBmi = bmi.toFixed(1); // Redondear a dos decimales

    // Inicializar variables para clasificación y riesgo
    let classification = '';
    let risk = '';
    let color = '';
    let rangeClass = ''; // Clase para el rango que se coloreará
    
    // Clasificación y riesgo según el IMC
    if (bmi < 18) {
        classification = 'Bajo peso';
        risk = 'Moderado';
        color = '#baeae4';
        rangeClass = 'bajo-peso';
    } else if (bmi >= 18 && bmi < 25) {
        classification = 'Peso normal';
        risk = 'Bajo';
        color = '#88c46d';
        rangeClass = 'peso-normal';
    } else if (bmi >= 25 && bmi < 30) {
        classification = 'Sobrepeso';
        risk = 'Moderado';
        color = '#ead957';
        rangeClass = 'sobrepeso';
    } else if (bmi >= 30 && bmi < 35) {
        classification = 'Obesidad tipo I';
        risk = 'Alto';
        color = '#f1b048';
        rangeClass = 'obesidad-i';
    } else if (bmi >= 35 && bmi < 40) {
        classification = 'Obesidad tipo II';
        risk = 'Muy alto';
        color = '#ed882a';
        rangeClass = 'obesidad-ii';
    } else if (bmi >= 40) {
        classification = 'Obesidad tipo III';
        risk = 'Crítico';
        color = '#f14848';
        rangeClass = 'obesidad-iii';
    }
    
    // Mostrar el resultado
    const resultText = `${roundedBmi}`;
    const resultHtml = `
        
        <svg onClick="reset();" fill="#c6c6ba" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"/></svg>

        <p style="color: ${color};" id="result">0</p>
    `;
    
    document.getElementsByClassName('box')[0].innerHTML = resultHtml;

    // Contador animado para el IMC
    const resultElement = document.getElementById('result');
    const duration = 1200;
    const incremento = roundedBmi / (duration / 30);
    let contador = 0;

    const intervalId = setInterval(() => {
        contador += incremento;
        resultElement.innerText = contador.toFixed(1);

         // Cambia el color del contador en función del valor actual
         if (contador < 18) {
            resultElement.style.color = '#baeae4'; // Bajo peso
        } else if (contador >= 18 && contador < 25) {
            resultElement.style.color = '#88c46d'; // Peso normal
        } else if (contador >= 25 && contador < 30) {
            resultElement.style.color = '#ead957'; // Sobrepeso
        } else if (contador >= 30 && contador < 35) {
            resultElement.style.color = '#f1b048'; // Obesidad tipo I
        } else if (contador >= 35 && contador < 40) {
            resultElement.style.color = '#ed882a'; // Obesidad tipo II
        } else if (contador >= 40) {
            resultElement.style.color = '#f14848'; // Obesidad tipo III
        }
        
        if (contador >= roundedBmi) {
            resultElement.innerText = roundedBmi;
            clearInterval(intervalId);

            const resultInfoHtml = `<article>
                            <p>Clasificación de peso: <span style="color: ${color};" id="classification">${classification}</span></p>
                            <p>Riesgo de enfermedad relacionada: <span style="color: ${color};" id="risk">${risk}</span></p>
                        </article>

                        <section class="graphic">
                            <div class="classification"><span class="${bmi < 18 ? rangeClass : ''}">&lt;18</span><p>Bajo peso</p></div>
                            <div class="classification"><span class="${bmi >= 18 && bmi < 25 ? rangeClass : ''}">18 - 25</span><p>Peso normal</p></div>
                            <div class="classification"><span class="${bmi >= 25 && bmi < 30 ? rangeClass : ''}">25 - 30</span><p>Sobrepeso</p></div>
                            <div class="classification"><span class="${bmi >= 30 && bmi < 35 ? rangeClass : ''}">30 - 35</span><p>Obesidad tipo I</p></div>
                            <div class="classification"><span class="${bmi >= 35 && bmi < 40 ? rangeClass : ''}">35 - 40</span><p>Obesidad tipo II</p></div>
                            <div class="classification"><span class="${bmi >= 40 ? rangeClass : ''}">40&gt;</span><p>Obesidad tipo III</p></div>
                        </section>`

            document.getElementsByClassName('box')[0].innerHTML += resultInfoHtml;

            // Obtener elementos y agregar la clase 'visible' después de un pequeño retraso
            setTimeout(() => {
                document.querySelector('article').classList.add('visible');
                document.querySelector('.graphic').classList.add('visible');
            }, 100);
        }
    }, 30);
    
    return false; // Asegura que el formulario no se envíe
}

/**
 * Función que resetea el elemento box del 
 * archivo html a su contenido original
 */
function reset() {

    const formHtml = `
        <form onsubmit="return calculate(event)" method="post">
            <div>
                <input type="number" name="weight" id="weight" placeholder="peso (kg)">
                <input type="number" name="height" id="height" placeholder="altura (cm)">
            </div>

            <input type="submit" value="Calcular">
        </form>
    `

    document.getElementsByClassName('box')[0].innerHTML = formHtml;
}