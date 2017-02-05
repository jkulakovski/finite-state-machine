class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (!config) {
        throw new Error();
      } else {
        this._initial = config.initial;
        this._states = config.states;
        this._history = [this._initial];
        this._activeState = 0;
      }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this._initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      let states = this._states;

      if (!states[state]) {
        throw new Error();
      } else {
        this._initial = state;
        this._history.push(state);
        this._activeState = this._history.indexOf(state);
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      let transition = this._states[this._initial].transitions;

      if (!transition[event]) {
        throw new Error();
      } else {
        this._initial = transition[event];
        if (this._history.indexOf(transition[event]) === -1) {
          this._history.push(transition[event]);
        }
        this._activeState = this._history.indexOf(transition[event]);
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this._initial = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (!event) {
        let arr = [];
        for (let key in this._states) {
          arr.push(key);
        }
        return arr;
      }

      let arr = [];
      for (let key in this._states) {
        if (this._states[key].transitions[event]) {
          arr.push(key);
        }
      }
      return arr;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this._initial === 'normal') {
        return false;
      } else {
        this._activeState--;
        this._initial = this._history[this._activeState];
        return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this._history.length === 1 || !this._history[this._activeState+1]) {
        return false;
      } else {
        this._activeState++;
        this._initial = this._history[this._activeState];
        return true;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this._initial = 'normal';
      this._history = ['normal'];
      this._activeState = 0;
    }
}

module.exports = FSM;