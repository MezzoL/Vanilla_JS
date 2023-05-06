import Application from "../Application.js";
export default class Calender extends Application {
    static days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    static periods = 7;
    /**
     * @type {HTMLElement}
     */
    gridElem;
    /**
     * @type {HTMLElement}
     */
    tbody;
    selectedColor = null;
    lastClickedTimeSlot = null;
    constructor(target) {
        super(target);
        this.initTimetable();
    }
    initTimetable() {
        const containerElem = document.createElement('div');
        containerElem.className = 'timetable-container';
        this.gridElem = document.createElement('table');
        this.gridElem.className = 'table table-bordered';
        this.gridElem.style.backgroundColor = 'white';
        this.initTimeSlots();
        this.initButtons();
        this.target.insertBefore(this.buttonGroupElem, this.target.firstChild);
        const spacerElem = document.createElement('div');
        spacerElem.style.height = '20px';
        this.target.insertBefore(spacerElem, this.target.children[1]);
        containerElem.appendChild(this.gridElem);
        this.target.appendChild(containerElem);
    }
    initTimeSlots() {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        for (let day = 0; day < Calender.days.length + 1; day++) {
            const headerElem = document.createElement('th');
            if (day === 0) {
                headerElem.textContent = "Timetable";
            } else {
                headerElem.textContent = Calender.days[day - 1];
            }
            headerRow.appendChild(headerElem);
        }
        thead.appendChild(headerRow);
        this.gridElem.appendChild(thead);
        this.tbody = document.createElement('tbody');
        for (let period = 1; period <= Calender.periods; period++) {
            const rowElem = document.createElement('tr');
            for (let day = 0; day < Calender.days.length + 1; day++) {
                if (day === 0) {
                    const periodElemWrapper = document.createElement('div');
                    periodElemWrapper.className = 'time-input-wrapper';
                    const periodElem = document.createElement('input');
                    periodElem.setAttribute('type', 'time');
                    periodElemWrapper.appendChild(periodElem);
                    rowElem.appendChild(periodElemWrapper);
                } else {
                    const timeSlot = document.createElement('td');
                    timeSlot.className = 'time-slot';
                    timeSlot.setAttribute('contenteditable', 'true');
                    timeSlot.addEventListener('click', () => {
                        this.lastClickedTimeSlot = timeSlot;
                    });
                    rowElem.appendChild(timeSlot);
                }
            }
            this.tbody.appendChild(rowElem);
        }
        this.gridElem.appendChild(this.tbody);
    }
    initButtons() {
        const buttonGroupElem = document.createElement('div');
        buttonGroupElem.className = 'btn-group';
        const buttonNames = [
            { label: 'Break', color: 'btn-primary' },
            { label: 'Gym', color: 'btn-secondary' },
            { label: 'Study', color: 'btn-success' },
            { label: 'TV', color: 'btn-danger' },
            { label: 'Friends', color: 'btn-warning' },
            { label: 'Work', color: 'btn-info' },
            { label: 'Deselect', color: 'btn-dark' }
        ];
        buttonNames.forEach(buttonData => {
            const buttonElem = document.createElement('button');
            buttonElem.className = `btn ${buttonData.color}`;
            buttonElem.type = 'button';
            buttonElem.textContent = buttonData.label;
            buttonElem.addEventListener('click', () => {
                this.selectedColor = buttonElem.classList.contains('btn-dark') ? null : buttonData.color;
                if (this.lastClickedTimeSlot !== null) {
                    if (this.selectedColor !== null) {
                        const lightColor = this.selectedColor.replace('btn', 'bg-light');
                        const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${lightColor}`).trim();
                        this.lastClickedTimeSlot.style.backgroundColor = backgroundColor;
                    } else {
                        this.lastClickedTimeSlot.style.backgroundColor = '';
                    }
                }
            });
            buttonGroupElem.appendChild(buttonElem);
        });
        const addRowButton = document.createElement('button');
        addRowButton.className = 'btn btn-outline-primary';
        addRowButton.type = 'button';
        addRowButton.textContent = 'Add Row';
        addRowButton.addEventListener('click', () => {
            this.addRow();
        });
        const removeRowButton = document.createElement('button');
        removeRowButton.className = 'btn btn-outline-danger';
        removeRowButton.type = 'button';
        removeRowButton.textContent = 'Remove Row';
        removeRowButton.addEventListener('click', () => {
            this.removeRow();
        });
        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-outline-secondary';
        saveButton.type = 'button';
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            this.saveTable();
        });
        buttonGroupElem.appendChild(saveButton);
        buttonGroupElem.appendChild(addRowButton);
        buttonGroupElem.appendChild(removeRowButton);
        this.buttonGroupElem = buttonGroupElem;
    }   

    addRow() {
        const rowElem = document.createElement('tr');
        for (let day = 0; day < Calender.days.length + 1; day++) {
            if (day === 0) {
                const periodElemWrapper = document.createElement('div');
                periodElemWrapper.className = 'time-input-wrapper';
                const periodElem = document.createElement('input');
                periodElem.setAttribute('type', 'time');
                periodElemWrapper.appendChild(periodElem);
                rowElem.appendChild(periodElemWrapper);
            } else {
                const timeSlot = document.createElement('td');
                timeSlot.className = 'time-slot';
                timeSlot.setAttribute('contenteditable', 'true');
                timeSlot.addEventListener('click', () => {
                    this.lastClickedTimeSlot = timeSlot;
                });
                rowElem.appendChild(timeSlot);
            }
        }
        this.tbody.appendChild(rowElem);
        }

    removeRow() {
        if (this.tbody.rows.length > 1) {
            this.tbody.deleteRow(-1);
        }
    }

    saveTable() {
        const filename = 'timetable.png';
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const tableRect = this.gridElem.getBoundingClientRect();
      
        canvas.width = tableRect.width;
        canvas.height = tableRect.height;
      
        Array.from(this.gridElem.querySelectorAll('tr')).forEach((row, rowIndex) => {
          Array.from(row.children).forEach((cell, cellIndex) => {
            const cellRect = cell.getBoundingClientRect();
      
            const bgColor = getComputedStyle(cell).backgroundColor;
            ctx.fillStyle = bgColor === 'rgba(0, 0, 0, 0)' ? 'white' : bgColor;
            ctx.fillRect(cellRect.x - tableRect.x, cellRect.y - tableRect.y, cellRect.width, cellRect.height);
      
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.strokeRect(cellRect.x - tableRect.x, cellRect.y - tableRect.y, cellRect.width, cellRect.height);
      
            let text;
            if (cellIndex === 0) {
              const input = cell.querySelector('input[type="time"]');
              text = input ? input.value : '';
            } else {
              text = cell.textContent;
            }
            if (text) {
              ctx.font = '14px Arial';
              ctx.fillStyle = 'black';
              ctx.textBaseline = 'middle';
              ctx.textAlign = 'center';
              ctx.fillText(text, cellRect.x - tableRect.x + cellRect.width / 2, cellRect.y - tableRect.y + cellRect.height / 2);
            }
          });
        });
      
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = filename;
        link.click();
      }      
}