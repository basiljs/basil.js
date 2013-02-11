function Person () {
    this.is_child = false;

    // private attribute
    this._age = null;
    
    this.age = function (value) {
        if (value) {
            // setter
            this._age = value;
            if (this._age < 18) {
                this.is_child = true;
            }
        } else {
            // getter
            if (this._age instanceof Number) {
                return "{_age} years old".format(this);
            } else {
                return this._age;                
            }
        }
    }
}

var timmy = new Person();
// this sets the person's age
timmy.age(13);
// this returns the person's age
$.writeln(timmy.age());
// this allows our object to do more than just setting an attribute
$.writeln(timmy.is_child == true);
