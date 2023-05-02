import Application from "../Application.js";

export default class Form extends Application {
    init() {
        super.init();
    
        const formElem = document.createElement('form');
        formElem.className = 'row g-3 needs-validation';
        formElem.noValidate = true;

        this.target.appendChild(formElem);

        // Form -> first name div -> input
        const firstNameInput = document.createElement('input');
        firstNameInput.type = 'text';
        firstNameInput.className = 'form-control';
        firstNameInput.id = 'validationCustom01';
        firstNameInput.value = 'Mark';
        firstNameInput.required = true;

        const firstNameGroup = this.createFormGroup(firstNameInput, 'col-md-4', 'First name');
        
        formElem.appendChild(firstNameGroup);

        const lastNameInput = document.createElement('input');
        lastNameInput.type = 'text';
        lastNameInput.className = 'form-control';
        lastNameInput.id = 'validationCustom02';
        lastNameInput.value = 'Otto';
        lastNameInput.required = true;

        const lastNameGroup = this.createFormGroup(lastNameInput, 'col-md-4', 'Last name');
        formElem.appendChild(lastNameGroup);

        // Form -> username div
        formElem.appendChild(document.createElement('div'));
        formElem.lastChild.className = 'col-md-4';

        // Form -> username div -> label
        formElem.lastChild.appendChild(document.createElement('label'));
        formElem.lastChild.lastChild.className = 'form-label';
        formElem.lastChild.lastChild.textContent = 'Username';
        formElem.lastChild.lastChild.setAttribute('for', 'validationCustomUsername');

        // Form -> username div -> validation group div
        formElem.lastChild.appendChild(document.createElement('div'));
        formElem.lastChild.lastChild.className = 'input-group has-validation';

        // Form -> username div -> validation group div -> span
        formElem.lastChild.lastChild.appendChild(document.createElement('span'));
        formElem.lastChild.lastChild.lastChild.className = 'input-group-text';
        formElem.lastChild.lastChild.lastChild.id = 'inputGroupPrepend';
        formElem.lastChild.lastChild.lastChild.textContent = '@';

        // Form -> username div -> validation group div -> input
        formElem.lastChild.lastChild.appendChild(document.createElement('input'));
        formElem.lastChild.lastChild.lastChild.type = 'text';
        formElem.lastChild.lastChild.lastChild.className = 'form-control';
        formElem.lastChild.lastChild.lastChild.id = 'validationCustomUsername';
        formElem.lastChild.lastChild.lastChild.setAttribute('aria-describedby', 'inputGroupPrepend');
        formElem.lastChild.lastChild.lastChild.required = true;

        // Form -> username div -> validation group div -> validation div
        formElem.lastChild.appendChild(document.createElement('div'));
        formElem.lastChild.lastChild.className = 'invalid-feedback validation';
        formElem.lastChild.lastChild.textContent = 'Please choose a username.';

        // City
        const cityInput = document.createElement('input');
        cityInput.type = 'text';
        cityInput.className = 'form-control';
        cityInput.id = 'validationCustom03';
        cityInput.required = true;

        const cityGroup = this.createFormGroup(cityInput, 'col-md-6', 'City');
        formElem.appendChild(cityGroup);

        // Form -> state div
        formElem.appendChild(document.createElement('div'));
        formElem.lastChild.className = 'col-md-3';

        // Form -> state div -> label
        formElem.lastChild.appendChild(document.createElement('label'));
        formElem.lastChild.lastChild.className = 'form-label';
        formElem.lastChild.lastChild.textContent = 'State';
        formElem.lastChild.lastChild.setAttribute('for', 'validationCustom04');

        // Form -> state div -> select
        formElem.lastChild.appendChild(document.createElement('select'));
        formElem.lastChild.lastChild.className = 'form-select';
        formElem.lastChild.lastChild.id = 'validationCustom04';
        formElem.lastChild.lastChild.required = true;

        // Form -> state div -> select -> option 1
        formElem.lastChild.lastChild.appendChild(document.createElement('option'));
        formElem.lastChild.lastChild.lastChild.selected = true;
        formElem.lastChild.lastChild.lastChild.disabled = true;
        formElem.lastChild.lastChild.lastChild.value = '';
        formElem.lastChild.lastChild.lastChild.textContent = 'Choose...';

        // Form -> state div -> select -> option 2
        formElem.lastChild.lastChild.appendChild(document.createElement('option'));
        formElem.lastChild.lastChild.lastChild.textContent = '...';

        // Form -> state div -> validation div
        formElem.lastChild.appendChild(document.createElement('div'));
        formElem.lastChild.lastChild.className = 'invalid-feedback validation';
        formElem.lastChild.lastChild.textContent = 'Please select a valid state.';

        // Form -> zip div
        formElem.appendChild(document.createElement('div'));
        formElem.lastChild.className = 'col-md-3';

        // Form -> zip div -> label
        formElem.lastChild.appendChild(document.createElement('label'));
        formElem.lastChild.lastChild.className = 'form-label';
        formElem.lastChild.lastChild.textContent = 'Zip';
        formElem.lastChild.lastChild.setAttribute('for', 'validationCustom05');

        // Form -> zip div -> input
        formElem.lastChild.appendChild(document.createElement('input'));
        formElem.lastChild.lastChild.type = 'text';
        formElem.lastChild.lastChild.className = 'form-control';
        formElem.lastChild.lastChild.id = 'validationCustom05';
        formElem.lastChild.lastChild.required = true;

        // Form -> zip div -> validation div
        formElem.lastChild.appendChild(document.createElement('div'));
        formElem.lastChild.lastChild.className = 'invalid-feedback validation';
        formElem.lastChild.lastChild.textContent = 'Please provide a valid zip.';

        // Form -> license div
        formElem.appendChild(document.createElement('div'));
        formElem.lastChild.className = 'col-md-12';

        // Form -> license div -> checkbox group div
        formElem.lastChild.appendChild(document.createElement('div'));
        formElem.lastChild.lastChild.className = 'form-check';

        // Form -> license div -> checkbox group div -> input
        formElem.lastChild.lastChild.appendChild(document.createElement('input'));
        formElem.lastChild.lastChild.lastChild.type = 'checkbox';
        formElem.lastChild.lastChild.lastChild.className = 'form-check-input';
        formElem.lastChild.lastChild.lastChild.value = '';
        formElem.lastChild.lastChild.lastChild.id = 'invalidCheck';
        formElem.lastChild.lastChild.lastChild.required = true;

        // Form -> license div -> checkbox group div -> label
        formElem.lastChild.lastChild.appendChild(document.createElement('label'));
        formElem.lastChild.lastChild.lastChild.className = 'form-check-label';
        formElem.lastChild.lastChild.lastChild.textContent = 'Agree to terms and conditions';
        formElem.lastChild.lastChild.lastChild.setAttribute('for', 'invalidCheck');

        // Form -> license div -> checkbox group div -> validation div
        formElem.lastChild.lastChild.appendChild(document.createElement('div'));
        formElem.lastChild.lastChild.lastChild.className = 'invalid-feedback validation';
        formElem.lastChild.lastChild.lastChild.textContent = 'You must agree before submitting.';

        // Form -> submit button div
        formElem.appendChild(document.createElement('div'));
        formElem.lastChild.className = 'col-md-12';

        // Form -> submit button div -> submit button
        formElem.lastChild.appendChild(document.createElement('button'));
        formElem.lastChild.lastChild.className = 'btn btn-primary';
        formElem.lastChild.lastChild.type = 'submit';
        formElem.lastChild.lastChild.textContent = 'Submit form';

        formElem.addEventListener('submit', function(evt) {
            evt.preventDefault();
            const form = evt.target;
            const inputElems = form.querySelectorAll('input,select');
            
            for (let inputElem of inputElems) {
                const validElem = this.#searchValidationElem(inputElem);
                let validationMsg = 'Looks good!';
                let error = false;

                // Validation process
                if (inputElem.required && !inputElem.value) {
                    validationMsg = 'This field is required!';
                    error = true;
                }

                // Set validation div
                if (validElem) {
                    validElem.textContent = validationMsg;
                    validElem.style.display = 'block';
                    if (error) {
                        validElem.classList.remove('valid-feedback');
                        validElem.classList.add('invalid-feedback');
                    } else {
                        validElem.classList.remove('invalid-feedback');
                        validElem.classList.add('valid-feedback');
                    }
                }
            }
        }.bind(this));
    }

