// Type definitions for FullCalendar 2.4.0
// Project: http://fullcalendar.io/
// Definitions by: Neil Stalker <https://github.com/nestalk>, Marcelo Camargo <https://github.com/hasellcamargo>, Jesse Schalken <https://github.com/jesseschalken>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../moment/moment.d.ts"/>

declare module FullCalendar {
    export interface Calendar {

        /**
         * Formats a Date object into a string.
         */
        formatDate(date: Date, format: string, options?: Options): string;

        /**
         * Formats a date range (two Date objects) into a string.
         */
        formatDates(date1: Date, date2: Date, format: string, options?: Options): string;

        /**
         * Parses a string into a Date object.
         */
        parseDate(dateString: string, ignoreTimezone?: boolean): Date;

        /**
         * Parses an ISO8601 string into a Date object.
         */
        parseISO8601(dateString: string, ignoreTimezone?: boolean): Date;

        /**
         * Gets the version of Fullcalendar
         */
        version: string;

        /**
         * Formats a date range by intelligently inserting a dash between the two dates.
         */
        formatRange(moment1:moment.Moment, moment2:moment.Moment, formatString:string, separator?:string, isRTL?: boolean):string;

        /**
         * http://fullcalendar.io/docs/utilities/Moment/
         */
        moment: {
            (date: number|number[]|string|Date|moment.Moment|Object):moment.Moment;
            utc(date: number|number[]|string|Date|moment.Moment|Object):moment.Moment;
            parseZone():moment.Moment;
        };

        /**
         * Allows dynamic adding of handler functions. This method can be called for any callback in the API.
         */
        on(event:string, callback:Function):void;

        /**
         * Allows dynamic removing of handler functions. This method can be called for any callback in the API.
         */
        off(event:string, callback:Function):void;
    }

    export interface BusinessHours {
        start: Duration;
        end: Duration;
        dow: Array<number>;
    }

    export interface Timespan {
        start: moment.Moment;
        end: moment.Moment;
    }

    /**
     * http://fullcalendar.io/docs/display/buttonIcons/
     */
    interface ButtonIcons {
        prev: string;
        next: string;
        prevYear: string;
        nextYear: string;
    }

    export interface Options extends AgendaOptions, EventDraggingResizingOptions, DroppingExternalElementsOptions, SelectionOptions {

        // General display - http://fullcalendar.io/docs/display/

        header?: {
            left: string;
            center: string;
            right: string;
        }|boolean;
        customButtons?: {
            [key:string]: {
                text: string;
                click: (e:JQueryEventObject) => void;
                icon?: ButtonIcons,
                themeIcon?: ButtonIcons,
            }
        }
        buttonIcons?: ButtonIcons,
        theme?: boolean
        themeButtonIcons?: ButtonIcons,
        firstDay?: number;
        isRTL?: boolean;
        weekends?: boolean;
        hiddenDays?: number[];
        fixedWeekCount?: boolean;
        weekMode?: string; // "fixed"|"liquid"|"variable"
        weekNumbers?: boolean;
        weekNumberCalculation?: string|((m:moment.Moment) => number);
        businessHours?: boolean | BusinessHours;
        height?: number|string; // number|"auto"
        contentHeight?: number|string; // number|"auto"
        aspectRatio?: number;
        handleWindowResize?: boolean;
        viewRender?: (view: ViewObject, element: JQuery) => void;
        viewDestroy?: (view: ViewObject, element: JQuery) => void;
        dayRender?: (date: Date, cell: HTMLTableDataCellElement) => void;
        windowResize?: (view: ViewObject) => void;

        // Timezone
        timezone?: string | boolean;
        now?: moment.Moment | Date | string | (() => moment.Moment)

        // Views - http://fullcalendar.io/docs/views/

        views?: {
            [name:string]: Options
        };
        defaultView?: string;

        // Current Date - http://fullcalendar.io/docs/current_date/

        defaultDate?: Moment;

        // Text/Time Customization - http://fullcalendar.io/docs/text/

        timeFormat?: string|ViewOptionHash<string>;
        columnFormat?: string|ViewOptionHash<string>;
        titleFormat?: string|ViewOptionHash<string>;

        buttonText?: ButtonTextObject;
        monthNames?: Array<string>;
        monthNamesShort?: Array<string>;
        dayNames?: Array<string>;
        dayNamesShort?: Array<string>;
        weekNumberTitle?: string;
        displayEventTime?: boolean;
        displayEventEnd?: boolean;
        eventLimitText?: string|((numEvents:number) => string);
        dayPopoverFormat?: string;

        // Clicking & Hovering - http://fullcalendar.io/docs/mouse/

