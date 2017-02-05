class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
	this.config = config;
	this.states = config.states;
	this.state = config.initial;
	this.history = [];
	this.lastHistory = [];
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
	if(this.states[state]){
		this.history.push(this.state);
		this.lastHistory = [];
		this.state = state;
	}
	else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.state].transitions[event]) {
            this.changeState(this.states[this.state].transitions[event]);
        }
        else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
	this.state = this.config.initial;
        this.history.push(this.state);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
	var result = [];       
        for (var prop in this.config.states) {
            if(!event) result.push(prop);
            else if(event in this.config.states[prop].transitions) {
                result.push(prop);                
            } 
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
	if (this.history.length == 0) {
		return false;
	}else {
            this.lastHistory.push(this.state);
            this.state = this.history.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
	if (this.lastHistory.length == 0) {
		return false;
	}else {
            this.history.push(this.state);
            this.state = this.lastHistory.pop();
            return true;
	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
	this.history = [];
        this.lastHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
