import Application from "../Application.js";

export default class WeeklyTimetable extends Application {
    static days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    static periods = 8;

    /**
     * @type {HTMLElement}
     */
    gridElem;

    init() {
        this.initDom();
        this.initTimeSlots();
    }

    initDom() {
        const containerElem = document.createElement('div');
        containerElem.className = 'timetable-container';

        containerElem.appendChild(document.createElement('div'));
        containerElem.lastChild.className = 'timetable-grid';

        this.gridElem = containerElem.lastChild;
        this.gridElem.style.gridTemplateColumns = `repeat(${WeeklyTimetable.days.length}, 1fr)`;
        this.gridElem.style.gridTemplateRows = `repeat(${WeeklyTimetable.periods + 1}, 1fr)`;

        containerElem.appendChild(document.createElement('div'));
        containerElem.lastChild.className = 'timetable-feedback';

        this.target.appendChild(containerElem);
    }

    initTimeSlots() {
        for (let i = 0; i <= WeeklyTimetable.days.length * (WeeklyTimetable.periods + 1); ++i) {
            const day = i % (WeeklyTimetable.days.length + 1);
            const period = Math.floor(i / (WeeklyTimetable.days.length + 1));

            if (day === 0 && period === 0) {
                // Top-left corner (empty cell)
                this.gridElem.appendChild(document.createElement('div'));
            } else if (day === 0) {
                // Period label
                const periodElem = document.createElement('div');
                periodElem.className = 'period-label';
                periodElem.textContent = `Period ${period}`;
                this.gridElem.appendChild(periodElem);
            } else if (period === 0) {
                // Day label
                const dayElem = document.createElement('div');
                dayElem.className = 'day-label';
                dayElem.textContent = WeeklyTimetable.days[day - 1];
                this.gridElem.appendChild(dayElem);
            } else {
                // Time slot
                const timeSlot = new TimeSlot(day - 1, period - 1);
                this.gridElem.appendChild(timeSlot.domElem);
            }
        }
    }
}

class TimeSlot {
    constructor(day, period) {
        this.day = day;
        this.period = period;

        this.initDom();
    }

    initDom() {
        this.domElem = document.createElement('div');
        this.domElem.className = 'time-slot';

        const textArea = document.createElement('textarea');
        textArea.className = 'time-slot-text';
        this.domElem.appendChild(textArea);
    }
}