    #searchValidationElem(sourceElem) {
        if (!sourceElem instanceof HTMLElement) {
            throw new Error('No source element was provided!');
        }
    
        if (sourceElem instanceof HTMLFormElement || !sourceElem.parentElement) {
            return null;
        }
    
        const siblings = sourceElem.parentElement.children;
        for (let sibling of siblings) {
            if (sibling.classList.contains('validation')) {
                return sibling;
            }
        }
    
        return this.#searchValidationElem(sourceElem.parentElement);
    }

    createFormGroup(inputElem, formGroupClass, inputTitle) {
        // Form -> group div
        const formGroupElem = document.createElement('div');
        formGroupElem.className = formGroupClass;

        // Form -> first name div -> label
        formGroupElem.appendChild(document.createElement('label'));
        formGroupElem.lastChild.className = 'form-label';
        formGroupElem.lastChild.textContent = inputTitle;
        formGroupElem.lastChild.setAttribute('for', inputElem.id);

        // Form -> first name div -> input
        formGroupElem.appendChild(inputElem);

        // Form -> first name div -> validation div
        formGroupElem.appendChild(document.createElement('div'));
        formGroupElem.lastChild.className = 'valid-feedback validation';
        formGroupElem.lastChild.textContent = 'Looks good!';

        return formGroupElem;
    }
}