        dayClick?: (date: moment.Moment, jsEvent: MouseEvent, view: ViewObject, resourceObj?:ResourceObject) => void;
        eventClick?: (event: EventObject, jsEvent: MouseEvent, view: ViewObject) => void|boolean;
        eventMouseover?: (event: EventObject, jsEvent: MouseEvent, view: ViewObject) => void;
        eventMouseout?: (event: EventObject, jsEvent: MouseEvent, view: ViewObject) => void;

        // Event Data - http://fullcalendar.io/docs/event_data/

        events?: EventSource;
        eventSources?: EventSource[];

        allDayDefault?: boolean;
        startParam?: string;
        endParam?: string
        timezoneParam?: string;
        lazyFetching?: boolean;
        defaultTimedEventDuration?: Duration;
        defaultAllDayEventDuration?: Duration;
        forceEventDuration?: boolean;
        eventDataTransform?: (eventData: any) => EventObject;
        loading?: (isLoading: boolean, view: ViewObject) => void;

        // Event Rendering - http://fullcalendar.io/docs/event_rendering/

        eventColor?: string;
        eventBackgroundColor?: string;
        eventBorderColor?: string;
        eventTextColor?: string;
        nextDayThreshold?: Duration;
        eventOrder?: string|string[]|((e1:EventObject, e2:EventObject) => number);
        eventRender?: (event: EventObject, element: JQuery, view: ViewObject) => void;
        eventAfterRender?: (event: EventObject, element: JQuery, view: ViewObject) => void;
        eventAfterAllRender?: (view: ViewObject) => void;
        eventDestroy?: (event: EventObject, element: JQuery, view: ViewObject) => void;

        // Google Calendar - http://fullcalendar.io/docs/google_calendar/

        googleCalendarApiKey?: string;
    }

    /**
     * http://fullcalendar.io/docs/views/View_Option_Hash/
     */
    export interface ViewOptionHash<T> {
        month?: T;
        week?: T;
        day?: T;

        agenda?: T;
        agendaDay?: T;
        agendaWeek?: T;

        basic?: T;
        basicDay?: T;
        basicWeek?: T;

        'default': T;

        [name:string]: T;
    }

    /**
     * Agenda Options - http://fullcalendar.io/docs/agenda/
     */
    export interface AgendaOptions {
        allDaySlot?: boolean;
        allDayText?: string;
        slotDuration?: Duration;
        slotLabelFormat?: string;
        slotLabelInterval?: Duration;
        snapDuration?: Duration;
        scrollTime?: Duration;
        minTime?: Duration;
        maxTime?: Duration;
        slotEventOverlap?: boolean;
    }

    /*
    * Event Dragging & Resizing
    */
    export interface EventDraggingResizingOptions {
        editable?: boolean;
        eventStartEditable?: boolean;
        eventDurationEditable?: boolean;
        dragRevertDuration?: number; // integer, milliseconds
        dragOpacity?: number; // float
        dragScroll?: boolean;
        eventOverlap?: boolean | ((stillEvent: EventObject, movingEvent: EventObject) => boolean);
        eventConstraint?: EventId | BusinessHours | Timespan;
        eventDragStart?: (event: EventObject, jsEvent: MouseEvent, ui: {}, view: ViewObject) => void;
        eventDragStop?: (event: EventObject, jsEvent: MouseEvent, ui: {}, view: ViewObject) => void;
        eventDrop?: (event: EventObject, delta: moment.Duration, revertFunc: (() => void), jsEvent: MouseEvent, ui: {}, view: ViewObject) => void;
        eventResizeStart?: (event: EventObject, jsEvent: MouseEvent, ui: {}, view: ViewObject) => void;
        eventResizeStop?: (event: EventObject, jsEvent: MouseEvent, ui: {}, view: ViewObject) => void;
        eventResize?: (event: EventObject, delta: moment.Duration, revertFunc: (() => void), jsEvent: MouseEvent, ui: {}, view: ViewObject) => void;
    }
    /*
    * Selection - http://fullcalendar.io/docs/selection/
    */
    export interface SelectionOptions {
        selectable?: boolean;
        selectHelper?: boolean | ((start: moment.Moment, end: moment.Moment) => HTMLElement);
        unselectAuto?: boolean;
        unselectCancel?: string;
        selectOverlap?: boolean | ((event: EventObject) => boolean);
        selectConstraint?: EventId | string | Timespan | BusinessHours;
        select?: (start: moment.Moment, end: moment.Moment, jsEvent: MouseEvent, view: ViewObject, resource?: ResourceObject) => void;
        unselect?: (view: ViewObject, jsEvent: MouseEvent) => void;
    }

