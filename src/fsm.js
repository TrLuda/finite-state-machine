class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
       this.config = config;  
       this.state = config.initial;   
       this.arrayStates = [config.initial]; 
       this.initialState = true;   
       this.count = 0;  
    }
         
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
       return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for (let states in this.config.states){
           if (states == state){
               this.state = state;
               this.arrayStates.push(this.state);
               this.initialState = false;
           }
        }
        if (this.state != state){
            throw new Error();
        }
        return this.arrayStates;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for (let states in this.config.states){
            if (this.state == states && !(this.config.states[states].transitions.hasOwnProperty(event))){
                throw new Error();
            }
        }    
        for (let states in this.config.states){
            for (let transitions in this.config.states[states].transitions){
                if (transitions == event){
                    this.state = this.config.states[states].transitions[transitions];
                    this.arrayStates.push(this.state);
                }
            }          
        }
        this.initialState = false;
        return this.arrayStates;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.initialState = true;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let array = [];
        if (event){
            for (let states in this.config.states){
                for (let transitions in this.config.states[states].transitions){
                    if (transitions == event){
                        array.push(states);
                    }
                }
            }
        } else {
            for (let states in this.config.states){
                array.push(states);
            }
        }                 
        return array;   
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state == this.arrayStates[0] || this.initialState){
            return false;
        } else {
            this.count++;
            this.state = this.arrayStates[this.arrayStates.length - this.count - 1];
            this.initialState = false;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.state == this.arrayStates[this.arrayStates.length - 1] || this.initialState){
            return false;
        } else {
            this.count--;
            this.state = this.arrayStates[this.arrayStates.length - this.count - 1];
            this.initialState = false;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.arrayStates = [];
        this.initialState = true;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
