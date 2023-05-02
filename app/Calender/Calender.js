import Application from "../Application.js";

export default class TimetableWithButtons extends Application {
    static days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    static periods = 6;

    /**
     * @type {HTMLElement}
     */
    gridElem;

    selectedColor = null;
    lastClickedTimeSlot = null;

    init() {
        this.initButtons();
        this.initTimetable();
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
            { label: 'Deselect All', color: 'btn-dark' }
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
                        this.lastClickedTimeSlot.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${lightColor}`);
                    } else {
                        this.lastClickedTimeSlot.style.backgroundColor = '';
                    }
                }
            });
            buttonGroupElem.appendChild(buttonElem);
        });

        this.target.appendChild(buttonGroupElem);
    }

    initTimetable() {
        const containerElem = document.createElement('div');
        containerElem.className = 'timetable-container';
    
        this.gridElem = document.createElement('div');
        this.gridElem.className = 'timetable-grid';
        this.gridElem.style.gridTemplateColumns = `repeat(${TimetableWithButtons.days.length + 1}, 1fr)`;
        this.gridElem.style.gridTemplateRows = `repeat(${TimetableWithButtons.periods + 1}, 1fr)`;
    
        this.initTimeSlots();
    
        containerElem.appendChild(this.gridElem);
        this.target.appendChild(containerElem);
    }

    initTimeSlots() {
        for (let i = 0; i <= TimetableWithButtons.days.length * (TimetableWithButtons.periods + 1); ++i) {
            const day = i % (TimetableWithButtons.days.length + 1);
            const period = Math.floor(i / (TimetableWithButtons.days.length + 1));

            const wrapperElem = document.createElement('div');
            wrapperElem.className = 'time-slot-wrapper';

            if (day === 0 && period === 0) {
                // Top-left corner (timetable label)
                const timetableLabel = document.createElement('div');
                timetableLabel.textContent = "Timetable";
                wrapperElem.appendChild(timetableLabel);
            } else if (day === 0) {
                // Period label
                const periodElem = document.createElement('div');
                periodElem.className = 'period-label';
                periodElem.textContent = "sometime";
                wrapperElem.appendChild(periodElem);
            } else if (period === 0) {
                // Day label
                const dayElem = document.createElement('div');
                dayElem.className = 'day-label';
                dayElem.textContent = TimetableWithButtons.days[day - 1];
                wrapperElem.appendChild(dayElem);
            } else {
                // Time slot
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.setAttribute('contenteditable', 'true');
                timeSlot.addEventListener('click', () => {
                    this.lastClickedTimeSlot = timeSlot;
                });
                wrapperElem.appendChild(timeSlot);
            }
            this.gridElem.appendChild(wrapperElem);
        }
    }
}