    export interface DroppingExternalElementsOptions {
        droppable?: boolean;
        /**
         * http://fullcalendar.io/docs/dropping/dropAccept/
         * 
         * "The value of dropAccept can be a string jQuery selector. It can also be a function that accepts the
         * draggable item as a single argument, and returns true if the element can be dropped onto the calendar."
         * 
         * I don't know what a "draggable item" is. Probably a Node or HTMLElement?
         */
        dropAccept?: string | ((draggable: HTMLElement) => boolean);
        drop?: (date: moment.Moment, jsEvent: MouseEvent, ui: {}) => void;
        eventReceive?: (event: EventObject) => void
    }

    export interface ButtonTextObject {
        prev?: string;
        next?: string;
        prevYear?: string;
        nextYear?: string;
        today?: string;
        month?: string;
        week?: string;
        day?: string;
    }

    /**
     * The docs often say "an event ID" without saying what that means
     * concretely, so define this so we don't have to remember.
     */
    type EventId = string|number;

    export interface EventObject extends BaseEvent {
        id?: EventId;
        title: string;
        allDay?: boolean;
        start: Moment;
        end?: Moment;
        url?: string;
        source?: EventSource;
    }

    /**
     * Shared by EventObject and EventSource
     * http://fullcalendar.io/docs/event_data/Event_Object/
     * http://fullcalendar.io/docs/event_data/Event_Source_Object/
     */
    interface BaseEvent {
        color?: string;
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string;
        className?: string|string[];
        editable?: boolean;
        startEditable?: boolean;
        durationEditable?: boolean;
        rendering?: string;
        overlap?: boolean;
        constraint?: EventId|string|BusinessHours|Timespan;
    }

    export interface ViewObject extends Timespan {
        name: string;
        title: string;
        intervalStart: moment.Moment;
        intervalEnd: moment.Moment;
    }

    /**
     * http://fullcalendar.io/docs/event_data/events_function/
     */
    interface EventGeneratingFunction {
        (start:moment.Moment, end:moment.Moment, timezone:string|boolean, callback:((events:EventObject[]) => void)):void;
    }

    interface EventGeneratingFunctionNoTimezone {
        (start:moment.Moment, end:moment.Moment, callback:((events:EventObject[]) => void)):void;
    }

    /**
     * http://fullcalendar.io/docs/event_data/Event_Source_Object/
     */
    interface EventSourceOptions extends BaseEvent {
        allDayDefault?: boolean;
        eventDataTransform?: (eventData:any) => EventObject;
    }

    /**
     * http://fullcalendar.io/docs/event_data/Event_Source_Object/
     */
    type EventSource = EventObject[] |
        EventGeneratingFunction |
        string |
        (EventSourceOptions & JQueryAjaxSettings & {url: string}) |
        (EventSourceOptions & {googleCalendarId: string}) |
        (EventSourceOptions & {events: EventObject[]|EventGeneratingFunctionNoTimezone});

    export type ResourceId = string|number;

    /**
     * http://fullcalendar.io/docs/resource_data/Resource_Object/
     */
    export interface ResourceObject {
        id: ResourceId;
        title: string;
        eventColor?: string;
        eventBackgroundColor?: string;
        eventBorderColor?: string;
        eventTextColor?: string;
        eventClassName?: string|string[];
        children?: ResourceObject[];
        parentId?: string;
        parent?: ResourceObject|void;
    }

    /**
     * http://fullcalendar.io/docs/utilities/Moment/
     * "In the API, most options that accept a Moment will also conveniently accept anything that the moment() constructor accepts"
     */
    export type Moment = moment.Moment|string|number|Date;

    /**
     * http://fullcalendar.io/docs/utilities/Duration/
     * In FullCalendar's API, most options that accept Durations also conveniently accept anything that the moment.duration constructor accepts
     */
    export type Duration = moment.Duration|string;
}

interface JQuery {

    /**
     * Get/Set option value
     */
    fullCalendar(method: 'option', option: string, value?: any): void;

    /**
     * Immediately forces the calendar to render and/or readjusts its size.
     */
    fullCalendar(method: 'render'): void;

    /**
     * Restores the element to the state before FullCalendar was initialized.
     */
    fullCalendar(method: 'destroy'): void;

    /**
     * Returns the View Object for the current view.
     */
    fullCalendar(method: 'getView'): FullCalendar.ViewObject;

    /**
     * Immediately switches to a different view.
     */
    fullCalendar(method: 'changeView', viewName: string): void;

    /**
     * Moves the calendar one step back (either by a month, week, or day).
     */
    fullCalendar(method: 'prev'): void;

    /**
     * Moves the calendar one step forward (either by a month, week, or day).
     */
    fullCalendar(method: 'next'): void;

    /**
     * Moves the calendar back one year.
     */
    fullCalendar(method: 'prevYear'): void;

    /**
     * Moves the calendar forward one year.
     */
    fullCalendar(method: 'nextYear'): void;

    /**
     * Moves the calendar to the current date.
     */
    fullCalendar(method: 'today'): void;

    /**
     * Moves the calendar to an arbitrary year/month/date.
     */
    fullCalendar(method: 'gotoDate', date:FullCalendar.Moment): void;

    /**
     * Moves the calendar forward/backward an arbitrary amount of time.
     */
    fullCalendar(method: 'incrementDate', duration:FullCalendar.Duration): void;

    /**
     * Returns a Date object for the current date of the calendar.
     */
    fullCalendar(method: 'getDate'): moment.Moment;

    /**
     * A method for programmatically selecting a period of time.
     */
    fullCalendar(method: 'select', start: FullCalendar.Moment, end?: FullCalendar.Moment, resource?: FullCalendar.ResourceObject|FullCalendar.ResourceId): void;

    /**
     * A method for programmatically clearing the current selection.
     */
    fullCalendar(method: 'unselect'): void;

    /**
     * Reports changes to an event and renders them on the calendar.
     */
    fullCalendar(method: 'updateEvent', event: FullCalendar.EventObject): void;

    /**
     * Retrieves events that FullCalendar has in memory.
     */
    fullCalendar(method: 'clientEvents', idOrfilter?: FullCalendar.EventId|((e:FullCalendar.EventObject) => boolean)): Array<FullCalendar.EventObject>;

    /**
     * Removes events from the calendar.
     */
    fullCalendar(method: 'removeEvents', idOrfilter?: FullCalendar.EventId|((e:FullCalendar.EventObject) => boolean)): void;

    /**
     * Refetches events from all sources and rerenders them on the screen.
     */
    fullCalendar(method: 'refetchEvents'): void;

    /**
     * Dynamically adds an event source.
     */
    fullCalendar(method: 'addEventSource', source: FullCalendar.EventSource): void;

    /**
     * Dynamically removes an event source.
     */
    fullCalendar(method: 'removeEventSource', source: FullCalendar.EventSource): void;

    /**
     * Renders a new event on the calendar.
     */
    fullCalendar(method: 'renderEvent', event: FullCalendar.EventObject, stick?: boolean): void;

    /**
     * Rerenders all events on the calendar.
     */
    fullCalendar(method: 'rerenderEvents'): void;

    /**
     * A method that retrieves all Resource Objects in memory.
     */
    fullCalendar(method: 'getResources'): FullCalendar.ResourceObject[];

    /**
     * A method that retrieves a specific Resource Object in memory.
     */
    fullCalendar(method: 'getResourceById', resourceId:FullCalendar.ResourceId): FullCalendar.ResourceObject|void;

    /**
     * Retrieves a list of Event Objects that are associated with the given resource.
     */
    fullCalendar(method: 'getResourceEvents', idOrResource:FullCalendar.ResourceId|FullCalendar.ResourceObject): FullCalendar.EventObject[];

    /**
     * Gets the Resource Object that is associated with the given event.
     */
    fullCalendar(method: 'getEventResource', idOrEvent:FullCalendar.EventId|FullCalendar.EventObject): FullCalendar.ResourceObject;

    /**
     * Allows programmatic rendering of a new resource on the calendar after the initial set of resources has already been displayed.
     */
    fullCalendar(method: 'addResource', resource:FullCalendar.ResourceObject, scroll:boolean): void;

    /**
     * Programmatically removes a resource with the given resourceId from the current view.
     */
    fullCalendar(method: 'removeResource', idOrResource:FullCalendar.ResourceId|FullCalendar.ResourceObject): void;

    /**
     * Causes the resource data to be fetched and freshly rerendered.
     */
    fullCalendar(method: 'refetchResources'): void;

    /**
     * Create calendar object
     */
    fullCalendar(options: FullCalendar.Options): JQuery;

    /**
     * Generic method function
     */
    fullCalendar(method: string, ...args:{}[]): void;
}

interface JQueryStatic {
    fullCalendar: FullCalendar.Calendar;
}

/**
 * FullCalendar will add these methods to the moment.Moment prototype.
 * http://fullcalendar.io/docs/utilities/Moment/
 */
declare namespace moment {
    interface Moment {
        hasTime():boolean;
        hasZone():boolean;

        stripTime():void;
        stripZone():void;

        time():moment.Duration;
        time(duration:FullCalendar.Duration):moment.Moment;
    }
}

